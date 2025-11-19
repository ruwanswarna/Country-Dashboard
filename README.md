# Country Dashboard 🌍

A modern JavaScript-based web application that allows users to search
for any country and instantly view detailed information such as
geographical facts, weather data, maps, and more. It also detects the
user's public IP and provides location-based data.
------------------------------------------------------------------------
## 🚀 Features
### 🔎 Search Any Country
-   Fetches country details from the REST Countries API\
-   Displays flag, population, region, languages, currencies, and more

### 🌦️ Real-Time Weather
-   Uses WeatherAPI.com to retrieve live weather for the selected
    country or city

### 🗺️ Interactive Map
-   Uses Leaflet.js + OpenStreetMap\
-   Auto-adjusts zoom level based on country size\
-   Adds and updates markers dynamically

### 📍 IP-based Location Detection
-   Gets user's IP using `seeip.org`\
-   Resolves city & country using `ip-api.com`

### 🖼️ Wikipedia Intro
-   Fetches introductory paragraph for each country using the Wikipedia
    API
------------------------------------------------------------------------

## 🧰 Tech Stack
-   **HTML**
-   **CSS**
-   **JavaScript (ES6+)**
-   **Leaflet.js** for maps\
-   **REST Countries API**\
-   **WeatherAPI.com**\
-   **seeip.org** and **ip-api.com**\
-   **Wikipedia API**
------------------------------------------------------------------------

## 📁 Project Structure

    /project-root
    │── index.html
    │── style.css
    │── script.js
    │── /assets
        |── placeholder.png
    │── /src
        |── script.js
        │── style.css
        │── weatherAPI.js
        │── wikipediaAPI.js
        │── restCountriesAPI.js
        │── ipToLocation.js

------------------------------------------------------------------------

## ⚙️ How It Works
1.  User searches for any country\
2.  App fetches full details via REST Countries API\
3.  WeatherAPI returns real-time weather\
4.  Wikipedia API provides intro text\
5.  Leaflet map centers and zooms dynamically\
6.  User's IP-based location is detected automatically
------------------------------------------------------------------------

## 🌐 Live Demo On Netlify
https://country-dashboard-anusha.netlify.app/

------------------------------------------------------------------------

## 🛠️ Setup Instructions
Clone the repository:
``` bash
git clone https://github.com/your-username/country-dashboard.git
```
Open the project:
``` bash
cd country-dashboard
```
Start a simple local server (optional):
``` bash
npx live-server
```
Replace the sample Weather API key in `script.js` with your own or use the one already provided:
``` js
const apiKey = "your_api_key_here";
```
