import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'
import { Toast, ToastBody, ToastHeader, Button } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/ru.js'
import {
    fetchDialoguesFromDatabase,
    updateDialogueInDatabase,
    pushNewMessageInDatabase
} from '../../../actions'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import { calculateDate } from '../OperatorPage'
import OperatorAnswer from './OperatorAnswer'
import ShowBigPicture from './ShowBigPicture'
import './Dialogue.css'

function Dialogue({
    fetchDialoguesFromDatabase,
    dialogues,
    itemId,
    updateDialogueInDatabase,
    settingsUser,
    pushNewMessageInDatabase
}) {
    if (!dialogues) fetchDialoguesFromDatabase()

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

    function checkIsFirstMessage() {
        if (!allResultFilter || !settingsUser.automaticGreeting) return

        if (allResultFilter.some(elem => elem.isOperator)) return

        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: settingsUser.automaticGreeting,
                isOperator: true,
            },
        }
        pushNewMessageInDatabase(newMessage, itemId)
        fetchDialoguesFromDatabase()
    }

    if (dialogues) {
        filterData()
        checkIsFirstMessage()
    }

    setInterval(() => {
        fetchDialoguesFromDatabase()
    }, 30000)

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
                                <ShowBigPicture srcImg={res[0]} style={{ name: "containerDialogue__containerMessages_image" }} />
                                <div>{endStr}</div>
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
                                        updateDialogueInDatabase(
                                            { isSave: false },
                                            itemId
                                        )
                                        fetchDialoguesFromDatabase()
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
                                        updateDialogueInDatabase(
                                            { isSave: true },
                                            itemId
                                        )
                                        fetchDialoguesFromDatabase()
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
                        <OperatorAnswer itemId={itemId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ dialogues, settingsUser }) => ({ dialogues, settingsUser })

const mapDispatchToProps = {
    fetchDialoguesFromDatabase,
    updateDialogueInDatabase,
    pushNewMessageInDatabase
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue)
