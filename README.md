<h1 align="center">
  <br>
  <img src="https://around-the-block.s3.amazonaws.com/Pink+Logo.png" alt="ABT" width="100">
  <br>
  Around the Block
  <br>
</h1>

## Motivation
As many of us are stuck inside during the COVID-19 pandemic, it is important to take time to go outside, breathe fresh air, and walk around. During this time, I have had the opportunity to explore my neighborhood, you know, around the block. I started seeing all these unique or even trivial things that I had never noticed before. I wanted a way to capture and share with others what I have been observing. 

I began to envision a neighborhood photo-sharing app where a photo is tied to a specific location on the map. I wondered whether I could manipulate a map marker to allow users to not only place it on the map but also directly upload a photo to it. So I began coding to find out. 

## Built with
- React
- Node.js/Express
- PostgresSQL

## Key Features

### Map page - Upload a photo
![upload](https://media.giphy.com/media/YARjlvcu2On1Y0r8LS/giphy.gif)
- Click on the map to place a marker
- Select the placed marker
- Fill in the form, drag a photo into the drop zone
- Submit!
- The photo is immediately accessible within the marker

### Map page - Explore
![explore](https://media.giphy.com/media/7dS31xSF9pHJC32TQt/giphy.gif)
- Use the search bar to look up a place
- Click the Geolocation button to bring the map to your location
- View photos shared by others by clicking the markers
- “Like” a photo to save it to your personal page

### My Photos page - Your personal page
![myphotos](https://media.giphy.com/media/4b32pc6L3KBRBfOwXf/giphy.gif)
- My Photos tab: View the photos uploaded by you
- Liked Photos tab: View the photos “liked” by you
- Use the map to explore as well

This application uses React Dropzone, Combobox, Ant Design, and Foundation as well.

[Click here visit Around the Block's Heroku page](https://around-the-block.herokuapp.com/)

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
