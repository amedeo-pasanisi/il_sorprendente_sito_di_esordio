import {useFrame} from '@react-three/fiber'
import { useRef } from 'react'

export default function Experience() {
    const sphereRef = useRef()

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        const frequency = 1.5 // Oscillation speed
        const amplitude = 0.1 // Oscillation
        const offset = 0.5 // Sphere scale
        const scale = Math.cos(elapsedTime * frequency) * amplitude + offset
        sphereRef.current.scale.x = scale
        sphereRef.current.scale.y = scale
        sphereRef.current.scale.z = scale
    })
    
    return <>
        <mesh ref={sphereRef} position={[0, -2, 0]}>
            <sphereGeometry />
            <meshNormalMaterial />
        </mesh>
    </>
}