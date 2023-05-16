import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
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
        
            await createUserWithEmailAndPassword(auth, email, password);
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user;
            const token = await user.getIdToken();
            localStorage.setItem("token", token)
            console.log(token)
            navigate("/home");
          } catch (err) {
            alert(err);
          }
        };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const response = await signInWithPopup(auth, provider)
            const { email, uid } = auth.currentUser
            console.log(email, uid)
            const user = response.user;
            setUser(user)
            const token = await user.getIdToken();
            localStorage.setItem("token", token)
            fetch("http://3.95.14.19:3001/api/users", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   
            body: JSON.stringify({email, uid})  // I AM NOT SENDING THE CORRECT UID
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
            </Form>
                <p>
                    Or sign up with 
                    <Button onClick={signInWithGoogle}>Google</Button>
                </p>
        </Container>
    )
}