import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Landing(){
    const navigate = useNavigate()

    return(
        <>
            <h2>Landing</h2>
            <Button onClick={() => navigate('/signup')}>Sign up</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
        </>
    )
}