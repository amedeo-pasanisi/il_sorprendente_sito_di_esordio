import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <Link to="https://supermarkettest.vercel.app/" target="_blank"><li>Super Mercato</li></Link>
                <Link to ="https://three-js-tests-amedeo-pasanisi.vercel.app/" target="_blank"><li>Elis Innovation Hub Logo</li></Link>
                <Link to="https://fox-animation-zeta.vercel.app/" target="_blank"><li>Volpe</li></Link>
                <Link to="https://camera-positions-data.vercel.app/" target="_blank"><li>Automobile</li></Link>
            </ul>
        </nav>
    )
}