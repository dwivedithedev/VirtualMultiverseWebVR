/**
 * @fileoverview 
 * This is our main A-Frame application.
 * It defines the main A-Frame Scene which gets mounted root div.
 * Made by Vaibhav Dwivedi at Designtack.com | Inspiration from @prayasht's version
 */

import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59','#FFFFFF']
const envPresets = ['yavapai','starry','dream','forest']

class Main extends Component {
  constructor() {
    super()
    
  this.state = {
    colorIndex: 0,
    envIndex: 0,
    spherePosition: { x: 0.0, y: 4, z: -10.0 },
    textPosition: { x: 0.0, y: 7.489, z: -10.0 },
    btmtextPosition: { x: 0.0, y: 1, z: -10.0 }
  }
}

_handleClick() {
  this.setState({
    colorIndex: (this.state.colorIndex + 1) % COLORS.length,
    envIndex:(this.state.envIndex + 1) % envPresets.length
  })
}

render() {
  return (
    <Scene
      environment={{
        preset: envPresets[this.state.envIndex],
        seed: 2,
        lightPosition: { x: 0.0, y: 0.03, z: -0.5 },
        fog: 0.8,
        ground: 'canyon',
        groundYScale: 6.31,
        groundTexture: 'walkernoise',
        groundColor: '#8a7f8a',
        grid: 'none'
      }}
     >

      <Entity primitive="a-camera" look-controls>
        <Entity
        primitive="a-cursor"
        cursor={{ fuse: false }}
        material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
        geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
        event-set__1={{
          _event: 'mouseenter',
          scale: { x: 1.4, y: 1.4, z: 1.4 }
        }}
        event-set__1={{
          _event: 'mouseleave',
          scale: { x: 1, y: 1, z: 1 }
        }}
        raycaster="objects: .clickable"
        />
      </Entity>
      <Entity
        lowpoly={{
          color: COLORS[this.state.colorIndex],
          nodes: true,
          opacity: 0.15,
          wireframe: true
        }}

        animation__oscillate={{
          property: 'position',
          dur: 2000,
          dir: 'alternate',
          easing: 'linear',
          loop: true,
          from: this.state.spherePosition,
          to: {
            x: this.state.spherePosition.x,
            y: this.state.spherePosition.y + 0.25,
            z: this.state.spherePosition.z
          }
        }}        

        animation__rotate={{
          property: 'rotation',
          dur: 30000,
          easing: 'linear',
          loop: true,
          to: { x: 0, y: 180, z: 0 }
        }}

        primitive="a-octahedron"
        class="clickable"
        detail={2}
        radius={2}
        position={this.state.spherePosition}
        color="#F5F5F5"
        events={{
          click: this._handleClick.bind(this)
        }}
      />
      
      <Entity text={{value:'Virtual Multiverse.',side:'double',align:'center',tabSize:3.99}} scale="25 25 25" position={this.state.textPosition} />
      <Entity text={{value:'Press the Sphere to Change the Environment',side:'double',align:'center',tabSize:3.99}} scale="10 10 10" position={this.state.btmtextPosition} />      
      <Entity
        primitive="a-light"
        type="directional"
        color="#FFF"
        intensity={1}
        position={{ x: 2.5, y: 0.0, z: 0.0 }}
      />
    </Scene>
    )
  }
}

export default Main
