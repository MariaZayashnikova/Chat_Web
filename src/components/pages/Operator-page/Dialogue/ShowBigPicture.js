import React, { useState } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Dialogue.css'
// заменить на picture-preview
function ShowBigPicture({ srcImg, style }) {
    const [modal, setModal] = useState(false)

    const toggleModal = () => setModal(!modal)

    return (
        <>
            <img
                src={srcImg}
                alt="img"
                className={style.name}
                onClick={toggleModal}
                width="100%"
            ></img>

            <Modal
                isOpen={modal}
                toggle={toggleModal}
                className="containerDialogue__containerMessages_modal"
            >
                <ModalBody>
                    <Button
                        color="primary"
                        onClick={toggleModal}
                        className="containerDialogue__containerMessages_modalBtnClose"
                    >
                        <FontAwesomeIcon
                            icon={['fas', 'times']}
                            color="white"
                        />
                    </Button>
                    <img src={srcImg} alt="img" width="100%"></img>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ShowBigPicture
