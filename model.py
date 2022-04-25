import time
import pandas as pd
import numpy as np

outputs = pd.read_csv(r'output.csv')

def sigmoid_der(x):
    return x * (1-x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

input = outputs.drop(columns=["rating"])
input = input.to_numpy()

output = outputs.drop(columns=["img_code", "text"])
output = output.to_numpy()

weights = 2 * np.random.random((2,1)) - 1

for i in range(1000):
    output_n = sigmoid(np.dot(input, weights))
    error = output - output_n
    adjustments = error * sigmoid_der(output_n)
    weights += np.dot(input.T, adjustments)