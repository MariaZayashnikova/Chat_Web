import React from 'react'
import { push_Data, SignOut_User } from '../../../actions'
import { connect } from 'react-redux'
import './User.css'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function User({ user, SignOut_User, push_Data }) {
    function addDialogCustom() {
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
        push_Data(obj)
    }

    return (
        <div className="containerUser">
            <h2 className="nameUser">
                <FontAwesomeIcon
                    icon={['fas', 'user']}
                    color="darkblue"
                    className="iconUser"
                />
                {user.email}
                <Link to="/OperatorPage/Settings">
                    <FontAwesomeIcon
                        icon={['fas', 'cog']}
                        color="blue"
                        className="iconUser settingsUser"
                    />
                </Link>
            </h2>
            <Button outline color="secondary" onClick={addDialogCustom}>
                Добавить
            </Button>
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

const mapStateToProps = ({ user }) => {
    return {
        user,
    }
}

const mapDispatchToProps = {
    SignOut_User,
    push_Data,
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
