import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pushDialogue, singnOutUser } from '../../../actions'
import Spinner from '../../Spinner/Spinner'
import SettingsUser from './SettingsUser/SettingsUser'
import './User.css'

function User({ user, singnOutUser, pushDialogue, loadingFromState }) {
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
        pushDialogue(obj)
    }

    return (
        <div className="containerUser">
            <h2 className="containerUser__name">
                {user.photoUrl ? (
                    <div className="containerUser__avatar">
                        <img src={user.photoUrl} alt="avatar" width="100%" className="containerUser__avatar_image" />
                    </div>
                ) : <FontAwesomeIcon
                    icon={['fas', 'user']}
                    color="darkblue"
                    className="containerUser__icon"
                />}

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
                onClick={() => singnOutUser()}
            >
                Выйти
            </Button>
        </div>
    )
}

const mapStateToProps = ({ user, loadingFromState }) => ({ loadingFromState, user })

const mapDispatchToProps = { singnOutUser, pushDialogue }

export default connect(mapStateToProps, mapDispatchToProps)(User)
