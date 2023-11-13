import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas style={{
      position : 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      zIndex: -1
    }}>
      <mesh scale={0.5} position={[0, -2, 0]}>
        <sphereGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
    <App />
  </React.StrictMode>,
)
