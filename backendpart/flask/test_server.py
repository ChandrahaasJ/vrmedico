from flask import Flask,request,send_file,jsonify
import cv2 as cv
import numpy as np

app=Flask(__name__)

@app.route('/test',methods=['GET'])
def test():
    return "HI"

@app.route('/postimg',methods=['POST'])
def postimg():
    img=request.files['image']
    # redimg=cv.imread(img)
    # final=np.array(redimg)

    return send_file(img, mimetype='image/png')

@app.route('/home',methods=['GET','POST'])
def home():
    if request.method=='POST':
        body=request.body
        name=body['name']
        return name
    elif request.method=='GET':
        return jsonify({"resp":"HI"})

@app.route('/classification',methods=['POST'])
def classific():
    img=request.files
    return send_file(img)


if(__name__=="__main__"):
    app.run(debug=True)
