import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

function App() {

  return (
    <Canvas
      eventPrefix="client"
      eventSource={document.getElementById('root')}
    >
      <Experience />
    </Canvas>
  )
}

export default App
