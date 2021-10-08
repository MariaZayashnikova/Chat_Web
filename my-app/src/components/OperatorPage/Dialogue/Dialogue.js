import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import {
    fetch_Dialogues_From_Database,
    Update_Dialogue_In_Database,
    push_NewMessage_In_Database,
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
    FormGroup,
    Label,
    Form,
    Modal,
    ModalBody,
} from 'reactstrap'
import moment from 'moment'
import 'moment/locale/ru.js'
import './Dialogue.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'
import { calculateDate } from '../OperatorPage'

function Dialogue({
    fetch_Dialogues_From_Database,
    dialogues,
    itemId,
    Update_Dialogue_In_Database,
    push_NewMessage_In_Database,
}) {
    if (!dialogues) {
        fetch_Dialogues_From_Database()
    }
    let allResultFilter = []

    let nameClient

    let isSavedCase = false

    let objResultDialogue = {}

    function filterData() {
        for (let objDialogue in dialogues) {
            if (objDialogue === itemId) {
                let contentDialogue = dialogues[objDialogue]
                nameClient = contentDialogue.client
                if (contentDialogue.status) {
                    objResultDialogue.completionTime =
                        contentDialogue.completionTime
                    objResultDialogue.grade = contentDialogue.grade
                }
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

    let valueInput

    function submitNewMessage() {
        if (!valueInput) return
        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: valueInput,
                isOperator: true,
            },
        }
        push_NewMessage_In_Database(newMessage, itemId)
    }

    function analyzeContent(str) {
        let options = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
        let res
        let index
        let startSrt
        let endStr

        options.forEach((elem) => {
            let reg = new RegExp(`(http|https)://.*.${elem}`, 'gi')
            if (reg.test(str)) {
                res = str.match(reg)
                index = str.indexOf(res[0])
                startSrt = str.slice(0, index)
                endStr = str.slice(res[0].length + index)
            }
        })

        return { res, startSrt, endStr }
    }

    const [modal, setModal] = useState(false)

    const toggleModal = () => setModal(!modal)

    const [dropdownOpen, setDropdownOpen] = useState(false)

    let toggleDropdown = () => setDropdownOpen((dropdownOpen) => !dropdownOpen)

    const ViewResultFinishedDialogue = () => {
        let CalcStars = () => {
            let arr = []
            for (let i = 0; i < objResultDialogue.grade; i++) {
                arr.push(
                    <FontAwesomeIcon
                        icon={['fas', 'star']}
                        key={i}
                        color="yellow"
                        size="3x"
                    />
                )
            }
            return arr
        }
        return (
            <div className="containerDialogue__resultFinishedDialogue">
                <div className="containerDialogue__resultFinishedDialogue_stars">
                    <CalcStars />
                </div>

                <p>
                    Диалог завершился &nbsp;
                    {moment(objResultDialogue.completionTime).fromNow()}
                </p>
            </div>
        )
    }

    const ViewResult = ({ arrResult }) => {
        arrResult.reverse()
        return arrResult.map((elem) => {
            let timestamp = calculateDate(elem.time)
            let { res, startSrt, endStr } = analyzeContent(elem.content)
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
                    <ToastBody>
                        {res ? (
                            <>
                                <div>{startSrt}</div>
                                <img
                                    src={res[0]}
                                    alt="img"
                                    className="containerDialogue__containerMessages_image"
                                    onClick={toggleModal}
                                ></img>
                                <div>{endStr}</div>
                                <Modal
                                    isOpen={modal}
                                    toggle={toggleModal}
                                    className="containerDialogue__containerMessages_modal"
                                >
                                    <ModalBody>
                                        <Button
                                            color="primary"
                                            onClick={toggleModal}
                                            className="containerDialogue__containerMessages_modalBtnClose"
                                        >
                                            <FontAwesomeIcon
                                                icon={['fas', 'times']}
                                                color="white"
                                            />
                                        </Button>
                                        <img
                                            src={res[0]}
                                            alt="img"
                                            width="100%"
                                        ></img>
                                    </ModalBody>
                                </Modal>
                            </>
                        ) : (
                            elem.content
                        )}
                    </ToastBody>
                </Toast>
            )
        })
    }

    let resultFinishedDialogue = objResultDialogue.completionTime ? (
        <ViewResultFinishedDialogue />
    ) : null

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
                                        Update_Dialogue_In_Database(
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
                                        Update_Dialogue_In_Database(
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
                        {resultFinishedDialogue}
                        <div className="containerDialogue__Answers">
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    submitNewMessage()
                                    e.target[0].value = ''
                                }}
                                className="containerDialogue__Answer"
                            >
                                <FormGroup className="position-relative">
                                    <Label for="answer">Введите ответ:</Label>
                                    <Input
                                        id="answer"
                                        name="answer"
                                        type="text"
                                        onChange={(e) => {
                                            valueInput = e.target.value
                                        }}
                                    />
                                </FormGroup>
                                <Button
                                    className="containerDialogue__Answer_btn"
                                    color="primary"
                                    type="submit"
                                >
                                    Отправить
                                </Button>
                            </Form>
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
                                    toggle={toggleDropdown}
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

const mapStateToProps = ({ dialogues }) => {
    return {
        dialogues,
    }
}

const mapDispatchToProps = {
    fetch_Dialogues_From_Database,
    Update_Dialogue_In_Database,
    push_NewMessage_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue)
