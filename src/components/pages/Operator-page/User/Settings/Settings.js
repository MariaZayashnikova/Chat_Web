import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'
import { Button } from 'reactstrap'
import { clearErrors } from '../../../../../actions'
import SettingsDialogues from './Dialogues/Settings-dialogues'
import SettingsProfile from './Profile/Settings-profile'
import './Settings.css'

function Settings({ clearErrors, settingsUser }) {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)

    function closeModal() {
        setIsOpen(false)
        clearErrors()
    }
    return (
        <>
            {settingsUser ? (
                <FontAwesomeIcon
                    icon={['fas', 'cog']}
                    color="blue"
                    className="User__icon User__icon_settings"
                    onClick={openModal}
                />
            ) : null}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} >
                <div className="Settings">
                    <Button className="Settings__close" color="primary" onClick={closeModal} >
                        <FontAwesomeIcon icon={['fas', 'times']} color="white" />
                    </Button>
                    <SettingsProfile closeModal={closeModal} />
                    <SettingsDialogues />
                </div>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ settingsUser }) => ({ settingsUser })

const mapDispatchToProps = { clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(Settings)