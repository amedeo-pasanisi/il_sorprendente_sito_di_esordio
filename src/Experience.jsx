import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { Environment, useTexture, Text, MeshTransmissionMaterial, Float } from '@react-three/drei'
import { useControls } from 'leva'
import Pointer from './components/Pointer'

const Experience = () => {
    const [isPointerMoved, setIsPointerMoved] = useState(false)
    const texture = useTexture({map:'heart_day_color_map.jpg', roughnessMap: 'heart_specular_map.jpg'})
    const api = useRef()
    const glass = useRef()
    const vec = new THREE.Vector3()
    const vec2 = new THREE.Vector3()

    const handlePointerMoved = () => {
        setIsPointerMoved(true)
        document.removeEventListener('pointermove', handlePointerMoved)
    }
    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMoved)
        document.addEventListener('pointerenter', () => setIsPointerMoved(true))
        document.addEventListener('pointerleave', () => setIsPointerMoved(false))
    }, [])

    const materialDebug = useControls({
        thickness: { value: 0.7, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.05, min: 0, max: 1},
        backside: { value: true},
    })
    const phisicsDebug = useControls({
        multiplyScalar: { value: 0.1, min: 0, max: 3, step: 0.05 },
        friction: { value: 0.1, min: 0, max: 10, step: 0.05 },
        envMap: { value: 1, min: 0, max: 100, step: 0.05 }
    })
    const textDebug = useControls({
        positionA: {value: {x: -2.3, y: 0}}
    })

    useFrame(() => {
        api.current?.
            applyImpulse(vec.copy(api.current.translation()).
            negate().
            multiplyScalar(phisicsDebug.multiplyScalar))
        glass.current?.
            applyImpulse(vec2.copy(glass.current.translation()).
            negate().
            multiplyScalar(phisicsDebug.multiplyScalar))
    })
    
    return <>
        <Environment preset='night' />
        <ambientLight intensity={1.5} />
        <directionalLight position={[1, 1, 1]} intensity={5}/>
        <Physics timeStep="vary" gravity={[0, 0, 0]}>
            {isPointerMoved && <Pointer />}
            <RigidBody
                linearDamping={4}
                angularDamping={1}
                friction={phisicsDebug.friction}
                position={[1, 0, 1]}
                rotation={[0.5,-2,0]}
                ref={api}
                colliders={false}
            >
                <BallCollider args={[0.5]} />
                <mesh>
                    <sphereGeometry args={[0.5, 50, 50]} />
                    <meshStandardMaterial envMapIntensity={0} {...texture} />
                </mesh>
            </RigidBody>
            <Float
                speed={5} // Animation speed, defaults to 1
                rotationIntensity={5} // XYZ rotation intensity, defaults to 1
                floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
            </Float>
            <RigidBody
                ref={glass}
                colliders={false}
                friction={phisicsDebug.friction}
                position={[-1, 0, 3]}
            >
                <BallCollider args={[0.4]} />
                <mesh>
                    <sphereGeometry args={[0.4, 50, 50]} />
                    <MeshTransmissionMaterial
                        envMapIntensity={phisicsDebug.envMap}
                        {...materialDebug}
                        background={new THREE.Color('white')}
                    />
                </mesh>
            </RigidBody>
        </Physics>
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
    </>
}

export default Experience
