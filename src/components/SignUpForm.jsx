import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function SignUpForm() {
    const navigate = useNavigate()
    return(
        <Container>
            <h2>SignUp</h2>
            <p>Already an user? <span onClick={() => navigate('/login')}>Login!</span></p>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text>
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group>
                <Button variant="primary" type="submit"
                onClick={() => navigate('/home')}>
                    Sign up
                </Button>
            </Form>
        </Container>
    )
}