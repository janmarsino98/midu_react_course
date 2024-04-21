from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from dotenv import load_dotenv
import os
from flask_cors import CORS
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)
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
    for doc in tweets_db.find().sort('created_at', -1).limit(2):
        recent_tweets.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
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
    })
    
@app.route("/<current_username>/tweet_like/<tweet_id>", methods=['PUT'])
def like_tweet(tweet_id, current_username):
    document = tweets_db.find_one({'_id': ObjectId(tweet_id)})
    if current_username not in document['liked_by']:
        tweets_db.update_one({'_id' : ObjectId(tweet_id)}, {'$inc': {'likes': 1} , '$push': {'liked_by': current_username}})
        return jsonify({'message': 'Tweet liked'})
    
    else:
        return jsonify({'message': 'The user is trying to like a tweet that is already liked by him!'})

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

if __name__ == '__main__':
    app.run(debug=True)