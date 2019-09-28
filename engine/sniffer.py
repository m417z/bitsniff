import numpy as np
import math
import os

k_fakes_num = 1000
k_bell_shape = [0.1, 0.3, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5, 0.5, 0.5, 0.3, 0.3, 0.3, 0.3]

# Return the similarity score for two time-series
def similarity(a, b):
    return np.corrcoef(a, b)[0][1]

# Generate fake block time-series of given length
def generateFake(real):
    fake = np.zeros(len(real))
    size = np.sum(real) / np.count_nonzero(real)
    freq = np.count_nonzero(real) / len(real)
    for i in range(len(fake)):
        if np.random.random() < freq:
            fake[i] = size
    return fake

# Hack for prettier plot
def bellShape(data):
    result = np.zeros(len(data) + len(k_bell_shape))
    for i in range(len(data)):
        if data[i] > 0:
            for b in range(len(k_bell_shape)):
                if b == 3:
                    result[i + b] = data[i]
                else:
                    result[i + b] = -1

    return result[:len(data)]

# Create bell shapes around blocks
def shapePredict(data):
    result = np.zeros(len(data) + len(k_bell_shape))
    for i in range(len(data)):
        if data[i] > 0:
            for b in range(len(k_bell_shape)):
                result[i + b] = data[i] * k_bell_shape[b]

    return result[:len(data)]

# Calculate the probability of detection (in units of std)
def detect(traffic, blocks):
    if len(traffic) != len(blocks):
        print('Error: traffic/blocks length mismatch')
        return
    length = len(traffic)

    fake_results = np.zeros(k_fakes_num)
    for i in range(k_fakes_num):
        fake = generateFake(blocks)
        fake_results[i] = similarity(traffic, shapePredict(fake))

    real_result = similarity(traffic, shapePredict(blocks))

    fake_mean = np.mean(fake_results)
    fake_std = np.std(fake_results)

    res = (real_result - fake_mean) / fake_std

    # No traffic at all
    if np.std(traffic) == 0:
        return -3

    # No blocks mined
    if np.std(blocks) == 0:
        return 0

    if np.isnan(res):
        return 0

    return res
