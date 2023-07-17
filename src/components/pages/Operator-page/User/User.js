import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pushDialogue, signOutUser } from '../../../../actions'
import Spinner from '../../../Spinner/Spinner'
import Settings from './Settings/Settings'
import './User.css'

function User({ user, signOutUser, pushDialogue, loadingFromState }) {
    function addDialogueCustom() { // функция для добавления нового обращения, пока не готово мобильное приложение
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
        <div className="User">
            <h2 className="User__name">
                {user.photoUrl ? (
                    <div className="User__avatar">
                        <img src={user.photoUrl} alt="avatar" width="100%" className="User__avatar_image" />
                    </div>
                ) : <FontAwesomeIcon icon={['fas', 'user']} color="darkblue" className="User__icon" />}

                {user.name ? user.name : user.email}

                <Settings />
            </h2>

            {user.uid === 'BPAkuUugWZZ1OPnUkTUOtIanWQD2' ? (
                <Button outline color="secondary" onClick={addDialogueCustom}>
                    Добавить
                </Button>
            ) : null}

            {loadingFromState ? <Spinner /> : null}

            <Button outline color="primary" className="User__sign-out" onClick={() => signOutUser()}>
                Выйти
            </Button>
        </div>
    )
}

const mapStateToProps = ({ user, loadingFromState }) => ({ loadingFromState, user })

const mapDispatchToProps = { signOutUser, pushDialogue }

export default connect(mapStateToProps, mapDispatchToProps)(User)
