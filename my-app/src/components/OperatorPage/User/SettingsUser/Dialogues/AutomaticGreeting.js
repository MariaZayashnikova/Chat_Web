import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SettingsUserDialogue.css'

function AutomaticGreeting({ automaticGreeting, submit }) {
    const [valueInputAutomaticGreeting, setValueInputAutomaticGreeting] =
        useState(automaticGreeting ? automaticGreeting : '')

    const [showBtnSubmit, setShowBtnSubmit] = useState(false)

    return (
        <div className="settingsDialogue__greetings">
            <div>
                Автоматическое приветствие:
            </div>
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
                    className="settingsDialogue__readyPhrases_phraseBtn"
                >
                    <FontAwesomeIcon
                        icon={['fas', 'check']}
                        color="white"
                    />
                </Button>
            ) : null}
        </div>
    )
}

export default AutomaticGreeting
