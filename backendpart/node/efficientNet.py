from flask import Flask,request
import tensorflow as tf
app=Flask(__name__)

@app.route('/',methods=['GET'])
def home():
    return "HI"

@app.route('/classifier/efficientNet',methods=['POST'])
def effClassifier():
    body=request.body
    return body
    


if __name__=='__main__':
    app.run(debug=True)