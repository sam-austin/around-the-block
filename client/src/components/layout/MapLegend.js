import React, { useState } from "react"
import { Menu, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const MapLegend = props => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return(
    <div style={{ width: 170, position: "absolute" }}>

      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>

      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        theme="dark"
      >
        <Menu.Item 
          key="1" 
          disabled 
          icon={<img src="https://around-the-block.s3.amazonaws.com/magnifying-glass.png"
          className="map-legend-icon"
          />}
        >
          <span className="map-legend-text">
            Locate Me!
          </span>
        </Menu.Item>

        <Menu.Item 
          key="2" 
          disabled
          icon={<img src="https://around-the-block.s3.amazonaws.com/blue-svg-marker-ed.png"
          className="map-legend-marker"
          />}
        >
          <span className="map-legend-text">
            Your Markers
          </span>    
        </Menu.Item>

        <Menu.Item 
          key="3" 
          disabled
          icon={<img src="https://around-the-block.s3.amazonaws.com/purple-svg-marker.png"
          className="map-legend-marker"
          />}
        >
          <span className="map-legend-text">
            Other Markers
          </span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MapLegend