import { useState, useEffect } from 'react'
import { Physics } from '@react-three/rapier'
import { Environment } from '@react-three/drei'
import { useControls } from 'leva'
import Pointer from './components/Pointer'
import Blob from './components/Blob'
import Globe from './components/Globe'
import Title from './components/Title'

const Experience = () => {
    const [isPointerMoved, setIsPointerMoved] = useState(false)
    const handlePointerMoved = () => {
        setIsPointerMoved(true)
        document.removeEventListener('pointermove', handlePointerMoved)
    }
    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMoved)
        document.addEventListener('pointerenter', () => setIsPointerMoved(true))
        document.addEventListener('pointerleave', () => setIsPointerMoved(false))
    }, [])

    const textDebug = useControls({
        positionA: {value: {x: -2.3, y: 0}}
    })
    
    return <>
        <Environment preset='night' />
        <ambientLight intensity={1.5} />
        <directionalLight position={[1, 1, 1]} intensity={5}/>
        <Physics timeStep="vary" gravity={[0, 0, 0]}>
            {isPointerMoved && <Pointer />}
            <Globe />
            <Blob />
        </Physics>
        <Title />
    </>
}

export default Experience
