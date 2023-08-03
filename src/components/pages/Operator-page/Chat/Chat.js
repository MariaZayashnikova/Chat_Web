import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'
import { Toast, ToastBody, ToastHeader, Button } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/ru.js'
import { updateChatsInDB, pushNewMessage } from '../../../../actions'
import { calculateDate, CalcStars } from '../../../../utils'
import OperatorAnswer from './OperatorAnswer'
import PicturePreview from '../../../Picture-preview/Picture-preview'
import './Chat.css'

function Chat({ chats, updateChatsInDB, settingsUser, pushNewMessage, user }) {

    let messageArray = [],
        clientName,
        isSavedCase = false,
        dialogueResultObj = {}

    let { itemId } = useParams()
    //сделать обработку несуществующего диалога через url
    function filterData() {
        for (let dialogueObj in chats) {
            if (dialogueObj !== itemId) continue

            let dialogue = chats[dialogueObj]

            if (dialogue.status === 'active') {
                updateChatsInDB({ status: 'inWork', operatorUID: user.uid }, itemId)
                break
            }
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
        pushNewMessage(newMessage, itemId)
    }

    if (chats) {
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

    const ViewDialogueResult = () => {
        return (
            <div className="Dialogue__result">
                <div className="stars">
                    <CalcStars element={dialogueResultObj} property='grade' iconSize='3' />
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
                                updateChatsInDB({ isSave: false }, itemId)
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
                                updateChatsInDB({ isSave: true }, itemId)
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

const mapStateToProps = ({ chats, settingsUser, user }) => ({ chats, settingsUser, user })

const mapDispatchToProps = {
    updateChatsInDB,
    pushNewMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
