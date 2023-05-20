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
        <section className="section-user-home">
                    <div>
                    <h2>Welcome {user && user.fullname? user.fullname : 'User'}</h2>
                    </div>
                    <div>
                        <img src={user?.img} className="image-user-home"/>
                    </div>
                    <h2>Points: {user?.points}</h2>
                    <div>
                        <button className="button-landing"onClick={
                            () => {
                                navigate('/');
                                localStorage.removeItem('user');}
                        }>Logout</button> 
                    </div>
        </section>
    )
}