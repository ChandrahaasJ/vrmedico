from flask import Flask
from tensorflow import 
app=Flask(__name__)

@app.route('/',methods=['GET'])
def home():
    return "HI"

@app.route('/classifier/efficientNet',methods=['POST'])
def effClassifier():

    


if __name__=='__main__':
    app.run(debug=True)