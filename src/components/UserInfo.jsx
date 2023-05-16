import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useContext } from "react";

export default function UserInfo() {
    const [user, setUser] = useContext(UserContext)
    return(
        <Container>
            <Row>
                <Col>
                    <h2>User information</h2>
                    <p>Name: {user && user.displayName? user.displayName : 'User'}</p>
                    <p>Points:</p>
                </Col>
            </Row>
        </Container>
    )
}