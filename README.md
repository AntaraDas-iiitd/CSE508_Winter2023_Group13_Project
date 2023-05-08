# CSE508_Winter2023_Group13_Project

Video demo :- https://www.youtube.com/watch?v=aErsDs-pkzA

Project report :- report.pdf

Project ppt :- Group13_Project_Presentation.pdf

# Objective:

The project is a web application designed to provide users with
a comprehensive view of different tourist places and their associated details according to their preferences. India is a huge and
diverse country with enormous tourism potential. In this project, a
multimodal search engine is designed where a user can choose to
either give a text query or a photo query to see a collection of relevant destinations. To promote tourism in India and facilitate better
travel planning, there is a need to publish a non-profit website that
helps citizens and international travellers with information about a
plethora of Indian destinations and also recommends places based
on their interests.


# Project Overview:

- Dataset Creation:- 
A new dataset was created using Apify to extract data from hundreds of Google Maps locations across India, including reviews, images, opening hours, location, popular times, and more, with approximately 3,200 entries divided into categories such as pilgrimage, beach/sea, hill station/mountain, wildlife/forest, adventure, historical place, museums, trekking, desert, and smart city.

- Inverted indices creation:- 
In the Inverted Indices part, several indices were created, including city-index, state-index, category-index, cross-index, near-by-place-index, and place-index, which contain row indices corresponding to a particular city, state, category, and provide near-by tourist spots of a particular tourist spot within 200km using latitude and longitude, and coupling categories with state or city.

- Query processing:- 
The query processing involves matching the query with tourist spot names, categorizing and filtering results based on city/state or category, utilizing cross-index for multiple queries, and ranking results based on relevance and popularity, returning the top 100 results as final output.

- Image feature extractor:- 
The study experimented with using a CNN model for image feature extraction, but due to lack of accurate label annotation, a pre-trained VGG-16 model was used to extract features of train and test images for visual similarity-based place matching.

- User interface:- 
The application interface is built with React and Flask, providing a search-by-text-query option and a search-by-image option that uses image recognition technology to find related places, making it user-friendly and intuitive.

# Steps for execution:- 

1. Dataset named Travel_dataset_final_V3.csv is being used here.
2. run main.py file of flask for backend purpose
3. run App.js file of React.js for frontend purpose
4. Enter your free text query in search bar of Search By Text section to get relevant info (text + image) about the query searched.
5. Upload any image via upload button of Search By Image section to get relevant info (text + image) about the image uploaded.


