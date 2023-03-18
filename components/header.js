import * as React from 'react'
import Link from 'next/link';



const Header = () => {

    return (
        <header style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "100" }}>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "grey" }}>
                <div className="container-fluid">

                    <a className="navbar-brand" style={{paddingLeft:"15px"}}>Supplier</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">List</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href="/add">Add</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;