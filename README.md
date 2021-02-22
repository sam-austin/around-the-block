# Around the Block

Capture. Share. Discover.

<b>Around the Block</b> is a web application that allows a user to pin photos around their neighborhood to the specific locations on the map and discover what others have shared as well. 

A signed in user can view and share photos by visiting the Map page, generated by the Google Maps API. The user can then look up a specific location using the Google Places search bar or use the Geocoder button to bring the map to their current location. From there, the user can place a marker on the map, click on the marker, and add a photo in the popup window. Once the photo is submitted, they can immediately access it from the same marker. The user can also explore markers and photos shared by other users (retrieved from AWS S3) and save the photos to the My Photos page by clicking the heart button. In the My Photos page, the user will be able see the infinite scroll list of photos taken by them and list of liked photos, along with the corresponding markers on their personal map. 

This application uses React Dropzone, Combobox, Ant Design, and Foundation as well. 

[Click here visit Around the Block's Heroku page](https://around-the-block.herokuapp.com/)

## Written in
- React
- Node.js/Express
- PostgresSQL

## Available Scripts

#### `yarn install`
Installs dependencies

#### `yarn db:migrate latest`
Creates and migrates the databse (must be run from the server directory)

#### `yarn dev`
Starts the Node.js server. This application can be accessed locally at http://localhost:3000
