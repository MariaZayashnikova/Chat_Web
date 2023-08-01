import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'
import { Toast, ToastBody, ToastHeader, Button } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/ru.js'
import { updateDialogueInDatabase, pushNewMessageInDatabase } from '../../../../actions'
import { calculateDate } from '../../../../utils'
import OperatorAnswer from './OperatorAnswer'
import PicturePreview from '../../../Picture-preview/Picture-preview'
import './Dialogue.css'

function Dialogue({ dialogues, updateDialogueInDatabase, settingsUser, pushNewMessageInDatabase }) {

    let messageArray = [],
        clientName,
        isSavedCase = false,
        dialogueResultObj = {}

    let { itemId } = useParams()

    function filterData() {
        for (let dialogueObj in dialogues) {
            if (dialogueObj !== itemId) continue

            let dialogue = dialogues[dialogueObj]
            clientName = dialogue.client

            if (dialogue.status) {
                dialogueResultObj.completionTime = dialogue.completionTime
                dialogueResultObj.grade = dialogue.grade
            }

            if (dialogue.isSave) {
                isSavedCase = dialogue.isSave
            }

            let messages = dialogue.messages

            for (let messageTime in messages) {
                let contentMessage = messages[messageTime]
                let obj = {
                    time: parseInt(messageTime, 10),
                    content: contentMessage.content,
                    isOperator: contentMessage.isOperator,
                }
                messageArray.push(obj)
            }

            break;
        }
    }

    function checkIsFirstMessage() {
        if (!messageArray || !settingsUser.automaticGreeting) return

        if (messageArray.some(elem => elem.isOperator)) return

        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: settingsUser.automaticGreeting,
                isOperator: true,
            },
        }
        pushNewMessageInDatabase(newMessage, itemId)
    }

    if (dialogues) {
        filterData()
        checkIsFirstMessage()
    }

    function analyzeContent(str) {
        let options = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
            res,
            index,
            startSrt,
            endStr

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

    const CalcStars = () => {
        let arr = []
        for (let i = 0; i < dialogueResultObj.grade; i++) {
            arr.push(<FontAwesomeIcon icon={['fas', 'star']} key={i} color="yellow" size="3x" />)
        }
        return arr
    }

    const ViewDialogueResult = () => {
        return (
            <div className="Dialogue__result">
                <div className="stars">
                    <CalcStars />
                </div>
                <p>
                    Диалог завершился &nbsp;
                    {moment(dialogueResultObj.completionTime).fromNow()}
                </p>
            </div>
        )
    }

    const ViewMessages = ({ messageArray }) => {
        messageArray.reverse()
        return messageArray.map((elem) => {
            let timestamp = calculateDate(elem.time)
            let { res, startSrt, endStr } = analyzeContent(elem.content)
            return (
                <Toast
                    className={elem.isOperator ? 'operator-message' : 'client-message'}
                    key={elem.time}
                >
                    <ToastHeader className="info-message">
                        {elem.isOperator ? 'Вы:' : 'Клиент:'}
                        <div className="time-message">{timestamp}</div>
                    </ToastHeader>
                    <ToastBody>
                        {res ? (
                            <>
                                <div>{startSrt}</div>
                                <PicturePreview srcImg={res[0]} style={{ name: "image-message" }} />
                                <div>{endStr}</div>
                            </>
                        ) : elem.content
                        }
                    </ToastBody>
                </Toast>
            )
        })
    }

    const dialogueResult = dialogueResultObj.completionTime ? <ViewDialogueResult /> : null

    const messages = messageArray.length > 0 ? <ViewMessages messageArray={messageArray} /> : null

    return (
        <>
            <ToastContainer />
            <div className="Dialogue">
                <div className="Dialogue__client">
                    {clientName}
                    {isSavedCase ? (
                        <Button
                            type="button"
                            outline
                            color="danger"
                            size="sm"
                            onClick={() => {
                                updateDialogueInDatabase({ isSave: false }, itemId)
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
                                updateDialogueInDatabase({ isSave: true }, itemId)
                            }}
                        >
                            Сохранить диалог
                        </Button>
                    )}
                </div>
                <div className="Dialogue__messages">
                    <div className="messages">
                        {messages}
                    </div>
                </div>
                {dialogueResult}
                <OperatorAnswer itemId={itemId} />
            </div>
        </>
    )
}

const mapStateToProps = ({ dialogues, settingsUser }) => ({ dialogues, settingsUser })

const mapDispatchToProps = {
    updateDialogueInDatabase,
    pushNewMessageInDatabase
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue)
