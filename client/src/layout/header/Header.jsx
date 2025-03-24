import { NavLink } from "react-router"

const Header = () => {
  return (
    <header>
        <nav>
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/login" end>Iniciar Sesion</NavLink> 
        </nav>
    </header>
  )
}

export default Header
