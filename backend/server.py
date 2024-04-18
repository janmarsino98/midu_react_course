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

if __name__ == '__main__':
    app.run(debug=True)