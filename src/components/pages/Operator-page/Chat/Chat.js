import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Toast, ToastBody, ToastHeader, Button } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/ru.js'
import { updateChatsInDB, pushNewMessage } from '../../../../actions'
import { calculateDate, CalcStars } from '../../../../utils'
import OperatorAnswer from './OperatorAnswer'
import PicturePreview from '../../../Picture-preview/Picture-preview'
import Spinner from '../../../Spinner/Spinner'
import ErrorRoute from '../../../ErrorRoute/ErrorRoute'
import './Chat.css'

function Chat({ chats, updateChatsInDB, settingsUser, pushNewMessage, user, loading }) {
    let chatMessages = [],
        clientName,
        isSavedChat = false,
        chatResult = {}

    let { itemId } = useParams()

    function checkIsFirstMessage() {
        if (chatMessages.some(elem => elem.isOperator) || !settingsUser.automaticGreeting) return

        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: settingsUser.automaticGreeting,
                isOperator: true,
            },
        }
        pushNewMessage(newMessage, itemId)
    }

    function filterData() {
        for (let chatId in chats) {
            if (chatId !== itemId) continue

            const chat = chats[chatId]

            if (chat.status === 'active') {
                updateChatsInDB({ status: 'inWork', operatorUID: user.uid }, itemId)
                break
            }
            clientName = chat.client

            if (chat.status === 'finished') {
                chatResult.completionTime = chat.completionTime
                chatResult.grade = chat.grade
            }

            if (chat.isSave) isSavedChat = chat.isSave

            const messages = chat.messages

            for (let messageTime in messages) {
                let message = messages[messageTime]
                let obj = {
                    time: parseInt(messageTime, 10),
                    content: message.content,
                    isOperator: message.isOperator,
                }
                chatMessages.push(obj)
            }
            checkIsFirstMessage()
            break;
        }
    }

    if (chats) {
        filterData()
        if (chatMessages.length === 0) return < ErrorRoute />
    }

    function getImageConfig(str) {
        const options = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
        let image = false,
            index,
            messageStart,
            messageEnd

        options.forEach((elem) => {
            let reg = new RegExp(`(http|https)://.*.${elem}`, 'gi')
            if (reg.test(str)) {
                image = str.match(reg)
                index = str.indexOf(image[0])
                messageStart = str.slice(0, index)
                messageEnd = str.slice(image[0].length + index)
            }
        })

        return { image, messageStart, messageEnd }
    }

    const ViewChatResult = () => {
        return (
            <div className="Chat__result">
                <div className="stars">
                    <CalcStars element={chatResult} property='grade' iconSize='3' />
                </div>
                <p>
                    Диалог завершился &nbsp;
                    {moment(chatResult.completionTime).fromNow()}
                </p>
            </div>
        )
    }

    const ViewMessages = ({ chatMessages }) => {
        chatMessages.reverse()
        return chatMessages.map((elem) => {
            let timestamp = calculateDate(elem.time)
            let { image, messageStart, messageEnd } = getImageConfig(elem.content)
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
                        {image ? (
                            <>
                                <div>{messageStart}</div>
                                <PicturePreview srcImg={image[0]} style={{ name: "image-message" }} />
                                <div>{messageEnd}</div>
                            </>
                        ) : elem.content}
                    </ToastBody>
                </Toast>
            )
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="Chat">
                <div className="Chat__client">
                    {clientName}
                    {isSavedChat ? (
                        <Button
                            type="button"
                            outline
                            color="danger"
                            size="sm"
                            onClick={() => updateChatsInDB({ isSave: false }, itemId)}
                        >
                            Удалить из сохранённых
                        </Button>
                    ) : (
                        <Button
                            outline
                            color="primary"
                            size="sm"
                            onClick={() => updateChatsInDB({ isSave: true }, itemId)}
                        >
                            Сохранить диалог
                        </Button>
                    )}
                </div>
                <div className="Chat__messages">
                    {loading ? <Spinner /> : null}
                    <div className="messages">
                        {chatMessages.length > 0 ? <ViewMessages chatMessages={chatMessages} /> : null}
                    </div>
                </div>
                {chatResult.completionTime ? <ViewChatResult /> : null}
                <OperatorAnswer itemId={itemId} />
            </div>
        </>
    )
}

const mapStateToProps = ({ chats, settingsUser, user, loading }) => ({ chats, settingsUser, user, loading })

const mapDispatchToProps = { updateChatsInDB, pushNewMessage }

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
