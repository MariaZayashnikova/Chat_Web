import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import {
    fetchUserSettings,
    updateSettingsDialogue,
} from '../../../../../../actions'
import ReadyPhrases from './ReadyPhrases'
import AutomaticGreeting from './AutomaticGreeting'
import Topics from './Topics'
import './SettingsUserDialogue.css'

function SettingsUserDialogues({
    updateSettingsDialogue,
    user,
    settingsUser,
    fetchUserSettings,
}) {
    let submit = useCallback(values => {
        updateSettingsDialogue(values, user.uid)
        fetchUserSettings(user.uid)

    }, [fetchUserSettings, updateSettingsDialogue, user.uid])


    return (
        <div className="containerSettingsDialogues">
            <h2>Настройки Диалогов</h2>
            <div className="settingsDialogue">
                <div className="settingsDialogue__block">
                    <div className="settingsDialogue__readyPhrases">
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
    updateSettingsDialogue,
    fetchUserSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUserDialogues)
