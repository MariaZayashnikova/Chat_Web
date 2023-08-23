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
import { calculateDate, createDisplayedChats } from '../../../../utils'
import './Saved-chats.css'
import '../Operator-page.css'

function SavedChats({ chats, updateChatsInDB, user, loading }) {
    let result = [],
        displayedChats = [],
        hasMoreSavedChats = true

    const [valueSavedChat, setValueSavedChat] = useState(5)

    const changeValueSavedChat = () => setValueSavedChat(valueSavedChat + 5)

    function filterData() {
        for (let chatId in chats) {
            let chat = chats[chatId]
            let messages = chat.messages
            if (chat.isSave === true && user.uid === chat.operatorUID) {
                let objResult = {
                    chatId: chatId,
                    client: chat.client,
                    topic: chat.topic,
                    subtopic: chat.subtopic,
                    content: Object.values(messages).pop().content,
                    time: Object.keys(messages).pop(),
                }
                result.push(objResult)
            }
        }
    }

    if (chats) {
        filterData()
        createDisplayedChats(result, displayedChats, valueSavedChat)
    }

    function loadFunc() {
        setTimeout(() => {
            changeValueSavedChat()
        }, 1500)
    }

    if (displayedChats.length === result.length) hasMoreSavedChats = false

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
                        <div className="chat-elem__message">{elem.content}</div>
                        <div className="chat-elem__actions">
                            <div className="chat-elem__actions_time">
                                {timestamp}
                            </div>
                            <Link to={`/OperatorPage/Chat/${elem.chatId}`}>
                                <Button type="button" outline color="primary" size="sm"  >
                                    Войти в диалог
                                </Button>
                            </Link>
                            <Button
                                type="button"
                                outline
                                color="danger"
                                size="sm"
                                className="chat-elem__actions_btn-delete"
                                onClick={() => updateChatsInDB({ isSave: false }, elem.chatId)}
                            >
                                Удалить из сохранённых
                            </Button>
                        </div>
                    </div>
                </ListGroupItem>
            )
        })
    }

    return (
        <>
            <SearchBar status='saved' />
            <ToastContainer />
            <div className="queue">
                {loading ? <Spinner /> : null}
                <ListGroup id="scrollableDiv" className="queue__list" >
                    <InfiniteScroll
                        dataLength={displayedChats.length}
                        pageStart={0}
                        next={loadFunc}
                        hasMore={hasMoreSavedChats}
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

const mapStateToProps = ({ chats, user, loading }) => ({ chats, user, loading })

const mapDispatchToProps = { updateChatsInDB }

export default connect(mapStateToProps, mapDispatchToProps)(SavedChats)
