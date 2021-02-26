import React, { useState, useEffect } from "react"
import { Layout, Tabs } from 'antd';
const { Content, Header, Sider } = Layout;
const { TabPane } = Tabs;

import PersonalMap from "./PersonalMap"
import ProfileMarkersTile from "./ProfileMarkersTile"

const ProfilePage = props => {
  const [userMarkers, setUserMarkers] = useState([])
  const [likedMarkers, setLikedMarkers] = useState([])

  const getUserMarkers = async () => {
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
    getUserMarkers()
  }, [])

  const markersDisplay = userMarkers.map(userMarker => {
    return(
      <ProfileMarkersTile
        key={`${userMarker.lat} - ${userMarker.lng}`}
        marker={userMarker}
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
      setLikedMarkers(responseBody.likedMarkers)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getLikedMarkers()
  }, [])

  const addNewLikeProfile = async (liked) => {
    try {
      const response = await fetch(`/api/v1/markers/likes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(liked)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      if (responseBody) {
        getLikedMarkers()
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const removeLike = async (markerInfo) => {
    try {
      const response = await fetch(`/api/v1/markers/likes`, 
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(markerInfo)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      if (responseBody) {
        getLikedMarkers()
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const likedMarkersDisplay = likedMarkers.map(likedMarker => {
      return(
        <ProfileMarkersTile
          key={`${likedMarker.lat} - ${likedMarker.lng}`}
          marker={likedMarker}
      />    
      )
    })

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
          <Tabs defaultActiveKey="1" type="card" size="default">
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
            likedMarkers={likedMarkers}
            addNewLikeProfile={addNewLikeProfile}
            removeLike={removeLike}
          />
        </Content>
      </Layout>
    </div>
  )
}

export default ProfilePage
