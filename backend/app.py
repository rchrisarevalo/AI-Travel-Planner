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
OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")
base_url = "http://api.openweathermap.org/data/2.5/weather?"

def generate_recommendations(start_date, end_date, budget, city, state, country):
    prompt = f"Suggest travel destinations from {city}, {state}, {country} for a budget of {budget} dollars, between the dates {start_date} and {end_date}, and considering the weather at the destination."
    response = requests.post(
        url = "https://openrouter.ai/api/v1/chat/completions",
        headers = {
            "Authorization":f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        data=json.dumps({
            "model":"meta-llama/llama-3.1-8b-instruct:free",
            "messages": [
                {"role":"user", "content":prompt}
            ]
        })
    )
    result = response.json()
    print(response.json())
    return result['choices'][0]['message']['content']


#@app.route('/get_coords', methods=['POST'])

def get_coordinates(city, state, country):
    try:
        response = requests.get('http://api.openweathermap.org/geo/1.0/direct', params={
            'q': f"{city},{state},{country}",
            'limit': 1,
            'appid': OPENWEATHERMAP_API_KEY
        })
        response.raise_for_status()
        data = response.json()
        if data:
            return data[0]['lat'], data[0]['lon']
        return None, None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching coordinates: {e}")
        return None, None

def fetch_weather_data(lat, lon):
    try:
        response = requests.get('https://api.openweathermap.org/data/2.5/weather', params={
            'lat': lat,
            'lon': lon,
            'appid': OPENWEATHERMAP_API_KEY,
            'units': 'metric'
        })
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

@app.route('/')
def home():
    # Tests generate_recommendations function.
    return generate_recommendations("July 27", "August 3", 1000.00, "Sand Diego", "CA", "USA")

@app.route('/recommendations', methods=['POST'])
def getRecommendations():
    data = request.json
    start_date = data('start_date')
    end_date = data('end_date')
    budget = data('budget')
    city = data('city')
    state = data('state')
    country = data('country')
    recommendations = generate_recommendations(start_date, end_date, budget, city, state, country)
    return jsonify({"recommendations": recommendations})

@app.route('/geo', methods=['GET'])
def get_coordinates():
    city = request.args.get('city')
    print(city)
    state = request.args.get('state')
    print(state)
    country = request.args.get('country')
    print(country)

    if city and state and country:
        lat, lon = get_coordinates(city, state, country)
        if lat is not None and lon is not None:
            return jsonify({'lat': lat, 'lon': lon})
        return jsonify({'error': 'Unable to get coordinates for the location'}), 500
    return jsonify({'error': 'City, state, and country parameters are required'}), 400

@app.route('/forecast', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    if lat and lon:
        data = fetch_weather_data(lat, lon)
        if data:
            if data['cod'] == 200:
                weather_info = {
                    "temperature": data['main']['temp'],
                    "pressure": data['main']['pressure'],
                    "humidity": data['main']['humidity'],
                    "description": data['weather'][0]['description']
                }
                return jsonify(weather_info)
            else:
                return jsonify({"error": "Weather data not found"}), 404
        return jsonify({"error": "Unable to fetch weather data"}), 500
    return jsonify({"error": "Latitude and longitude parameters are required"}), 400

if __name__ == "__main__":
    app.run(debug=True)