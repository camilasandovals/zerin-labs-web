import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useState } from "react"

const firebaseConfig = {
    apiKey: "AIzaSyCaj2yp6o3IUmnuEqtrrYjwitTElPe6AMY",
    authDomain: "zerin-labs.firebaseapp.com",
    projectId: "zerin-labs",
    storageBucket: "zerin-labs.appspot.com",
    messagingSenderId: "7317186784",
    appId: "1:7317186784:web:2bc91b599ed45c92498885"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default function SignUpForm() {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleAddUser = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const result = await createUserWithEmailAndPassword(auth, email, password)
        .catch(err => alert(err));
        console.log(result.user);
        setUser(user)
        fetch("http://54.234.48.173:3001/api/users", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({email, password})
       })
           .then(resp => resp.json())
           .then( data => {
               if(data.message) {
                   alert(data.message)
                   return
               }
           })
        .catch(alert) 
        navigate('/home')
    }

    //THE FOLLORING CODE IS BEING USED TWICE
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            setUser(result.user)
            const { email, uid } = auth.currentUser
            console.log(email, uid)
            fetch("http://54.234.48.173:3001/api/users", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({email}, {uid})
       })
            .then(resp => resp.json())
            navigate('/home')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Container>
            <h2>Sign Up</h2>
            <p>Already an user? <span onClick={() => navigate('/login')}>Login!</span></p>
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
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                <p>
                    Or sign up with 
                    <Button onClick={signInWithGoogle}>Google</Button>
                </p>
            </Form>
        </Container>
    )
}