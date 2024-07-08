import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { Environment, useTexture, Text, MeshTransmissionMaterial, Float } from '@react-three/drei'
import { useControls } from 'leva'
import Pointer from './components/Pointer'

const range = 2
const dampingFactor = 0.98
const generateRandomPoint = () => {
    return new THREE.Vector3(
        (Math.random() - 0.5) * 2 * range,
        (Math.random() - 0.5) * 2 * range,
        (Math.random() - 0.5) * 2 * range
    );
};
const closeEnoughDistance = 1
const maxImpulseStrength = 0.005

const Experience = () => {
    const [isPointerMoved, setIsPointerMoved] = useState(false)
    const [target, setTarget] = useState(new THREE.Vector3(
        (Math.random() - 0.5) * 2 * range,
        (Math.random() - 0.5) * 2 * range,
        (Math.random() - 0.5) * 2 * range
    ))
    const blob = useRef()
    const moveTowardsTarget = () => {
        if (!blob.current) return
        const currentPos = new THREE.Vector3(
            blob.current.translation().x,
            blob.current.translation().y,
            blob.current.translation().z
        )
        const direction = new THREE.Vector3()
            .copy(target)
            .sub(currentPos)
            .normalize()
        const distanceToTarget = currentPos.distanceTo(target)
        if (distanceToTarget < closeEnoughDistance) {
            setTarget(generateRandomPoint());
        }
        const impulseStrength = Math.min(maxImpulseStrength, distanceToTarget * maxImpulseStrength);
        const impulse = direction.multiplyScalar(impulseStrength);
        blob.current.applyImpulse(impulse);
        const velocity = new THREE.Vector3(
            blob.current.linvel().x,
            blob.current.linvel().y,
            blob.current.linvel().z
        )
        blob.current.setLinvel(velocity.multiplyScalar(dampingFactor))
    };

    const texture = useTexture({map:'heart_day_color_map.jpg', roughnessMap: 'heart_specular_map.jpg'})
    const api = useRef()
    const vec = new THREE.Vector3()

    const handlePointerMoved = () => {
        setIsPointerMoved(true)
        document.removeEventListener('pointermove', handlePointerMoved)
    }
    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMoved)
        document.addEventListener('pointerenter', () => setIsPointerMoved(true))
        document.addEventListener('pointerleave', () => setIsPointerMoved(false))
    }, [])

    const blobDebug = useControls({
        thickness: { value: 0.7, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.05, min: 0, max: 1},
        backside: { value: false},
        envMapIntensity: 100,
        blobMultiplyScalar: 0.10,
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
        moveTowardsTarget()
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
            <RigidBody
                ref={blob}
                colliders={false}
                friction={phisicsDebug.friction}
                position={[-1, 0, 3]}
            >
                <BallCollider args={[0.4]} />
                <mesh>
                    <sphereGeometry args={[0.4, 50, 50]} />
                    <MeshTransmissionMaterial
                        {...blobDebug}
                        background={new THREE.Color('white')}
                    />
                </mesh>
            </RigidBody>
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
