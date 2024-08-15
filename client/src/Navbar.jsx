import { useState , useEffect } from "react";

function Navbar(props) {
    const [message, setMessage] = useState("Logged out.");
    useEffect(() => {
        if (props.logged) {
            setMessage("Logged in as: ".concat(props.user.username));
        } else {
            setMessage("Logged out.")
        }
    }, [props.logged, props.user])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png" width="30px" className="float-left"/>
                    <a className="navbar-brand" href="/">Poketower</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/builder">Builder</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Battle</a>
                            </li>
                        </ul>
                        <ul className="d-flex navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page">{message}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar