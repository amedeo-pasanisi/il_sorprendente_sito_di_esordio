import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <ul>
                <Link to ="https://three-js-tests-amedeo-pasanisi.vercel.app/" target="_blank"><li>EIH Logo</li></Link>
                <Link to="https://fox-animation-zeta.vercel.app/" target="_blank"><li>Volpe</li></Link>
                <Link to="https://camera-positions-data.vercel.app/" target="_blank"><li>Automobile</li></Link>
            </ul>
        </>
    )
}