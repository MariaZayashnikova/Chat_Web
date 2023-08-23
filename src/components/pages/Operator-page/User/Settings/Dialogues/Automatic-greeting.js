import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Settings-dialogue.css'

function AutomaticGreeting({ automaticGreeting, submit }) {
    const [valueInputAutomaticGreeting, setValueInputAutomaticGreeting] =
        useState(automaticGreeting ? automaticGreeting : '')

    const [showBtnSubmit, setShowBtnSubmit] = useState(false)

    return (
        <div className="settings-dialogue-item">
            <div>  Автоматическое приветствие: </div>
            <Input
                value={valueInputAutomaticGreeting}
                onChange={(e) => {
                    setValueInputAutomaticGreeting(e.target.value)
                    setShowBtnSubmit(true)
                }}
            />
            {showBtnSubmit ? (
                <Button
                    color="success"
                    type="button"
                    onClick={() => {
                        submit({ automaticGreeting: valueInputAutomaticGreeting })
                        setShowBtnSubmit(false)
                    }}
                    className="settings-dialogue-action"
                >
                    <FontAwesomeIcon icon={['fas', 'check']} color="white" />
                </Button>
            ) : null}
        </div>
    )
}

export default AutomaticGreeting