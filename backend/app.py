from flask import Flask, request, jsonify
import json, requests
import os
from flask_cors import CORS
from dotenv import load_dotenv
#from transformers import pipeline

load_dotenv()

app = Flask(__name__)
CORS(app)

#generator = pipeline('text-generation', model='')

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def generate_recommendations(start_date, end_date, budget, city, state, country):
    prompt = f"Suggest travel destinations from {city}, {state}, {country} for a budget of {budget} dollars, between the dates {start_date} and {end_date}, and considering the weather at the destination."
    response = requests.post(
        url = "https://openrouter.ai/api/v1/chat/completions",
        headers = {
            "Authorization":f"Bearer {OPENROUTER_API_KEY}",
        },
        data=json.dumps({
            "model":"meta-llama/llama-3.1-8b-instruct:free",
            "messages": [
                {"role":"user", "content":prompt}
            ]
        })
    )
    result = response.json()
    print("This is your result:", result)
    return result['choices'][0]['message']['content']

@app.route('/')
def home():
    # Tests generate_recommendations function.
    return generate_recommendations(
        "2024-07-27",
        "2024-08-03",
        "$0-$500",
        "McAllen",
        "Texas",
        "United States"
    )

@app.route('/recommendations', methods=['POST'])
def getRecommendations():
    data = request.json
    start_date = data['start_date']
    end_date = data['end_date']
    budget = data['budget']
    city = data['city']
    state = data['state']
    country = data['country']
    recommendations = generate_recommendations(
        start_date, 
        end_date, 
        budget, 
        city, 
        state, 
        country
    )
    return jsonify({"recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True)