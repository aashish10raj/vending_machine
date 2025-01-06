import react from "react";
import { Link } from "react-router-dom";



const Header=()=>{
return(
    <header className="d-flex
    justify-content-between align-items-center p-3 
    bg-secondary text-white">

        <h1 className="m-0">VENDING MACHINE</h1>
        <Link to="/login">
        <button className="btn btn-primary m-8 bg- white"> LOG IN </button>
        </Link>
    </header>
);}

export default Header;