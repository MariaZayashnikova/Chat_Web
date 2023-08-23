import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { updateChatsInDB } from '../../../../actions'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../../Spinner/Spinner'
import { calculateDate, createDisplayedChats, CalcStars } from '../../../../utils'
import './Finished-chats.css'
import '../Operator-page.css'

function FinishedChats({ chats, updateChatsInDB, loading, user }) {
    let result = [],
        displayedChats = [],
        hasMoreFinishedChats = true,
        isSavedChat = false

    const [valueFinishedChats, setValueFinishedChats] = useState(5)

    const changeValueFinishedChats = () => setValueFinishedChats(valueFinishedChats + 5)

    function filterData() {
        for (let chatId in chats) {
            let chat = chats[chatId]
            let messages = chat.messages
            if (chat.status === 'finished' && user.uid === chat.operatorUID) {
                if (chat.isSave) isSavedChat = chat.isSave

                let res = {
                    chatId: chatId,
                    client: chat.client,
                    topic: chat.topic,
                    subtopic: chat.subtopic,
                    content: Object.values(messages).pop().content,
                    time: chat.completionTime,
                    grade: chat.grade,
                }
                result.push(res)
            }
        }
    }

    if (chats) {
        filterData()
        createDisplayedChats(result, displayedChats, valueFinishedChats)
    }

    function loadFunc() {
        setTimeout(() => {
            changeValueFinishedChats()
        }, 1500)
    }

    if (displayedChats.length === result.length) hasMoreFinishedChats = false

    const ViewResult = ({ arrResult }) => {
        return arrResult.map((elem) => {
            let timestamp = calculateDate(parseInt(elem.time, 10))
            return (
                <ListGroupItem key={elem.chatId}>
                    <div className="chat-elem">
                        <div className="chat-elem__user">
                            <FontAwesomeIcon icon={['fas', 'user-tie']} size="3x" color="darkblue" />
                            <p>{elem.client}</p>
                        </div>
                        <div className="chat-elem__topic">
                            <div>
                                <p className="chat-elem__topic_title">Тема:</p>
                                {elem.topic}
                            </div>
                            <div>
                                <p className="chat-elem__topic_title">
                                    Подтема:
                                </p>
                                {elem.subtopic}
                            </div>
                        </div>
                        <div className="chat-elem__message">
                            {elem.content}
                        </div>
                        <div className="chat-elem__finished-actions">
                            <div className="chat-elem__finished-actions_info">
                                <div>{timestamp}</div>
                                <div>
                                    <div>Оценка</div>
                                    <CalcStars element={elem} property='grade' iconSize='1' />
                                </div>
                            </div>
                            <div className="chat-elem__finished-actions_btns">
                                <Link to={`/OperatorPage/Chat/${elem.chatId}`}>
                                    <Button type="button" outline color="primary" size="sm" >
                                        Войти в диалог
                                    </Button>
                                </Link>
                                {isSavedChat ? (
                                    <Button
                                        type="button"
                                        outline
                                        color="danger"
                                        size="sm"
                                        onClick={() => updateChatsInDB({ isSave: false }, elem.chatId)}
                                    >
                                        Удалить из сохранённых
                                    </Button>
                                ) : (
                                    <Button
                                        outline
                                        color="info"
                                        size="sm"
                                        onClick={() => updateChatsInDB({ isSave: true }, elem.chatId)}
                                    >
                                        Сохранить диалог
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </ListGroupItem>
            )
        })
    }

    return (
        <>
            <SearchBar status='finished' />
            <ToastContainer />
            <div className="queue">
                {loading ? <Spinner /> : null}
                <ListGroup id="scrollableDiv" className="queue__list" >
                    <InfiniteScroll
                        dataLength={displayedChats.length}
                        pageStart={0}
                        next={loadFunc}
                        hasMore={hasMoreFinishedChats}
                        loader={<Spinner />}
                        children={displayedChats}
                        scrollableTarget="scrollableDiv"
                    >
                        {displayedChats.length > 0 ? (
                            <ViewResult arrResult={displayedChats} />
                        ) : null}
                    </InfiniteScroll>
                </ListGroup>
            </div>
        </>
    )
}

const mapStateToProps = ({ chats, loading, user }) => ({ chats, loading, user })

const mapDispatchToProps = { updateChatsInDB }

export default connect(mapStateToProps, mapDispatchToProps)(FinishedChats)
