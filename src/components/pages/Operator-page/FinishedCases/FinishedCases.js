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
import './FinishedCases.css'
import '../Operator-page.css'

function FinishedCases({ chats, updateChatsInDB, loading }) {
    let result = [],
        displayedChats = [],
        hasMoreFinishedChats = true,
        isSavedChat = false

    const [valueFinishedChats, setValueFinishedChats] = useState(5)

    const changeValueFinishedChats = () => setValueFinishedChats(valueFinishedChats + 5)

    function filterData() {
        for (let objDialogue in chats) {
            let contentDialogue = chats[objDialogue]
            let messages = contentDialogue.messages
            if (contentDialogue.status === 'finished') {
                if (contentDialogue.isSave) {
                    isSavedChat = contentDialogue.isSave
                }
                let objResult = {
                    idDialogue: objDialogue,
                    client: contentDialogue.client,
                    topic: contentDialogue.topic,
                    subtopic: contentDialogue.subtopic,
                    content: Object.values(messages).pop().content,
                    time: contentDialogue.completionTime,
                    grade: contentDialogue.grade,
                }
                result.push(objResult)
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
                <ListGroupItem key={elem.idDialogue}>
                    <div className="chat-elem">
                        <div className="chat-elem__user">
                            <FontAwesomeIcon
                                icon={['fas', 'user-tie']}
                                size="3x"
                                color="darkblue"
                            />
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
                        <div className="dialogue__messageFinished">
                            {elem.content}
                        </div>
                        <div className="dialogueFinished__actions">
                            <div className="dialogueFinished__info">
                                <div>{timestamp}</div>
                                <div>
                                    <div>Оценка</div>
                                    <CalcStars element={elem} property='grade' iconSize='1' />
                                </div>
                            </div>
                            <div className="dialogueFinished__buttons">
                                <Link to={`/OperatorPage/Chat/${elem.idDialogue}`}>
                                    <Button
                                        type="button"
                                        outline
                                        color="primary"
                                        size="sm"
                                    >
                                        Войти в диалог
                                    </Button>
                                </Link>
                                {isSavedChat ? (
                                    <Button
                                        type="button"
                                        outline
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            updateChatsInDB({ isSave: false }, elem.idDialogue)
                                        }}
                                    >
                                        Удалить из сохранённых
                                    </Button>
                                ) : (
                                    <Button
                                        outline
                                        color="info"
                                        size="sm"
                                        onClick={() => {
                                            updateChatsInDB({ isSave: true }, elem.idDialogue)
                                        }}
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
            <SearchBar status={'finished'} />
            <ToastContainer />
            <div className="queue">
                <ListGroup
                    id="scrollableDiv"
                    className="queue__list"
                >
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

const mapStateToProps = ({ chats, loading }) => ({ chats, loading })

const mapDispatchToProps = { updateChatsInDB }

export default connect(mapStateToProps, mapDispatchToProps)(FinishedCases)
