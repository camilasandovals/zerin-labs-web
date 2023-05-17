import { Col, Container, Row, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"

export default function UserInfo() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <Container>
            <Row>
                <Col>
                    <Row>
                        <h2>User information</h2>
                    </Row>
                    <p>Name: {user && user.email? user.email : 'User'}</p>
                    <p>Points: {user?.points}</p>
                    <Row>
                        <Button onClick={
                            () => {
                                navigate('/login');
                                localStorage.removeItem('user')
                                setUser(null);}
                        }>Logout</Button> 
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}