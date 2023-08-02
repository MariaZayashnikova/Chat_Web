import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../../Spinner/Spinner'
import { calculateDate, createDisplayedChats } from '../../../../utils'
import './Active-chats.css'
import '../Operator-page.css'

function ActiveChats({ chats, error, loading }) {
    let result = [],
        displayedChats = [],
        hasMoreActiveChats = true

    const [valueActiveChat, setValueActiveChat] = useState(5)

    const changeValueActiveChat = () => setValueActiveChat(valueActiveChat + 5)

    function filterData() {
        for (let chatId in chats) {
            let chat = chats[chatId]
            let messages = chat.messages
            for (let timeMessage in messages) {
                let message = messages[timeMessage]
                if (chat.status === 'active') {
                    let objResult = {
                        chatId: chatId,
                        client: chat.client,
                        topic: chat.topic,
                        subtopic: chat.subtopic,
                        content: message.content,
                        time: parseInt(timeMessage, 10),
                    }
                    result.push(objResult)
                }
            }
        }
    }

    if (chats) {
        filterData()
        createDisplayedChats(result, displayedChats, valueActiveChat)
    }

    function loadFunc() {
        setTimeout(() => {
            changeValueActiveChat()
        }, 1500)
    }

    if (displayedChats.length === result.length) hasMoreActiveChats = false

    const ViewResult = ({ arrResult }) => {
        return arrResult.map((elem) => {
            let timestamp = calculateDate(elem.time)

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
                                <Button type="button" outline color="primary" size="sm" >
                                    Войти в диалог
                                </Button>
                            </Link>
                        </div>
                    </div>
                </ListGroupItem>
            )
        })
    }

    return (
        <>
            <SearchBar status={'active'} />
            <div className="queue">
                <div className="queue__quantity">
                    Клиентов в очереди: {result.length}
                </div>
                {error ? <div className="error">{error}</div> : null}
                {loading ? <Spinner /> : null}
                <ListGroup id="scrollableDiv" className="queue__list" >
                    <InfiniteScroll
                        dataLength={displayedChats.length}
                        pageStart={0}
                        next={loadFunc}
                        hasMore={hasMoreActiveChats}
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

const mapStateToProps = ({ chats, error, loading }) => ({ chats, error, loading })

export default connect(mapStateToProps)(ActiveChats)
