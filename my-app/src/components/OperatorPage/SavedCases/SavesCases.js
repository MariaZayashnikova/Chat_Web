import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {
    fetchDialoguesFromDatabase,
    updateDialogueInDatabase,
    changeValueActiveCases,
} from '../../../actions'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../Spinner/Spinner'
import { calculateDate, createDisplayedFilterResults } from '../OperatorPage'
import './SavedCases.css'
import '../OperatorPage.css'

function SavedCases({
    fetchDialoguesFromDatabase,
    dialogues,
    updateDialogueInDatabase,
    user,
    valueActiveCases,
    changeValueActiveCases,
}) {
    if (!dialogues) fetchDialoguesFromDatabase()

    let allResultFilter = []

    let displayedFilterResults = []

    let hasMoreActiveCases = true

    function filterData() {
        for (let objDialogue in dialogues) {
            let contentDialogue = dialogues[objDialogue]
            let messages = contentDialogue.messages
            if (
                contentDialogue.isSave === true &&
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

    if (dialogues) {
        filterData()
        createDisplayedFilterResults(
            allResultFilter,
            displayedFilterResults,
            valueActiveCases
        )
    }

    let timerId = setInterval(() => {
        fetchDialoguesFromDatabase()
    }, 60000)

    function loadFunc() {
        setTimeout(() => {
            changeValueActiveCases()
        }, 1500)
    }

    if (displayedFilterResults.length === allResultFilter.length) hasMoreActiveCases = false

    const ViewResult = ({ arrResult }) => {
        const history = useHistory()
        return arrResult.map((elem) => {
            let timestamp = calculateDate(parseInt(elem.time, 10))
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
                                <p className="dialogue__topic_title">????????:</p>
                                {elem.topic}
                            </div>
                            <div>
                                <p className="dialogue__topic_title">
                                    ??????????????:
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
                                className="dialogue__actions_button"
                                onClick={() => {
                                    clearInterval(timerId)
                                    history.push(
                                        `/OperatorPage/Dialogue/${elem.idDialogue}`
                                    )
                                }}
                            >
                                ?????????? ?? ????????????
                            </Button>
                            <Button
                                type="button"
                                outline
                                color="danger"
                                size="sm"
                                className="dialogue__actions_button dialogue__actions_buttonDelete"
                                onClick={() => {
                                    updateDialogueInDatabase(
                                        { isSave: false },
                                        elem.idDialogue
                                    )
                                }}
                            >
                                ?????????????? ???? ??????????????????????
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
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body">
                    <SearchBar isSave={true} />
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
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ dialogues, user, valueActiveCases }) => {
    return {
        dialogues,
        user,
        valueActiveCases,
    }
}

const mapDispatchToProps = {
    fetchDialoguesFromDatabase,
    updateDialogueInDatabase,
    changeValueActiveCases,
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedCases)
