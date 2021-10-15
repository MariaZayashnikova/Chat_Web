import React, { useState } from 'react'
import { REMOVE_FAILURE } from '../../../../actions'
import { connect } from 'react-redux'
import './SettingsUser.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'
import SettingsProfile from './Profile/SettingsProfile'
import { Button } from 'reactstrap'
import SettingsUserDialogues from './Dialogues/SettingsUserDialogues'

function SettingsUser({ REMOVE_FAILURE }) {
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
        REMOVE_FAILURE()
    }
    return (
        <>
            <FontAwesomeIcon
                icon={['fas', 'cog']}
                color="blue"
                className="containerUser__icon containerUser__icon_settings"
                onClick={openModal}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <div className="containerSettings">
                    <Button
                        className="containerSettings__btnClose"
                        color="primary"
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon
                            icon={['fas', 'times']}
                            color="white"
                        />
                    </Button>
                    <SettingsProfile closeModal={closeModal} />
                    <SettingsUserDialogues />
                </div>
            </Modal>
        </>
    )
}

const mapDispatchToProps = {
    REMOVE_FAILURE,
}

export default connect(null, mapDispatchToProps)(SettingsUser)
