from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo, ObjectId
from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask_session import Session
from datetime import datetime
from flask_bcrypt import Bcrypt
import random
import re
import redis
from datetime import timedelta
import regex_patterns
from gridfs import GridFS

load_dotenv()

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')


mongo = PyMongo(app)
tweets_db = mongo.db.tweets
users_db = mongo.db.users
fs = GridFS(mongo.db)

app.config['SECRET_KEY'] = os.urandom(24)

# Configuración de sesión
app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

app.permanent_session_lifetime = timedelta(days=5)

server_session = Session(app)



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
    print(data)
    if "username" not in data or "name" not in data or "password" not in data or "email" not in data:
        return jsonify({'message': 'A user must have username, name, password and email to register.'})
    
    if data["username"] == "" or data["name"] == "" or data["password"] == "" or data["email"] == "":
        return jsonify({'message': 'Username, name, password and email must be non-empty strings'})
    
    user_exists = users_db.find_one({'username': data['username']})
    email_exists = users_db.find_one({'email': data['email']})
    if user_exists:
        return jsonify({'message': 'The username you are trying to create already exists'})
    elif email_exists:
        return jsonify({'message': 'The email you are trying to used has already been used'})

    
    if len(data["username"]) >= 10:
        return jsonify({"message": 'The username is too long. The maximum length is 10 characters'})
    elif not re.match(regex_patterns.USERNAME_PATTERN, data["username"]):
        return jsonify({'message': 'The username can only contain letters, numbers and "_"'})
    elif len(data["name"]) >= 10:
        return jsonify({'message': 'The name is too long. The maximum length is 10 characters'})
    elif not re.match(regex_patterns.NAME_PATTERN, data["name"]):
        return jsonify({'message': 'The name can only contain letters'})
    elif len(data["password"]) < 8:
        return jsonify({'message': 'Password must have at least 8 characters'})
    elif not re.match(regex_patterns.PASSWORD_PATTERN, data["password"]):
        return jsonify({"message": "Password must contain at least one capital letter and one symbol"})
    elif not re.match(regex_patterns.EMAIL_PATTERN, data["email"]):
        return jsonify({"message":"Invalid email"})
    
    default_avatar = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    users_db.insert_one({
        'username': data['username'],
        'email': data['email'],
        'name': data['name'],
        'avatar': default_avatar,
        'is_verified': False,
        'followed_by': [],
        'following': [],
        'notifications': [],
        'password': bcrypt.generate_password_hash(data["password"])
    })
    return jsonify({'messsage': 'User created successfully'})

@app.route("/upload", methods=["POST"])

def upload_file():
    if "file" not in request.files:
        return jsonify({'message': 'No file in request.'})
    
    file = request.files["file"] 
    if file.filename == '':
        return jsonify({'message': 'No file selected'})
    
    file_id = fs.put(file, filename=file.filename)
    user_id = request.form['user_id']
    
    mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {'image_id': file_id}})
    
    return jsonify({"file_id": str(file_id)})

@app.route("/delete_file", methods=["DELETE"])
def delete_file():
    file_id = request.form["file_id"]
    fs.delete(file_id=ObjectId(file_id))
    return jsonify({'message': 'Image deleted correctly'})
    
    
@app.route("/<username>/is_verified")
def is_verified(username):
    is_verified = users_db.find_one({'username': username})['is_verified']
    return jsonify(is_verified)

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
    
@app.route("/login", methods=['POST'])
def login():
    session.permanent = True
    data = request.json
    
    if "password" not in data or "identifier" not in data:
        return jsonify({'message': 'Missing password or identifier parameter'})
    
    if data["password"] == "" or data["identifier"] == "":
        return jsonify({'message': 'Missing password or username / email'})
    
    if re.match(regex_patterns.EMAIL_PATTERN, data["identifier"]):
        identifier = "email"
    else:   
        identifier = "username"
        
    user = users_db.find_one({identifier: data["identifier"]})
    print(identifier)
    
    if not user or not bcrypt.check_password_hash(user["password"],data["password"]):
        return jsonify({'message': 'Invalid credentials'})
    
    else:
        session["user_id"] = str(user["_id"])
        return jsonify({
            "id": str(user["_id"]),
            "email": user["email"],
            "username": user["username"],
            "avatar": user["avatar"]
        })
    
@app.route("/check_login", methods=["GET"])

def check_login():
    print(session)
    if 'user_id' in session:
        user = users_db.find_one({"_id": ObjectId(session["user_id"])})
        return jsonify({
            "is_logged":True,
            "user":{
            "_id": str(user["_id"]),
            "name": user["name"],
            "username": user["username"],
            "avatar": user["avatar"],
            }
        })
    else:
        return jsonify({"is_logged": False, "user_id": None})
    
@app.route("/@me", methods=["GET"])
def current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"message": "You are not logged in"})
    user = users_db.find_one({"_id": ObjectId(user_id)})
    return jsonify({
        "id": str(user["_id"]),
        "email": user["email"],
        "username": user["username"],
        "avatar": user["avatar"],
    }) 
    
@app.route("/tweet", methods=['POST'])
def tweet():
    data = request.json
    
    if 'username' in data and 'message' in data:
        if len(data["message"]) > 200:
            return jsonify({"message": "The tweet is too long!"})
        
        user_data = users_db.find_one({'username': data['username']})
        
        if user_data:
            user = users_db.find_one({'username': data['username']})
            tweet = {
                'username': data['username'],
                'message': data['message'],
                'created_at': datetime.utcnow(),
                'likes': 0,
                'retweets': 0,
                'liked_by': [],
                'retweeted_by': [],
            }
            tweets_db.insert_one(tweet)
            return jsonify({'message':'Tweet created successfully', 'tweet': {
                '_id': str(tweet["_id"]),
                'name': user["name"],
                'username': tweet["username"],
                'avatar': user["avatar"],
                'message': tweet["message"],
                'likes': tweet["likes"],
                'retweets': tweet["retweets"],
                'is_verified': user["is_verified"]
                
                }}), 201 
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
            'message': doc['message']
        })
        
    return jsonify(recent_tweets)

@app.route("/user/<username>", methods=['GET'])

def get_user(username):
    try:
        id = ObjectId(username)
    except:
        id = None
    print(f"id: {id}, user: {username}")
    if id:
        user = users_db.find_one({'_id': id})
    else:
        user = users_db.find_one({'username': username})
    if not user:
        return jsonify({'message': 'User not found in the users db'})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'username': user['username'],
        'avatar': user['avatar'],
        'is_verified' : user['is_verified'],
        'notifications': len(user['notifications']),
        'email': user['email']
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

@app.route("/delete_all_tweets", methods=["DELETE"])
def delete_all_tweets():
    tweets_db.delete_many({})
    return jsonify({'message': 'All tweets were deleted successfully'})        
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
        } for tweet in last_tweets]
    return jsonify(list(treated_last_tweets))


@app.route("/<username>/likes/<tweet_id>", methods=["GET"])
def user_likes_tweet(username, tweet_id):
    tweet = tweets_db.find_one({"_id": ObjectId(tweet_id)})
    if not tweet:
        return jsonify({"message": "The tweet was not found!"})

    liked_by_user = username in tweet["liked_by"]
    return jsonify(liked_by_user)

    
    
@app.route("/<username>/retweeted/<tweet_id>", methods=["GET"])
def user_retweeted_tweet(username, tweet_id):
    
    tweet = tweets_db.find_one({"_id": ObjectId(tweet_id)})
    if not tweet:
        return jsonify({"message": "The tweet was not found!"})
    retweeted_by_user = username in tweet["retweeted_by"]
    return jsonify(retweeted_by_user)


    

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
    suggested_users = users_db.find({"username": {"$nin": current_user["following"], "$ne": current_user["username"]}}).limit(5)
    final_suggested_users = [
        {
            'name': user['name'],
            'username': user['username'],
            'avatar': user['avatar'],
            
        }
        for user in suggested_users
    ]
    return jsonify(final_suggested_users)

@app.route("/<main_username>/follows/<to_follow_username>", methods=["GET"])

def follows(main_username, to_follow_username):
    current_user = users_db.find_one({"username": main_username})
    if current_user:
        return jsonify(to_follow_username in current_user["following"])
    else:
        return jsonify({"message": "The current username was not found in the users database."})

# @app.route("/<parameter>/delete", methods=["PUT"])

# def delete(parameter):
#     users_db.update_many({},{"$unset": {parameter:1}}, True)
#     return jsonify({"message": parameter + " was correctly removed from all documents"})

@app.route("/tweets", methods=["DELETE"])

def delete_tweets():
    tweets_db.delete_many({})
    return jsonify({'message': 'Removed all tweets successfuly'})


@app.route("/users", methods=["DELETE"])

def delete_users():
    users_db.delete_many({})
    return jsonify({'message': 'Removed all users successfuly'})
        
if __name__ == '__main__':
    app.run(debug=True)