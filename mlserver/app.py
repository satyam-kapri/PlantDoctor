from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io
import tensorflow as tf
from tensorflow.keras.models import load_model
import tensorflow_hub as hub
from flask_cors import CORS
from flask_cors import cross_origin
app = Flask(__name__)
import time
CORS(app)



class_names = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Leaf_blight(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,bell___Bacterial_spot",
    "Pepper,bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]



custom_objects = {'KerasLayer': hub.KerasLayer}
loaded_model= load_model('./LeafDisease_MobileNet_94acc.h5', custom_objects=custom_objects)

def detect_objects(image):
   pred = loaded_model.predict(tf.expand_dims(image, axis=0))

  # Get the predicted class
   if len(pred[0]) > 1: # check for multi-class
    pred_class = class_names[pred.argmax()] # if more than one output, take the max
   else:
    pred_class = class_names[int(tf.round(pred)[0][0])] # if only one output, round

   return pred_class


# Create a function to import an image and resize it to be able to be used with our model
def load_and_prep_image(image, img_shape=224, scale=True):
    """
    Reads in an image, turns it into a tensor, and reshapes it to (224, 224, 3).

    Parameters
    ----------
    image (PIL.Image): PIL Image object
    img_shape (int): size to resize target image to, default 256
    scale (bool): whether to scale pixel values to range(0, 1), default True
    """
    # Resize the image
    image = image.resize((img_shape, img_shape))
    
    # Convert PIL image to numpy array
    img_array = np.array(image)
    
    if scale:
        # Rescale the image (get all values between 0 and 1)
        img_array = img_array / 255.0

    return img_array

@app.route('/detect', methods=['POST'])
@cross_origin()
def detect():
    
    image_file = request.files['image']
    img = Image.open(image_file)
    # Check if the image is successfully loaded
    if img is None:
        return jsonify({'error': 'Failed to load the image'})
    image = load_and_prep_image(img)

    # Perform object detection
    detections = detect_objects(image)
    print(detections)
    
    # Return the detection results
    return jsonify(detections)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
