# server.py
from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
socketio = SocketIO(app, cors_allowed_origins="*") # This will enable CORS for socketio

@app.route('/')
def index():
    return "Server is up and running!"

@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)
    send("Message Received", broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
