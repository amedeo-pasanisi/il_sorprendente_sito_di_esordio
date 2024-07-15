import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'

const Pointer = ({ vec = new THREE.Vector3() }) => {
    const pointerRef = useRef()
    useFrame(({ pointer, viewport }) => {
        if (pointerRef.current) {
            pointerRef.current.setNextKinematicTranslation(
                vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
            )
        }
    })

    return (
        <RigidBody position={[20, 20, 20]} type="kinematicPosition" colliders={false} ref={pointerRef}>
            <BallCollider args={[0.1]}/>
            <mesh><sphereGeometry args={[0.1]}/></mesh>
        </RigidBody>
    )
}

export default Pointer
