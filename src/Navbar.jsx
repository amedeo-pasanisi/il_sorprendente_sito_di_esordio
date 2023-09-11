import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <Link to="https://supermarkettest.vercel.app/" target="_blank"><li>Super Mercato (React)</li></Link>
                <Link to="https://react-three-fiber-video-game.vercel.app/" target="_blank"><li>Video Game (React Three Fiber)</li></Link>
                <Link to ="https://three-js-tests-amedeo-pasanisi.vercel.app/" target="_blank"><li>Elis Innovation Hub Logo (Three.js)</li></Link>
                <Link to="https://fox-animation-zeta.vercel.app/" target="_blank"><li>Volpe (Three.js)</li></Link>
                <Link to="https://camera-positions-data.vercel.app/" target="_blank"><li>Automobile (Three.js)</li></Link>
            </ul>
        </nav>
    )
}