'''DEPRECATED

import matplotlib.pyplot as plt
import keras_ocr
import csv
import requests
import shutil

pipeline = keras_ocr.pipeline.Pipeline()

memes = open('./memegenerator-dataset/images.csv')
reader = csv.reader(memes)

meme_links = []

for row in reader:
    meme_links.append(row[0])

# 0-5 as a sample for now
for meme in meme_links[0:5]:
    filename = meme.split('/')[-1]
    image = requests.get(meme, stream=True)
    if image.status_code == 200:
        print('image successfully downloaded')
        image.raw.decode_content = True
        with open(filename, 'wb') as f:
            shutil.copyfileobj(image.raw,f)
    else:
        print('image not download error')
    

# TODO: KERAS TEXT RECOGNITION INLINE
images = [
    keras_ocr.tools.read(url) for url in [
        'https://storage.googleapis.com/gcptutorials.com/examples/keras-ocr-img-1.jpg',        
        'https://storage.googleapis.com/gcptutorials.com/examples/keras-ocr-img-2.png'
    ]
  ]

prediction = pipeline.recognize(images)

print(prediction)'''