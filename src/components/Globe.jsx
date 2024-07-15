import { useRef } from 'react'
import * as THREE from 'three'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { useTexture } from '@react-three/drei'
import useRandomMovement from '../hooks/useRandomMovement'

const Globe = () => {
    const globeRef = useRef()
    const texture = useTexture({map:'heart_day_color_map.jpg', roughnessMap: 'heart_specular_map.jpg'})
    useRandomMovement(globeRef, new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
    ))

    const phisicsDebug = useControls({
        multiplyScalar: { value: 0.1, min: 0, max: 3, step: 0.05 },
        friction: { value: 0.1, min: 0, max: 10, step: 0.05 },
    })
    
    return (
        <RigidBody
            angularDamping={0.3}
            friction={phisicsDebug.friction}
            position={[1, 0, 1]}
            rotation={[0.5,-2,0]}
            ref={globeRef}
            colliders={false}
        >
            <BallCollider args={[0.5]} />
            <mesh>
                <sphereGeometry args={[0.5, 50, 50]} />
                <meshStandardMaterial envMapIntensity={0} {...texture} />
            </mesh>
        </RigidBody>
    )
}

export default Globe
