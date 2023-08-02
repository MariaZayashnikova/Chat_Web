import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { changeValueActiveCases } from '../../../../actions'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../../Spinner/Spinner'
import { calculateDate, createDisplayedChats } from '../../../../utils'
import '../Operator-page.css'

function InWorkCases({ chats, changeValueActiveCases, valueActiveCases, user }) {
    let allResultFilter = []

    let displayedFilterResults = []

    let hasMoreActiveCases = true

    function filterData() {
        for (let objDialogue in chats) {
            let contentDialogue = chats[objDialogue]
            let messages = contentDialogue.messages
            if (
                contentDialogue.status === 'inWork' &&
                user.uid === contentDialogue.operatorUID
            ) {
                let objResult = {
                    idDialogue: objDialogue,
                    client: contentDialogue.client,
                    topic: contentDialogue.topic,
                    subtopic: contentDialogue.subtopic,
                    content: Object.values(messages).pop().content,
                    time: Object.keys(messages).pop(),
                }
                allResultFilter.push(objResult)
            }
        }
    }

    if (chats) {
        filterData()
        createDisplayedChats(
            allResultFilter,
            displayedFilterResults,
            valueActiveCases
        )
    }

    function loadFunc() {
        setTimeout(() => {
            changeValueActiveCases()
        }, 1500)
    }

    if (displayedFilterResults.length === allResultFilter.length) hasMoreActiveCases = false

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
                        <div className="chat-elem__message">{elem.content}</div>
                        <div className="chat-elem__actions">
                            <div className="chat-elem__actions_time">
                                {timestamp}
                            </div>
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
                        </div>
                    </div>
                </ListGroupItem>
            )
        })
    }

    let result =
        displayedFilterResults.length > 0 ? (
            <ViewResult arrResult={displayedFilterResults} />
        ) : null

    return (
        <>
            <SearchBar status={'inWork'} />
            <div className="queue">
                <ListGroup
                    id="scrollableDiv"
                    className="queue__list"
                >
                    <InfiniteScroll
                        dataLength={displayedFilterResults.length}
                        pageStart={0}
                        next={loadFunc}
                        hasMore={hasMoreActiveCases}
                        loader={<Spinner />}
                        children={displayedFilterResults}
                        scrollableTarget="scrollableDiv"
                    >
                        {result}
                    </InfiniteScroll>
                </ListGroup>
            </div>
        </>
    )
}

const mapStateToProps = ({ chats, valueActiveCases, user }) => {
    return {
        chats,
        valueActiveCases,
        user,
    }
}

const mapDispatchToProps = {
    changeValueActiveCases
}

export default connect(mapStateToProps, mapDispatchToProps)(InWorkCases)
