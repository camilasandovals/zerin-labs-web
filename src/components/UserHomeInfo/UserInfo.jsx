import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserModal from "../Modal/UserModal";
import "./styles.css";

export default function UserInfo() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <section>
                    <div>
                    <h2>Welcome {user && user.fullname? user.fullname : 'User'}</h2>
                    </div>
                    <div>
                        <img src={user?.img} className="image-user-home"/>
                    </div>
                    <h3>Points: {user?.points}</h3>
                    <div>
                        <button className="button-landing-form" onClick={
                            () => {
                                navigate('/');
                                localStorage.removeItem('user')
                                setUser(null);}
                        }>Logout</button> 
                    </div>
        </section>
    )
}