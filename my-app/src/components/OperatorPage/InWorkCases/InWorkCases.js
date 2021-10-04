import React from 'react'
import '../OperatorPage.css'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import {
    change_Value_Active_Cases,
    fetch_Data_From_Database,
} from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../Spinner/Spinner'
import { useHistory } from 'react-router-dom'
import { createDisplayedFilterResults } from '../OperatorPage'

function InWorkCases({
    fetch_Data_From_Database,
    dataFromDatabase,
    change_Value_Active_Cases,
    valueActiveCases,
    user,
}) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }

    let timerId = setInterval(() => {
        fetch_Data_From_Database()
    }, 60000)

    let allResultFilter = []

    let displayedFilterResults = []

    let hasMoreActiveCases = true

    function filterData() {
        for (let idDialogue in dataFromDatabase) {
            let objDialogues = dataFromDatabase[idDialogue]
            for (let elem in objDialogues) {
                let contentDialogue = objDialogues[elem]
                let messages = contentDialogue.messages
                if (
                    contentDialogue.status === 'inWork' &&
                    user.uid === contentDialogue.operatorUID
                ) {
                    let objResult = {
                        idDialogue: elem,
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
    }

    if (dataFromDatabase) {
        filterData()
        createDisplayedFilterResults(
            allResultFilter,
            displayedFilterResults,
            valueActiveCases
        )
    }

    function loadFunc() {
        setTimeout(() => {
            change_Value_Active_Cases()
        }, 1500)
    }

    if (displayedFilterResults.length === allResultFilter.length) {
        hasMoreActiveCases = false
    }

    const ViewResult = ({ arrResult }) => {
        const history = useHistory()
        return arrResult.map((elem) => {
            let timestamp = moment(parseInt(elem.time, 10)).fromNow()
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
                                    clearInterval(timerId)
                                    history.push(
                                        `/OperatorPage/Dialogue/${elem.idDialogue}`
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
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body">
                    <SearchBar status={'inWork'} />
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

const mapStateToProps = ({ dataFromDatabase, valueActiveCases, user }) => {
    return {
        dataFromDatabase,
        valueActiveCases,
        user,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    change_Value_Active_Cases,
}

export default connect(mapStateToProps, mapDispatchToProps)(InWorkCases)
