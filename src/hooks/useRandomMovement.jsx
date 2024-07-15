import { useState } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

const RANGE = 5
const DAMPING_FACTOR = 0.98
const CLOSE_ENOUGH_DISTANCE = 1
const MAX_IMPULSE_STRENGTH = 0.005

const generateRandomPoint = () => new Vector3(
    (Math.random() - 0.5) * RANGE,
    (Math.random() - 0.5) * RANGE,
    (Math.random() - 0.5) * RANGE
)

const useRandomMovement = (ref, initialTarget) => {
    const [target, setTarget] = useState(initialTarget)
    const vec3 = new Vector3()

    useFrame(() => {
        if (ref.current) {
            const velocity = vec3.copy(ref.current.linvel())
            ref.current.setLinvel(velocity.multiplyScalar(DAMPING_FACTOR), true)
            const currentPos = vec3.copy(ref.current.translation())
            const direction = new Vector3()
                .copy(target)
                .sub(currentPos)
                .normalize()
            const distanceToTarget = currentPos.distanceTo(target)
            if (distanceToTarget < CLOSE_ENOUGH_DISTANCE) {
                setTarget(generateRandomPoint())
            }
            const impulseStrength = Math.min(MAX_IMPULSE_STRENGTH, distanceToTarget * MAX_IMPULSE_STRENGTH)
            const impulse = direction.multiplyScalar(impulseStrength)
            ref.current.applyImpulse(impulse)
        }
    })
    return target
}

export default useRandomMovement
