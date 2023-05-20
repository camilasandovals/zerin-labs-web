import { Form, Button, Container, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useState } from "react"


export default function SignUpForm() {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);

    const handleAddUser = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await fetch("http://3.95.14.19:3001/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
        
            if (data.message) {
              alert(data.message);
              return;
            }
        
            setUser(data);
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/home')
            
          } catch (err) {
            alert(err);
          }
        };

       
          
    return(
        <>
            <button className="button-landing" variant="primary" type="submit" style={{ position: 'absolute', top: '70%', left: '60%', transform: 'translate(-50%, -50%)' }} onClick={() => setIsVisibleSignUp(true)}>Sign up</button>
        <Row className="justify-content-center">
        <Col md={3} style={{ position: 'absolute', top: '35%', transform: 'translate(0%, -50%)' }}>
            {isVisibleSignUp &&
            <>
            <h2>Sign Up</h2>
            {/* <p>Already an user? <span onClick={() => navigate('/login')}>Login!</span></p> */}
            <Form onSubmit={handleAddUser}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} required={true}
                    onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" />
                    <Form.Text>
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required={true}
                    onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                    <Form.Text>
                    Minimun 8 characters.
                    </Form.Text>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group> */}
                <button type="submit" className="button-landing">
                    Sign up
                </button>
            </Form>
            </>
        }
        </Col>
        </Row>
        </>
    )
}