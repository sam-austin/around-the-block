<h1 align="center">
  <img src="https://around-the-block.s3.amazonaws.com/Pink+Logo.png" alt="ABT" width="70" />
  <br>
  Around the Block
  <br>
  <img src="https://around-the-block.s3.amazonaws.com/Screen+Shot+2021-03-13+at+10.54.20+AM.png" alt="landing" width="600" />
</h1>

## Motivation
As many of us are stuck inside during the COVID-19 pandemic, it has become important to take time to go outside, breathe fresh air, and walk around. During this time, I have had the opportunity to explore my neighborhood, you know, around the block. I started seeing all these unique or even trivial things that I had never noticed before. I wanted a way to capture and share with others what I have been observing in my neighborhood. 

I began to envision a photo-sharing app where a photo is tied to a specific location on the map. I wondered whether I could manipulate a map marker to allow users to not only place it on the map but also directly upload a photo to it. So I began coding to find out. 

[Click here visit Around the Block's Heroku page](https://around-the-block.herokuapp.com/)

## Built with
- React
- Node.js/Express
- PostgreSQL

## Key Features

### Map page - Upload a photo
![upload](https://media.giphy.com/media/YARjlvcu2On1Y0r8LS/giphy.gif)
- Click on the map to place a marker
- Drag a photo into the drop zone
- Submit!
- The photo is immediately accessible in the marker

### Map page - Explore
![explore](https://media.giphy.com/media/7dS31xSF9pHJC32TQt/giphy.gif)
- Use the search bar to look up a place
- Click the Geolocation button to bring the map to your location
- View shared photos by clicking the markers
- “Like” a photo to save it to your personal page

### My Photos page - Your personal page
![myphotos](https://media.giphy.com/media/4b32pc6L3KBRBfOwXf/giphy.gif)
- My Photos tab: View the photos uploaded by you
- Liked Photos tab: View the photos “liked” by you
- Use the personal map to explore as well

This application also uses React Dropzone, Combobox, Ant Design, and Foundation.

## APIs used
- Google Maps
- Google Places
- AWS S3
- Geolocation

## Available Scripts

#### `yarn install`
Installs dependencies

#### `yarn db:migrate latest`
Creates and migrates the databse (must be run from the server directory)

#### `yarn dev`
Starts the Node.js server. This application can be accessed locally at http://localhost:3000
