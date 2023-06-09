import { Pannellum } from 'pannellum-react';
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bg from "../images/ZerinLabs.webp";
import { useState } from "react"
import SignUpForm from '../components/SignForms/SignUpForm';
import LoginForm from '../components/SignForms/LoginForm';

export default function Landing(){
    const navigate = useNavigate()
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);
 

    
    
    return(
        <section className='section-landing-360-container'>
            <div style={{ position: 'relative', width: '100%', height: '880px' }}>
            <Pannellum
                width="100%"
                height="100%"
                image={bg}
                yaw={180}
                hfov={110}
                autoLoad
                autoRotate={-5}
                compass={false}
                showZoomCtrl={false}
                showFullscreenCtrl={false}
                mouseZoom={false}
            />
           <h1 className = "main-h1" style={{ position: 'absolute', top: '13%', left: '50%', transform: 'translate(-50%, -50%)', color: "white"}}>ZerinLabs</h1>
            
            <SignUpForm isVisibleSignUp={isVisibleSignUp} setIsVisibleSignUp={setIsVisibleSignUp} isVisibleLogin={isVisibleLogin} setIsVisibleLogin={setIsVisibleLogin}/>
            <LoginForm isVisibleLogin={isVisibleLogin} setIsVisibleLogin={setIsVisibleLogin} isVisibleSignUp={isVisibleSignUp} setIsVisibleSignUp={setIsVisibleSignUp}/>
    
            </div>
            
        
        </section>
    )
}