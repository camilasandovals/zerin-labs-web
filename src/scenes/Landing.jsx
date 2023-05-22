import { Pannellum } from 'pannellum-react';
import { Button, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../images/ZerinLabs.png";
import { useState } from "react"
import SignUpForm from '../components/SignForms/SignUpForm';
import LoginForm from '../components/SignForms/LoginForm';

export default function Landing(){
    const navigate = useNavigate()
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);
    let location = useLocation();

    
    
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
           <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: "white"}}>Zerin Labs</h1>

            <SignUpForm isVisibleSignUp={isVisibleSignUp} setIsVisibleSignUp={setIsVisibleSignUp} isVisibleLogin={isVisibleLogin} setIsVisibleLogin={setIsVisibleLogin}/>
            <LoginForm isVisibleLogin={isVisibleLogin} setIsVisibleLogin={setIsVisibleLogin} isVisibleSignUp={isVisibleSignUp} setIsVisibleSignUp={setIsVisibleSignUp}/>
    
            </div>
            
        
        </section>
    )
}