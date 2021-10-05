import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import {
    fetch_Dialogues_From_Database,
    Update_Data_In_Database,
} from '../../../actions'
import { connect } from 'react-redux'
import {
    Toast,
    ToastBody,
    ToastHeader,
    Button,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'
import 'moment/locale/ru.js'
import './Dialogue.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'

function Dialogue({
    fetch_Dialogues_From_Database,
    dialogues,
    itemId,
    Update_Data_In_Database,
}) {
    if (!dialogues) {
        fetch_Dialogues_From_Database()
    }
    let allResultFilter = []

    let nameClient

    let isSavedCase = false

    function filterData() {
        for (let objDialogue in dialogues) {
            if (objDialogue === itemId) {
                let contentDialogue = dialogues[objDialogue]
                nameClient = contentDialogue.client
                if (contentDialogue.isSave) {
                    isSavedCase = contentDialogue.isSave
                }
                let messages = contentDialogue.messages
                for (let messageTime in messages) {
                    let contentMessage = messages[messageTime]
                    let obj = {
                        time: parseInt(messageTime, 10),
                        content: contentMessage.content,
                        isOperator: contentMessage.isOperator,
                    }
                    allResultFilter.push(obj)
                }
            }
        }
    }

    if (dialogues) {
        filterData()
    }

    const [dropdownOpen, setDropdownOpen] = useState(false)

    let toggle = () => setDropdownOpen((dropdownOpen) => !dropdownOpen)

    let result =
        allResultFilter.length > 0 ? (
            <ViewResult arrResult={allResultFilter} />
        ) : null

    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body">
                    <ToastContainer />
                    <div className="containerDialogue">
                        <div className="containerDialogue__client">
                            {nameClient}
                            {isSavedCase ? (
                                <Button
                                    type="button"
                                    outline
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        Update_Data_In_Database(
                                            { isSave: false },
                                            itemId
                                        )
                                    }}
                                >
                                    Удалить из сохранённых
                                </Button>
                            ) : (
                                <Button
                                    outline
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                        Update_Data_In_Database(
                                            { isSave: true },
                                            itemId
                                        )
                                    }}
                                >
                                    Сохранить диалог
                                </Button>
                            )}
                        </div>
                        <div className="containerDialogue__containerMessages">
                            <div className="containerDialogue__containerMessages_messages">
                                {result}
                            </div>
                        </div>
                        <div className="containerDialogue__Answers">
                            <div className="containerDialogue__Answers_answer">
                                Введите ответ:
                                <Input />
                            </div>
                            <div className="containerDialogue__readyAnswers">
                                <div className="containerDialogue__readyAnswers_settings">
                                    <div>Или выберете из готовых:</div>
                                    <FontAwesomeIcon
                                        icon={['fas', 'cog']}
                                        color="grey"
                                    />
                                </div>
                                <Dropdown
                                    isOpen={dropdownOpen}
                                    toggle={toggle}
                                    size="sm"
                                >
                                    <DropdownToggle
                                        className="dropdownCustom"
                                        caret
                                    >
                                        Варианты
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Foo Action</DropdownItem>
                                        <DropdownItem>Bar Action</DropdownItem>
                                        <DropdownItem>Quo Action</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ViewResult = ({ arrResult }) => {
    arrResult.reverse()
    return arrResult.map((elem) => {
        let timestamp = moment(elem.time).fromNow()
        return (
            <Toast
                className={
                    elem.isOperator ? 'operatorMessage' : 'clientMessage'
                }
                key={elem.time}
            >
                <ToastHeader className="infoMessage">
                    {elem.isOperator ? 'Вы:' : 'Клиент:'}
                    <div className="timeMessage">{timestamp}</div>
                </ToastHeader>
                <ToastBody>{elem.content}</ToastBody>
            </Toast>
        )
    })
}

const mapStateToProps = ({ dialogues }) => {
    return {
        dialogues,
    }
}

const mapDispatchToProps = {
    fetch_Dialogues_From_Database,
    Update_Data_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue)
