import { Text } from '@react-three/drei'
import { useThree } from "@react-three/fiber"

const Title = () => {
    const { viewport } = useThree()
    console.log(viewport.width)

    return <group position={[0, 0.5, 0]}>
        <Text
            color='black'
            overflowWrap='normal'
            textAlign='center'
            font='/Ingeborg-BoldItalic.woff'
            fontSize={viewport.width > 9 ? 1 : 0.4}
            maxWidth={viewport.width / 2}
        >
            Il sorprendente sito di esordio di Amedeo
        </Text>
    </group>
}

export default Title
