import React from "react"
import { Layout } from 'antd';
const { Content } = Layout;

const FeatureDescriptions = props => {
  
  return(
    <Content style={{ backgroundColor: "white" }}>
      <div className="landing-subsection grid-x grid-margin-x">
      
        <div className="cell medium-4 large-4 subsection-img-left">
          <img alt="town" src="https://around-the-block.s3.amazonaws.com/house-windows.png" />
        </div>
        <div className="cell medium-8 large-8 subsection">
          <h1 className="subsection-title">What's Around the Block?</h1>
          <p>
            Around the Block is a neighborhood photo-sharing app where you can pin photos directly on the map. As many of us are stuck inside during the COVID pandemic, it's become important to take time to go outside, breathe fresh air, and walk around. This presents an opportunity to explore and capture the unique or even trivial things that make your town distinct and beautiful. Share your neighborhood today!
          </p>
        </div>
      
        <div className="cell medium-8 large-8 subsection">
          <h1 className="subsection-title">Map - Upload Photos</h1>
          <p className>
            Do you have a photo to share? Visit the Map page to upload it! Use the search bar or the Geolocation button to locate where the photo was taken. You can place a marker by clicking anywhere on the map and upload a photo to that marker. Just drag a photo and submit!
          </p>
        </div>
        <div className="cell medium-4 large-4">
          <img alt="town" src="https://around-the-block.s3.amazonaws.com/marker-map-camera.png" />
        </div>

        <div className="cell medium-4 large-4 subsection-img-left">
          <img alt="town" src="https://around-the-block.s3.amazonaws.com/active-collection.png" />
        </div>
        <div className="cell medium-8 large-8 subsection">
          <h1 className="subsection-title">Map - View & Like</h1>
          <p>
            You can also select the placed markers around the map to see the photos uploaded by other users. If you want to favorite and save any photos to your personal page, simply click the heart button in the popup window.
          </p>
        </div>

        <div className="cell medium-8 large-8 subsection">
          <h1 className="subsection-title">My Photos - Your Personal Page</h1>
          <p>
            This is your personal photo diary page. Check out the My Photos tab to view the photos you have uploaded. You can also see the photos you liked in the Liked Photos tab. 
          </p>
        </div>
        <div className="cell medium-4 large-4">
          <img alt="town" src="https://around-the-block.s3.amazonaws.com/camera-photos.png" />
        </div>

      </div>
    </Content>
  )
}

export default FeatureDescriptions


