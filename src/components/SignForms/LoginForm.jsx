import { Form, Button, Container, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useState } from "react"


export default function SignUpForm({isVisibleLogin, setIsVisibleLogin, isVisibleSignUp, setIsVisibleSignUp}) {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleGetUser = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/users/login`, {
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
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/home')
            
          } catch (err) {
            alert(err);
          }
        };

        const setVisibility = () => {
            setIsVisibleLogin(true)
            setIsVisibleSignUp(false)
        }

    return(
        <>
            <button className="button-landing" variant="primary" type="submit" style={{ position: 'absolute', top: '70%', left: '40%', transform: 'translate(-50%, -50%)' }} onClick={setVisibility}>Login</button>
        <Row className="justify-content-center">
        {isVisibleLogin &&
            <>
        <Col md={3} style={{ position: 'absolute', top: '35%', transform: 'translate(0%, -50%)' }} className="sign-form">
            <h2>Login</h2>
            {/* <p>Already an user? <span onClick={() => navigate('/signup')}>Sign up!</span></p> */}
            <Form onSubmit={handleGetUser}>
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
                <button type="submit" className="button-landing-form">
                    Login
                </button>
            </Form>
         </Col>
            </>
         }
         </Row>
         </>
    )
}