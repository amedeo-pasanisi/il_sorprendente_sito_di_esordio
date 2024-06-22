import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { useTexture } from '@react-three/drei'

export default function Experience() {
    const [isPointerMoved, setIsPointerMoved] = useState(false)
    const texture = useTexture({map:'heart_day_color_map.jpg', roughnessMap: 'heart_specular_map.jpg'})
    const api = useRef()
    const vec = new THREE.Vector3()

    const handleMouseMove = () => {
        setIsPointerMoved(true)
        window.removeEventListener('pointermove', handleMouseMove)
    }
    useEffect(() => {
        window.addEventListener('pointermove', handleMouseMove)
    }, [])

    useFrame(() => {
        api.current?.
            applyImpulse(vec.copy(api.current.translation()).
            negate(10, 0, 0).
            multiplyScalar(0.1))
    })
    
    return <>
        <ambientLight intensity={1.5} />
        <directionalLight position={[1, 1, 1]} intensity={5}/>
        <Physics timeStep="vary" gravity={[0, 0, 0]}>
            {isPointerMoved && <Pointer />}
            <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={[1, 0, 1]} ref={api} colliders={false}>
                <BallCollider args={[0.5]} />
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[0.5, 64, 64]} />
                    <meshStandardMaterial {...texture} />
                </mesh>
            </RigidBody>
        </Physics>
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
        <RigidBody position={[20,20,20]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[0.1]} />
        </RigidBody>
    )
}