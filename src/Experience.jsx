import { useState, useEffect } from 'react'
import { Physics } from '@react-three/rapier'
import { Environment, Text } from '@react-three/drei'
import { useControls } from 'leva'
import Pointer from './components/Pointer'
import Blob from './components/Blob'
import Globe from './components/Globe'

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
        <group position={[0, 0.5, 0]}>
            <Text
                color='black'
                maxWidth={7}
                textAlign='center'
                font='/Ingeborg-BoldItalic.woff'
            >
                Il sorprendente sito di esordio di
            </Text>
            <Text
                position={[textDebug.positionA.y, textDebug.positionA.x, 0]}
                color='black'
                maxWidth={7}
                textAlign='center'
                font='/Ingeborg-BoldItalic.woff'
            >
                Amedeo
            </Text>
        </group>
    </>
}

export default Experience
