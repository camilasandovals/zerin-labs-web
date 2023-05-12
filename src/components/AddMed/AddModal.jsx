import { useState, useContext } from "react";
import {  Modal } from "react-bootstrap"
import { PlusCircleFill } from "react-bootstrap-icons"
import AddMed from "./AddMedForm";

export default function AddModal() {
  
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <PlusCircleFill size={60} color={"violet"} onClick={() => setShowModal(true)} />
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
        <AddMed setShowModal={setShowModal}/>
        </Modal.Body>
    </Modal >
    </>
  );
}