import react from "react";



const Header=()=>{
return(
    <header className="d-flex
    justify-content-between align-items-center p-3 
    bg-secondary text-white">

        <h1 className="m-0">VENDING MACHINE</h1>

        <button className="btn btn-primary m-8 bg- white"> LOG IN </button>
    </header>
);}

export default Header;