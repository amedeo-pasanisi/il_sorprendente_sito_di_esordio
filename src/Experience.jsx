import {useRef} from 'react'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {BallCollider, Physics, RigidBody} from '@react-three/rapier'

export default function Experience() {
    const sphereRef = useRef()
    const api = useRef()
    const vec = new THREE.Vector3()
    useFrame((state, delta) => {
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate(10, 0, 0).multiplyScalar(0.9))
        
        const elapsedTime = state.clock.elapsedTime
        const frequency = 1.5 // Oscillation speed
        const amplitude = 0.1 // Oscillation
        const offset = 0.5 // Sphere scale
        const scale = Math.cos(elapsedTime * frequency) * amplitude + offset
        sphereRef.current.scale.x = scale
        sphereRef.current.scale.y = scale
        sphereRef.current.scale.z = scale
    })
    
    return <Physics timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={[1, 0, 1]} ref={api} colliders={false}>
            <BallCollider args={[1]} />
            <mesh  castShadow receiveShadow>
                <sphereGeometry args={[0.5, 64, 64]} />
                <meshNormalMaterial />
            </mesh>
        </RigidBody>
        <mesh ref={sphereRef} position={[0, -2, 0]}>
            <sphereGeometry />
            <meshNormalMaterial />
        </mesh>
    </Physics>
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
            ref.current?.
                setNextKinematicTranslation(
                    vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
                )
        }
    )
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
        <BallCollider args={[1]} />
        </RigidBody>
    )
}