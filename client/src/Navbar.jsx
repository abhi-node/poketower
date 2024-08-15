import { useState, useEffect } from "react";

function Navbar(props) {
    const [message, setMessage] = useState("Logged out.");
    useEffect(() => {
        if (!props.loading && props.logged) {
            setMessage("Logged in as: ".concat(props.user.username));
        } else if (!props.loading) {
            setMessage("Logged out.")
        }
    }, [props.logged, props.user])
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-red-500 p-6">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <a className="text-xl font-semibold tracking-wide" href="/" aria-label="Brand">
                        <span className="inline-flex items-center gap-x-2 text-xl font-semibold text-white">
                            <img className="w-10 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png" />
                            Poketower
                        </span>
                    </a>
                    <div className="lg:hidden">
                        <button
                            className="text-red-400 hover:text-red-200 focus:text-red-500 focus:outline-none"
                            aria-expanded="false"
                            aria-controls="navbar"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    id="navbar"
                    className="hidden lg:flex lg:items-center lg:w-auto w-full mt-4 lg:mt-0"
                >
                    <ul className="lg:flex lg:items-center text-base">
                        <li>
                            <a
                                className="block lg:inline-block text-red-200 hover:text-red-50 mr-4"
                                href="/builder"
                            >
                                Builder
                            </a>
                        </li>
                        <li>
                            <a
                                className="block lg:inline-block text-red-200 hover:text-red-50 mr-4"
                                href="#"
                            >
                                Battle
                            </a>
                        </li>
                        <li>
                            <a className={"block lg:inline-block text-red-200" + (props.logged ? " mr-4" : "")}>
                                {message}
                            </a>
                            
                        </li>
                        <li>
                            {props.logged && <a className="block lg:inline-block bg-white hover:bg-red-400 text-red-400 hover:text-white hover:cursor-pointer border-white font-bold py-2 px-4 rounded" onClick={props.callback}>Logout</a>}
                        </li>
                    </ul>
                </div>
            </nav>
        </>

    );
}

export default Navbar