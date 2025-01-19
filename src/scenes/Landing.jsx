import ReactPannellum from "react-pannellum";
import bg from "../images/ZerinLabs.webp";
import { useState } from "react";
import SignUpForm from "../components/SignForms/SignUpForm";
import LoginForm from "../components/SignForms/LoginForm";

export default function Landing() {
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);

  return (
    <section className="section-landing-360-container">
      <div style={{ position: "relative", width: "100%", height: "880px" }}>
        <ReactPannellum
          id="1"
          sceneId="firstScene"
          imageSource={bg}
          style={{ width: '100%', height: '100%' }}
          config={{
            autoLoad: true,
            autoRotate: -2,
          }}
        />
        <h1
          className="main-h1"
          style={{
            position: "absolute",
            top: "13%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          ZerinLabs
        </h1>

        <SignUpForm
          isVisibleSignUp={isVisibleSignUp}
          setIsVisibleSignUp={setIsVisibleSignUp}
          isVisibleLogin={isVisibleLogin}
          setIsVisibleLogin={setIsVisibleLogin}
        />
        <LoginForm
          isVisibleLogin={isVisibleLogin}
          setIsVisibleLogin={setIsVisibleLogin}
          isVisibleSignUp={isVisibleSignUp}
          setIsVisibleSignUp={setIsVisibleSignUp}
        />
      </div>
    </section>
  );
}
