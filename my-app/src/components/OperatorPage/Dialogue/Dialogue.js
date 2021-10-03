import React, { useState } from 'react'
import '../OperatorPage.css'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import {
    fetch_Data_From_Database,
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
import Spinner from '../../Spinner/Spinner'
import { ToastContainer } from 'react-toastify'

function Dialogue({
    fetch_Data_From_Database,
    dataFromDatabase,
    loadingFromState,
    itemId,
    Update_Data_In_Database,
}) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }
    let allResultFilter = []
    let nameClient

    function filterData() {
        for (let idDialog in dataFromDatabase) {
            let objDialogs = dataFromDatabase[idDialog]
            for (let elem in objDialogs) {
                if (elem === itemId) {
                    let contentDialog = objDialogs[elem]
                    nameClient = contentDialog.client
                    let messages = contentDialog.messages
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
    }

    if (dataFromDatabase) {
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
                <div className="containerBody">
                    <SearchBar />
                    <ToastContainer />
                    <div className="containerDialogue">
                        <div className="client">
                            {nameClient}
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
                        </div>
                        <div className="containerDialogueMessages">
                            {loadingFromState ? <Spinner /> : null}
                            <div className="listMessages">{result}</div>
                        </div>
                        <div className="containerAnswer">
                            <div className="answer">
                                Введите ответ:
                                <Input />
                            </div>
                            <div className="readyAnswers">
                                <div className="readyAnswersSettings">
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

const mapStateToProps = ({ dataFromDatabase, loadingFromState }) => {
    return {
        dataFromDatabase,
        loadingFromState,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    Update_Data_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue)
