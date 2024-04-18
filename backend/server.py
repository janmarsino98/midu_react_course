from flask import Flask, jsonify
from flask_pymongo import PyMongo, ObjectId
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
db = mongo.db.tweets

@app.route("/tweets", methods=['GET'])
def get_all_tweets():
    tweets = []
    for doc in db.find():
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
    tweet = db.find_one({'_id': ObjectId(tweet_id)})
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
    db.insert_one({
        'name': ''
    })

if __name__ == '__main__':
    app.run(debug=True)