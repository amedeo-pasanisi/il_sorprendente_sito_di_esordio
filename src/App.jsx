import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import { Leva } from 'leva'

function App() {

  return (<>
    <div className='htmlContainer'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    <Leva collapsed hidden={ window.location.hash !== '#debug'} />
    <Canvas
      eventPrefix="client"
      eventSource={document.getElementById('root')}
    >
      <Experience />
    </Canvas>
  </>
  )
}

export default App
