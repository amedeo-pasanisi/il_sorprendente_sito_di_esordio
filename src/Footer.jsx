import './Footer.css'
import { Link } from "react-router-dom"

export default function Footer() {
    return  <footer>
        <span>Made by Amedeo Pasanisi</span>
        <Link to="https://www.linkedin.com/in/amedeo-pasanisi" target="_blank"><img src="../public/icons8-linkedin.svg" alt="" /></Link>
    </footer>
}