from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from dotenv import load_dotenv
import os
from flask_cors import CORS
from datetime import datetime
import random

load_dotenv()

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
tweets_db = mongo.db.tweets
users_db = mongo.db.users

@app.route("/tweets", methods=['GET'])
def get_all_tweets():
    tweets = []
    for doc in tweets_db.find():
        tweets.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'likes': doc['likes'],
            'message': doc['message'],
            'retweets': doc['retweets'],
            'username': doc['username'],
        })
    return jsonify(tweets)

@app.route("/user", methods=["POST"])
def new_user():
    data = request.json
    user_exists = users_db.find_one({'username': data['username']})
    if 'username' in data and 'name' in data and 'avatar' in data and not user_exists:
        users_db.insert_one({
            'username': data['username'],
            'name': data['name'],
            'avatar': data['avatar'],
            'is_verified': False,
            'followed_by': [],
            'following': [],
            'notifications': []
        })
        return jsonify({'messsage': 'User created correctly'})

@app.route("/tweet/<tweet_id>", methods=['GET'])
def get_tweet(tweet_id):
    tweet = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    return jsonify({
        '_id': str(ObjectId(tweet['_id'])),
        'name': tweet['name'],
        'likes': tweet['likes'],
        'message': tweet['message'],
        'retweets': tweet['retweets'],
        'username': tweet['username'],
        'liked_by': tweet['liked_by'],
        'retweeted_by': tweet['retweeted_by'],
    })
    
@app.route("/tweet", methods=['POST'])
def tweet():
    data = request.json
    
    if 'username' in data and 'message' in data:
        
        user_data = users_db.find_one({'username': data['username']})
        
        if user_data:
            tweets_db.insert_one({
                'username': data['username'],
                'name': users_db.find_one({'username': data['username']})['name'],
                'message': data['message'],
                'created_at': datetime.utcnow(),
                'likes': 0,
                'retweets': 0,
                'liked_by': [],
                'retweeted_by': [],
            })
            return jsonify({'message':'Tweet created successfully'}), 201 
        else:
            return jsonify({'error':'Missing username or message in request'}), 400

@app.route("/last_tweets", methods=['GET'])

def get_last_tweets():
    recent_tweets = []
    for doc in tweets_db.find().sort('created_at', -1).limit(10):
        recent_tweets.append({
            '_id': str(ObjectId(doc['_id'])),
            'username': doc['username'],
            'likes': doc['likes'],
            'retweets': doc['retweets'],
            'message': doc['message'],
            'liked_by': doc['liked_by'],     
            'retweeted_by': doc['retweeted_by'],     
        })
        
    return jsonify(recent_tweets)

@app.route("/user/<username>", methods=['GET'])

def get_user(username):
    user = users_db.find_one({'username': username})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'username': user['username'],
        'avatar': user['avatar'],
        'is_verified' : user['is_verified'],
        'following' : user['following'],
        'followed_by': user['followed_by'],
        'notifications': len(user['notifications'])
    })
    
# @app.route("/delete_tweets", methods=["DELETE"])

# def delete_tweets():
#     tweets_db.delete_many({})
#     return jsonify({'message': 'Correctly deleted all tweets'}), 200
    
@app.route("/<current_username>/tweet_like/<tweet_id>", methods=['PUT'])
def like_tweet(tweet_id, current_username):
    tweet = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    tweet_owner = users_db.find_one({'username':tweet['username']})
    if current_username not in tweet["liked_by"]:
        tweets_db.update_one({'_id': ObjectId(tweet_id)}, {'$push': {'liked_by': current_username}, '$set': {'likes': tweet['likes'] + 1}})
    
    unread_notifications = [notification for notification in tweet_owner["notifications"] if not notification["read"]]
    
    for notification in unread_notifications:
        if (notification["url"] == tweet_id and notification["type"] == "like"):
            if current_username in notification["users"]:
                return jsonify({'message': 'Tweet owner was notified before about this same action'})
            users_db.update_one({
                "username": tweet_owner["username"],
                "notifications": {
                    "$elemMatch": {
                    "url": tweet_id,
                    "type": "like",
                    "read": False
                    }
                }
                }, {
                    "$push":{
                        "notifications.$.users": current_username
                        }, 
                    "$currentDate":{
                        "notifications.$.last_update": True
                        }})
            return jsonify({'message': current_username + ' has been added to notifications. Notification sent to ' + tweet_owner["username"]})
    
    new_notification = {
        "type": "like",
        "url": str(tweet["_id"]),
        "users":[current_username],
        "last_updated": datetime.utcnow(),
        "read": False
    }
    
    
    users_db.update_one({"username": tweet_owner["username"]}, {"$push": {"notifications": new_notification}})
    return jsonify({'message': 'New notification sent to ' + tweet_owner["username"]})


@app.route("/<current_username>/tweet_unlike/<tweet_id>", methods=['PUT'])
def unlike_tweet(current_username, tweet_id):
    document = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    if current_username in document['liked_by']:
        tweets_db.update_one({'_id': ObjectId(tweet_id)}, {'$inc': {'likes': -1} , '$pull' : {'liked_by': current_username}})
        return jsonify({'message': 'Tweet unliked'}), 200
    else:
        return jsonify({'message': 'Trying to unlike a tweet that the user has not liked'}), 400
    
@app.route("/<current_username>/tweet_like_status/<tweet_id>", methods={'GET'})
def like_status(current_username, tweet_id):
    tweet = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    liked = current_username in tweet['liked_by']
    return jsonify({'liked_by_user': liked})


@app.route("/<current_username>/tweet_retweet_status/<tweet_id>", methods={'GET'})
def retweet_status(current_username, tweet_id):
    tweet = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    retweeted = current_username in tweet['retweeted_by']
    return jsonify({'retweeted_by_user': retweeted})
# API route to increase the retweet of a tweet and add the user to the list of retweeters

@app.route("/<current_username>/tweet_retweet/<tweet_id>", methods=['PUT'])
def retweet_tweet(tweet_id, current_username):
    document = tweets_db.find_one({'_id' : ObjectId(tweet_id)})
    if current_username not in document['retweeted_by']:
        tweets_db.update_one({'_id':ObjectId(tweet_id)}, {'$inc' : {'retweets': 1}, '$push': {'retweeted_by': current_username}})
        return jsonify({'message': 'tweet rewteeted successfully'}), 200
    
    else:
        return jsonify({'message' : 'Trying to retweet a tweet that is already retweeted by the user'}), 400


@app.route("/<current_username>/tweet_unretweet/<tweet_id>", methods=['PUT'])
def unretweet_tweet(tweet_id, current_username):
    document = tweets_db.find_one({'_id' : ObjectId(tweet_id)})
    if current_username in document['retweeted_by']:
        tweets_db.update_one({'_id':ObjectId(tweet_id)}, {'$inc' : {'retweets': -1}, '$pull': {'retweeted_by': current_username}})
        return jsonify({'message': 'tweet unrewteeted successfully'}), 200
    
    else:
        return jsonify({'message' : 'Trying to unretweet a tweet that is not retweeted by the user'}), 400

@app.route("/users")

def get_users():
    #This will parse the url optional parameters and it will store it in a variable
    #f.i: url = /user?ids=1,2  ==> it will store 1,2 in user_ids
    usernames_param = request.args.get('usernames')
    if usernames_param:
        usernames = [username.strip() for username in usernames_param.split(",")]
        results = users_db.find({'username':{'$in': usernames}})    
    else:
        results = users_db.find()
    users_list = [{"_id": str(user['_id']), "username":user['username'], "avatar":user["avatar"], "name":user["name"], "is_verified": user["is_verified"], "notifications": user["notifications"]} for user in results]
    return jsonify(users_list), 200


@app.route("/users_by_text")
def search_text():
    text_to_search = request.args.get('text')
    if text_to_search:
        results = users_db.find({'$or': [
            { "name" : {"$regex": text_to_search, "$options":"i"} },
            { "username" : {"$regex": text_to_search, "$options":"i"} },
        ]
            })
        users_list = [{"_id": str(user['_id']), "username":user['username'], "avatar":user["avatar"], "name":user["name"], "is_verified": user["is_verified"]} for user in results]
    else:
        users_list = None
        
    return jsonify(users_list), 200
    
@app.route("/verify_user/<username>", methods=['PUT'])
def verify_user(username):
    user = users_db.find_one({'username': username})
    if user:
        users_db.update_one({'username': username}, {'$set': {'is_verified': True}})
        return {"message": "User verified"},200
    
    
@app.route("/random_users", methods=["GET"])
def random_users():
    currentUserUsername = request.args.get('currentUserUsername')
    count = request.args.get('count')
    if currentUserUsername and count:
        count = int(count)
        filtered_users = users_db.find({'username': {'$ne': currentUserUsername}, 'followed_by': {'$nin':[currentUserUsername]}})
        filtered_users =  [{"_id": str(user['_id']), "username":user['username'], "avatar":user["avatar"], "name":user["name"], "is_verified": user["is_verified"], "following": user["following"], "followed_by": user["followed_by"] } for user in filtered_users]
        random.shuffle(filtered_users)
        random_users = filtered_users[:count]
        return jsonify(random_users), 200
    
    else:
        return jsonify({'error': 'There are one or more parameters missing in your call.'}), 400
    
@app.route("/<username>/follow/<follow_username>", methods=["PUT"])
def follow_user(username, follow_username):
    user = users_db.find_one({'username': username})
    if follow_username not in user['following']:
        users_db.update_one({'username': username}, {'$push': {'following': follow_username} })
        users_db.update_one({'username': follow_username}, {'$push': {'followed_by': username}})
        return jsonify({'message': 'followed a user correctly'}), 200
    
    else:
        return jsonify({'message': 'The user is already following the follow user'})
    
@app.route("/<username>/unfollow/<unfollow_username>", methods=["PUT"])
def unfollow_user(username, unfollow_username):
    user = users_db.find_one({'username': username})
    if unfollow_username in user['following']:
        users_db.update_one({'username': username}, {'$pull': {'following': unfollow_username} })
        users_db.update_one({'username': unfollow_username}, {'$pull': {'followed_by': username}})
        return jsonify({'message': 'unfollowed a user correctly'}), 200
    else:
        return jsonify({'message': 'The user is trying to unfollow a user which is not followed'})
    
# @app.route("/add_field", methods=["POST"])
# def add_field():
#     users_db.update_many({}, {'$set':{'following':[], 'followed_by':[]}})
#     return jsonify({'message': 'fields added successfully'})

# @app.route("/add_field", methods=["PUT"])
# def add_fields():
#     users_db.update_many({}, {'$set':{'following':[], 'followed_by':[]}})
#     return jsonify({'message': 'fields added successfully'})
        
@app.route("/<current_user>/last_following_tweets", methods=["GET"])

def get_last_following_tweets(current_user):
    current_user_following = users_db.find_one({"username":current_user})["following"]
    last_tweets =   tweets_db.find(
        {"username": {"$in": current_user_following}}
        ).sort("created_at", -1).limit(10)
    
    treated_last_tweets = [{
        "_id": str(tweet["_id"]), 
        "username": tweet["username"],
        "message": tweet["message"],
        "created_at": tweet["created_at"],
        "likes": tweet["likes"],
        "retweets": tweet["retweets"],
        "liked_by": tweet["liked_by"],
        "retweeted_by": tweet["retweeted_by"],
        } for tweet in last_tweets]
    return jsonify(list(treated_last_tweets))

@app.route("/unpremium_all", methods=["PUT"])

def unpremium_all():
    users_db.update_many({}, {"$set": {"is_verified": False}})
    return jsonify({"message": "All users are unverified"})    

@app.route("/add_notifications", methods=["PUT"])
def add_notifications():
    users_db.update_many({}, {"$set": {"notifications": []}})
    return jsonify({"message": "Added the unread notifications parameter to each user"})

@app.route("/<current_username>/get_unread_notifications", methods=["GET"])

def get_user_unread_notifications(current_username):
    user = users_db.find_one({"username": current_username})
    notifications = [{
        "type": notification["type"],
        "url": notification["url"],
        "users": notification["users"],
        "read": notification["read"]
        }
        for notification in user["notifications" ] if not notification["read"]
        ]
    return jsonify(notifications)

@app.route("/<username>/read_notifications", methods=["PUT"])
def read_notifications(username):
    users_db.update_many({"username": username}, {"$set": {"notifications.$[].read": True}})
    return jsonify({"message": "all the notifications were read"})

@app.route("/<username>/get_who_to_follow", methods=["GET"])
def get_who_to_follow(username):
    current_user = users_db.find_one({'username': username})
    suggested_users = users_db.find({"username": {"$nin": {current_user["following"]}}}).limit(5)
    final_suggested_users = [
        {
            'name': user['name'],
            'username': user['username'],
            'avatar': user['avatar'],
            
        }
        for user in suggested_users
    ]
    return jsonify(final_suggested_users)

# @app.route("/<parameter>/delete", methods=["PUT"])

# def delete(parameter):
#     users_db.update_many({},{"$unset": {parameter:1}}, True)
#     return jsonify({"message": parameter + " was correctly removed from all documents"})
        
if __name__ == '__main__':
    app.run(debug=True)