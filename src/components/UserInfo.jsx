import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserModal from "./UserModal";

export default function UserInfo() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Image src={user?.img} className="fluid"/>
                    </Row>
                    <p>{user && user.fullname? user.fullname : 'User'}</p>
                    <p>Points: {user?.points}</p>
                    <Row>
                        <Button onClick={
                            () => {
                                navigate('/login');
                                localStorage.removeItem('user');}
                        }>Logout</Button> 
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}