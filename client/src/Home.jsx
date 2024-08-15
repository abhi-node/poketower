import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Home(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.loading && !props.logged) {
            navigate("/login");
        }
    }, [props.logged, navigate]);

    if (!props.logged) {
        return null;
    }
    return (
        <>
            <h1>{props.user.username}</h1>
        </>
    );
}

export default Home
