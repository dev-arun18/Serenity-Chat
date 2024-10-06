from flask import Flask, request, jsonify, render_template
import google.generativeai as ai

app = Flask(__name__)

API_KEY = 'Your_API_KEY'
ai.configure(api_key=API_KEY)
model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    user_message = data['message']

    # Use the chatbot to get a response
    bot_response = chat.send_message(user_message)

    return jsonify({'response': bot_response.text})

if __name__ == '__main__':
    app.run(debug=True)
