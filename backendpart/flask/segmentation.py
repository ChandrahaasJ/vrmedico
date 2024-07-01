from flask import Flask,request,redirect,render_template,send_file
import tensorflow as tf
import numpy as np
import cv2
from tensorflow.keras.utils import CustomObjectScope
from PIL import Image


app=Flask(__name__)


""" Global parameters """
H = 224
W = 224


def iou(y_true, y_pred):
    def f(y_true, y_pred):
        intersection = (y_true * y_pred).sum()
        union = y_true.sum() + y_pred.sum() - intersection
        x = (intersection + 1e-15) / (union + 1e-15)
        x = x.astype(np.float32)
        return x
    return tf.numpy_function(f, [y_true, y_pred], tf.float32)

smooth = 1e-15
def dice_coef(y_true, y_pred):
    y_true = tf.keras.layers.Flatten()(y_true)
    y_pred = tf.keras.layers.Flatten()(y_pred)
    intersection = tf.reduce_sum(y_true * y_pred)
    return (2. * intersection + smooth) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + smooth)

def dice_loss(y_true, y_pred):
    return 1.0 - dice_coef(y_true, y_pred)

def f1sc(y_true, y_pred):
    # Ensure tensors have the same data type
    y_true = tf.cast(y_true, dtype=y_pred.dtype)

    # Flatten tensors if necessary (for compatibility with some metrics)
    y_true = tf.reshape(y_true, [-1])
    y_pred = tf.reshape(y_pred, [-1])

    # Calculate precision and recall
    precision = tf.math.divide_no_nan(tf.reduce_sum(tf.cast(tf.equal(y_true, y_pred), dtype=tf.float32)), tf.reduce_sum(y_pred))
    recall = tf.math.divide_no_nan(tf.reduce_sum(tf.cast(tf.equal(y_true, y_pred), dtype=tf.float32)), tf.reduce_sum(y_true))

      # Calculate F1-score (avoid division by zero)
    f1 = 2 * tf.math.divide_no_nan(precision * recall, precision + recall + 1e-10)

    return f1

with CustomObjectScope({"dice_coef": dice_coef, "dice_loss": dice_loss,"f1sc":f1sc}):
    model = tf.keras.models.load_model("C:\saved models\model_segmentation2.keras")

@app.route('/api/upload',methods=['POST'])
def img():
    image_file=request.files('image')

    image_file = cv2.imread(x, cv2.IMREAD_COLOR) ## [H, w, 3]
    image_file = cv2.resize(image_file, (W, H))       ## [H, w, 3]
    x = image_file/255.0                         ## [H, w, 3]
    x = np.expand_dims(x, axis=0)

    y_pred = model.predict(x, verbose=0)[0]
    y_pred = np.squeeze(y_pred, axis=-1)
    y_pred = y_pred >= 0.5
    y_pred = y_pred.astype(np.int32)

    if image_file.mode != y_pred.mode:
        y_pred = y_pred.convert(image_file.mode)
    
    if image_file.size != y_pred.size:
        image_file = image_file.resize(y_pred.size)

    overlayed = Image.blend(image_file, y_pred, alpha=0.5)
    #y_pred = y_pred.flatten()

    return send_file(image_file,mimetype='image/png')

if __name__=='__main__':
    app.run("0.0.0.0",debug=True)