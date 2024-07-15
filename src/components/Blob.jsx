import { useRef } from 'react'
import * as THREE from 'three'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import useRandomMovement from '../hooks/useRandomMovement'

const Blob = () => {
    const blob = useRef()
    useRandomMovement(blob, new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
    ))

    const phisicsDebug = useControls({
        friction: { value: 0.1, min: 0, max: 10, step: 0.05 },
    })
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

    return (
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
                    // onBeforeCompile={onBeforeCompile}
                />
            </mesh>
        </RigidBody>
    )
}

export default Blob
