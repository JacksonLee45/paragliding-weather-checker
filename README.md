# Paragliding Weather Checker

## Overview

The Paragliding Weather Checker is a web application designed to help paragliders assess weather conditions before their flights. By entering two geographic coordinates, users can retrieve real-time weather data from OpenWeather, ensuring safe and informed flight decisions.
This application is built using React JavaScript and connects to an AWS API Gateway and Lambda function to fetch weather information.
________________________________________
## Features
- **Coordinate-Based** Weather Lookup: Enter latitude and longitude to receive current weather data.
- **Real-Time Data:** Weather information is retrieved directly from OpenWeather.
- **AWS Integration:** Utilizes AWS API Gateway and Lambda for secure and efficient data processing.
- **Responsive Interface:** Clean and intuitive UI built with React and styled using Tailwind CSS and Bootstrap.
________________________________________
## Technologies Used
- **Frontend:** React JavaScript, Tailwind CSS, Bootstrap
- **Backend:** AWS API Gateway, AWS Lambda
- **Weather API:** OpenWeather
- **Map API:** Google
________________________________________
##Installation
1. **Clone the Repository:**
git clone https://github.com/YOUR-USERNAME/paragliding-weather-checker.git
cd paragliding-weather-checker
2.	**Install Dependencies:**
npm install
3.	**Set Up Environment Variables:**
Create a .env file in the root directory and add your API key:
REACT_APP_API_GATEWAY_URL=YOUR_OPENWEATHER_API_KEY
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
4.	**Run the Application:**
npm start
________________________________________
## Deployment
This project can be deployed using platforms like Vercel or Netlify for quick and reliable hosting.
For Vercel deployment:
1.	Push the project to GitHub.
2.	Connect the repository to Vercel.
3.	Add the environment variable (REACT_APP_API_KEY) in Vercel’s settings.
4.	Deploy the project.
________________________________________
## Usage
1.	Open the application in your web browser.
2.	Enter the latitude and longitude of your desired location.
3.	Click the Check Weather button.
4.	View the weather information including temperature, wind speed, and conditions.
