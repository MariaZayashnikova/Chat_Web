import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { fetchUserSettings, updateChatSettings, } from '../../../../../../actions'
import ReadyPhrases from './Ready-phrases'
import AutomaticGreeting from './Automatic-greeting'
import Topics from './Topics'
import './Settings-dialogue.css'

function SettingsDialogues({ updateChatSettings, user, settingsUser, fetchUserSettings, }) {

    const submit = useCallback(values => {
        updateChatSettings(values, user.uid)
        fetchUserSettings(user.uid)
    }, [fetchUserSettings, updateChatSettings, user.uid])

    return (
        <div className="Settings-dialogues">
            <h2>Настройки Диалогов</h2>
            <div className="Settings-dialogues-containers">
                <div className="Settings-dialogues-container">
                    <div>
                        <h4>Готовые фразы:</h4>
                        <ReadyPhrases phrases={settingsUser.phrases} submit={submit} />
                        <AutomaticGreeting submit={submit} automaticGreeting={settingsUser.automaticGreeting} />
                    </div>
                </div>
                <Topics />
            </div>
        </div >
    )
}

const mapStateToProps = ({ user, settingsUser }) => ({ user, settingsUser })

const mapDispatchToProps = {
    updateChatSettings,
    fetchUserSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialogues)