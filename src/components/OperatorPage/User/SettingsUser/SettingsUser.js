import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'
import { Button } from 'reactstrap'
import { clearErrors } from '../../../../actions'
import SettingsUserDialogues from './Dialogues/SettingsUserDialogues'
import SettingsProfile from './Profile/SettingsProfile'
import './SettingsUser.css'

function SettingsUser({ clearErrors, settingsUser }) {
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

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
                    className="containerUser__icon containerUser__icon_settings"
                    onClick={openModal}
                />
            ) : null}

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

const mapStateToProps = ({ settingsUser }) => ({ settingsUser })

const mapDispatchToProps = { clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUser)
