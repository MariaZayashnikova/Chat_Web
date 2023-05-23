import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
    changeValueActiveCases,
    fetchDialoguesFromDatabase,
    updateDialogueInDatabase,
} from '../../../../actions'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../../Spinner/Spinner'
import { calculateDate, createDisplayedFilterResults } from '../Operator-page'
import './ActiveCases.css'
import '../Operator-page.css'

function ActiveCases({
    fetchDialoguesFromDatabase,
    dialogues,
    changeValueActiveCases,
    valueActiveCases,
    errorFromState,
    updateDialogueInDatabase,
    user,
}) {
    if (!dialogues) fetchDialoguesFromDatabase()

    // let timerId = setInterval(() => {
    //     fetchDialoguesFromDatabase()
    // }, 30000)

    let allResultFilter = []

    let hasMoreActiveCases = true

    let displayedFilterResults = []

    function filterData() {
        for (let objDialogue in dialogues) {
            let contentDialogue = dialogues[objDialogue]
            let messages = contentDialogue.messages
            for (let timeMessage in messages) {
                let message = messages[timeMessage]
                if (contentDialogue.status === 'active') {
                    let objResult = {
                        idDialogue: objDialogue,
                        client: contentDialogue.client,
                        topic: contentDialogue.topic,
                        subtopic: contentDialogue.subtopic,
                        content: message.content,
                        time: parseInt(timeMessage, 10),
                    }
                    allResultFilter.push(objResult)
                }
            }
        }
    }

    if (dialogues) {
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
        const history = useHistory()
        return arrResult.map((elem) => {
            let timestamp = calculateDate(elem.time)

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
                                <p className="dialogue__topic_title">Тема:</p>{' '}
                                {elem.topic}
                            </div>
                            <div>
                                <p className="dialogue__topic_title">
                                    Подтема:
                                </p>
                                {elem.subtopic}
                            </div>
                        </div>
                        <div className="dialogue__message">{elem.content}</div>
                        <div className="dialogue__actions">
                            <div className="dialogue__actions_time">
                                <div>{timestamp}</div>
                            </div>
                            <Button
                                type="button"
                                outline
                                color="primary"
                                size="sm"
                                onClick={() => {
                                    // clearInterval(timerId)
                                    history.push(
                                        `/OperatorPage/Dialogue/${elem.idDialogue}`
                                    )
                                    updateDialogueInDatabase(
                                        {
                                            status: 'inWork',
                                            operatorUID: user.uid,
                                        },
                                        elem.idDialogue
                                    )
                                }}
                            >
                                Войти в диалог
                            </Button>
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
            <SearchBar status={'active'} />
            <div className="queue">
                <div className="queueQuantity">
                    Клиентов в очереди: {allResultFilter.length}
                </div>
                {errorFromState ? (
                    <div className="error">{errorFromState}</div>
                ) : null}
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

const mapStateToProps = ({
    dialogues,
    valueActiveCases,
    user,
    errorFromState,
}) => {
    return {
        dialogues,
        valueActiveCases,
        user,
        errorFromState,
    }
}

const mapDispatchToProps = {
    fetchDialoguesFromDatabase,
    changeValueActiveCases,
    updateDialogueInDatabase,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCases)
