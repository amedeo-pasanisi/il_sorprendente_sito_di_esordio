import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'

const Pointer = ({ vec = new THREE.Vector3() }) => {
    const ref = useRef()
    useFrame(({ pointer, viewport }) => {
        ref.current?.
            setNextKinematicTranslation(
                vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
            )
    })
    
    return (
        <RigidBody position={[20, 20, 20]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[0.1]}/>
        </RigidBody>
    )
}

export default Pointer
