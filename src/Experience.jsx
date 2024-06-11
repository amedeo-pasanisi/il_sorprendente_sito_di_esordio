import {useRef} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {BallCollider, Physics, RigidBody} from '@react-three/rapier'
import {Html} from '@react-three/drei'

export default function Experience() {
    const api = useRef()
    const vec = new THREE.Vector3()
    useFrame(() => {
        api.current?.
            applyImpulse(vec.copy(api.current.translation()).
            negate(10, 0, 0).
            multiplyScalar(0.1))
    })
    
    return <>
        <Physics timeStep="vary" gravity={[0, 0, 0]}>
            <Pointer />
            <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={[1, 0, 1]} ref={api} colliders={false}>
                <BallCollider args={[0.5]} />
                <mesh  castShadow receiveShadow>
                    <sphereGeometry args={[0.5, 64, 64]} />
                    <meshNormalMaterial />
                </mesh>
            </RigidBody>
        </Physics>
        <Html
            transform
            distanceFactor={4}
            occlude='blending'
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </Html>
    </>
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ pointer, viewport }) => {
        ref.current?.
            setNextKinematicTranslation(
                vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
            )
    })
    
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[0.1]} />
        </RigidBody>
    )
}