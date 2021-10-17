import React from 'react'
import { push_Dialogue, SignOut_User } from '../../../actions'
import { connect } from 'react-redux'
import './User.css'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../Spinner/Spinner'
import SettingsUser from './SettingsUser/SettingsUser'

function User({ user, SignOut_User, push_Dialogue, loadingFromState }) {
    function addDialogueCustom() {
        let name = prompt('Ваше имя')
        let content = prompt('Тест обращения')
        let time = new Date().getTime()

        let obj = {
            client: name,
            status: 'active',
            topic: 'topic',
            subtopic: 'subtopic',
            messages: {
                [time]: {
                    content: content,
                    isOperator: false,
                },
            },
        }
        push_Dialogue(obj)
    }

    return (
        <div className="containerUser">
            <h2 className="containerUser__name">
                <FontAwesomeIcon
                    icon={['fas', 'user']}
                    color="darkblue"
                    className="containerUser__icon"
                />
                {user.name ? user.name : user.email}
                <SettingsUser />
            </h2>
            <Button outline color="secondary" onClick={addDialogueCustom}>
                Добавить
            </Button>
            {loadingFromState ? <Spinner /> : null}
            <Button
                className="btnCustom"
                outline
                color="primary"
                onClick={() => SignOut_User()}
            >
                Выйти
            </Button>
        </div>
    )
}

const mapStateToProps = ({ user, loadingFromState }) => {
    return {
        loadingFromState,
        user,
    }
}

const mapDispatchToProps = {
    SignOut_User,
    push_Dialogue,
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
