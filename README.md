# Design and Implementation of a YOLOv4 Model to Count and Classify Vehicles

## ABSTRACT

Vehicle detection and classification are crucial for traffic analysis. Moreover, accu-
rate and effective traffic flow monitoring has faced numerous challenges and is a task that

is only getting harder. It can be difficult to identify and locate cars in images and video
frames that contain car features because of interference and the proximity of the cars on
the road. Furthermore, no datasets are available for local vehicles in the Philippines. The

researchers made a customized dataset for the local cars in the Philippines. The propo-
nents employed Convolutional Neural Network (CNN), specifically the YOLOv4 Model

model, for vehicle detection and classification. The researchers used Transfer Learn-
ing, which means that the researchers used a pre-trained YOLOv4 model. Moreover,

the researchers used Supervised Learning by labeling the datasets through annotations.
The researchers used seven augmentation techniques: grayscale, horizontal flip, motion
blur, random rotation, color augmentation (hue, brightness, contrast, saturation), random
shearing, and Gaussian noise. To increase the mean average precision (mAP) further, the
proponents fine-tuned the YOLOv4 model. The researchers tested the hyperparameters
for the learning rate and the Batch Size of the YOLOv4 Model. The researchers tested
three different learning rates, which are 0.01, 0.001, and 0.0001. On the other hand. the
researchers tested three different batch sizes, which are 16, 32, and 64. The results of the
study show that the best configuration is a learning rate of 0.001 and a batch size of 64.

This configuration for the YOLOv4 Model resulted in an accuracy of 98.83%. Nonethe-
less, the researchers have recommended that future researchers develop the model with

more datasets and increase the diversity of the images.

![1](https://github.com/rjglozano/ThesisWebsite/assets/122294682/84c71828-101a-4f04-bf47-d9e345cc2302)
![2](https://github.com/rjglozano/ThesisWebsite/assets/122294682/ed2891de-6def-468d-819e-965a7da41f8d)
