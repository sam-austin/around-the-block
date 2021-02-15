import React, { useState, useEffect } from "react"
import { Layout } from 'antd';
const { Content, Header, Sider } = Layout;

import PersonalMap from "./PersonalMap"
import ProfileMarkersTile from "./ProfileMarkersTile"

const ProfilePage = props => {
  const [userMarkers, setUserMarkers] = useState([])

  const getMarkers = async () => {
    try {
      const response = await fetch("/api/v1/user-markers")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setUserMarkers(responseBody.markers)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMarkers()
  }, [])

  const markersDisplay = userMarkers.map(userMarker => {
    return(
      <ProfileMarkersTile
        key={`${userMarker.lat} - ${userMarker.lng}`}
        userMarker={userMarker}
      />  
    )
  })

  const markerIcon = color => {
    return ({
      path:
        "M10.453 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: color,
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 1.5,
      anchor: new google.maps.Point(13.2, 22),
    })
  };

  return (
    <div>
      <Header>
      </Header>
        <Sider
          className='profile-sider'
          style={{ padding: '0 0 24px 0' }}
          className="site-layout-background"
          width={250}
          style={{
            overflow: 'auto',
            height: "86.8vh",
            position: 'fixed',
            left: 24,
            top:88,
          }}
          >
            {markersDisplay} 
        </Sider>
      <Layout style={{ padding: '24px 24px 24px 298px'}} className="site-layout-background">
        <Content 
          className="site-layout-background"
          style={{ 
          overflow: 'auto',
          }}>
          
          <PersonalMap 
          className="site-layout-background"
          userMarkers={userMarkers} 
          markerIcon={markerIcon} 
          />
        </Content>
      </Layout>
    </div>
  )
}

export default ProfilePage
