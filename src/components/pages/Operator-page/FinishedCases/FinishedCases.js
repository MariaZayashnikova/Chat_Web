import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { changeValueActiveCases, updateChatsInDB } from '../../../../actions'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../../Spinner/Spinner'
import { calculateDate, createDisplayedFilterResults } from '../../../../utils'
import './FinishedCases.css'
import '../Operator-page.css'

function FinishedCases({ chats, changeValueActiveCases, valueActiveCases, updateChatsInDB }) {

    let allResultFilter = []

    let hasMoreActiveCases = true

    let displayedFilterResults = []

    let isSavedCase = false

    function filterData() {
        for (let objDialogue in chats) {
            let contentDialogue = chats[objDialogue]
            let messages = contentDialogue.messages
            if (contentDialogue.status === 'finished') {
                if (contentDialogue.isSave) {
                    isSavedCase = contentDialogue.isSave
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
                allResultFilter.push(objResult)
            }
        }
    }

    if (chats) {
        filterData()
        createDisplayedFilterResults(
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
            let CalcStars = () => {
                let arr = []
                for (let i = 0; i < elem.grade; i++) {
                    arr.push(
                        <FontAwesomeIcon
                            icon={['fas', 'star']}
                            key={i}
                            color="yellow"
                        />
                    )
                }
                return arr
            }
            return (
                <ListGroupItem key={elem.idDialogue}>
                    <div className="dialogue">
                        <div className="dialogue__user">
                            <FontAwesomeIcon
                                icon={['fas', 'user-tie']}
                                size="3x"
                                color="darkblue"
                            />
                            <p>{elem.client}</p>
                        </div>
                        <div className="dialogue__topic">
                            <div>
                                <p className="dialogue__topic_title">Тема:</p>
                                {elem.topic}
                            </div>
                            <div>
                                <p className="dialogue__topic_title">
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
                                    <CalcStars />
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
                                {isSavedCase ? (
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

    let result =
        displayedFilterResults.length > 0 ? (
            <ViewResult arrResult={displayedFilterResults} />
        ) : null

    return (
        <>
            <SearchBar status={'finished'} />
            <ToastContainer />
            <div className="queue">
                <ListGroup
                    id="scrollableDiv"
                    className="containerQueue"
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

const mapStateToProps = ({ chats, valueActiveCases }) => ({ chats, valueActiveCases })

const mapDispatchToProps = {
    changeValueActiveCases,
    updateChatsInDB,
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedCases)
