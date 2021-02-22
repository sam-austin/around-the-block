import React, { useState, useEffect } from "react"
import { Layout, Tabs } from 'antd';
const { Content, Header, Sider } = Layout;
const { TabPane } = Tabs;

import PersonalMap from "./PersonalMap"
import ProfileMarkersTile from "./ProfileMarkersTile"
import LikedMarkersTile from "./LikedMarkersTile"

const ProfilePage = props => {
  const [userMarkers, setUserMarkers] = useState([])
  const [likedMarkers, setLikedMarkers] = useState([])

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

  const getLikedMarkers = async () => {
    try {
      const response = await fetch("/api/v1/user-markers/likes")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      debugger
      setLikedMarkers(responseBody.likedMarkers)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getLikedMarkers()
  }, [])

  const likedMarkersDisplay = likedMarkers.map(likedMarker => {
      return(
        <LikedMarkersTile
          key={`${likedMarker.lat} - ${likedMarker.lng}`}
          likedMarker={likedMarker}
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
    <div className="site-layout">
      <Header>
      </Header>
        <Sider
          className="profile-sider grid-container site-layout-background"
          width={390}
          style={{
            overflow: 'auto',
            height: "91vh",
            position: 'fixed',
            left: 12,
            top:64,
          }}
          >
          <Tabs defaultActiveKey="1" type="card" size="large">
          <TabPane tab="My Photos" key="1">
          {markersDisplay}
          </TabPane>
          <TabPane tab="Liked Photos" key="2">
          {likedMarkersDisplay}
          </TabPane>
            </Tabs>
        </Sider>
      <Layout style={{ padding: '0 0 0 392px'}} className="site-layout-background grid-container">
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
