import React from 'react'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import {
    fetch_Data_From_Database,
    Update_Data_In_Database,
    change_Value_Active_Cases,
} from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../Spinner/Spinner'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './SavedCases.css'
import '../OperatorPage.css'
import { createDisplayedFilterResults } from '../OperatorPage'

function SavedCases({
    fetch_Data_From_Database,
    dataFromDatabase,
    Update_Data_In_Database,
    user,
    valueActiveCases,
    change_Value_Active_Cases,
}) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }

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
                    contentDialogue.isSave === true &&
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

    let timerId = setInterval(() => {
        fetch_Data_From_Database()
    }, 60000)

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
                                className="dialogue__actions_button"
                                onClick={() => {
                                    clearInterval(timerId)
                                    history.push(
                                        `/OperatorPage/Dialogue/${elem.idDialogue}`
                                    )
                                }}
                            >
                                Войти в диалог
                            </Button>
                            <Button
                                type="button"
                                outline
                                color="danger"
                                size="sm"
                                className="dialogue__actions_button dialogue__actions_buttonDelete"
                                onClick={() => {
                                    Update_Data_In_Database(
                                        { isSave: false },
                                        elem.idDialogue
                                    )
                                }}
                            >
                                Удалить из сохранённых
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

const mapStateToProps = ({ dataFromDatabase, user, valueActiveCases }) => {
    return {
        dataFromDatabase,
        user,
        valueActiveCases,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    Update_Data_In_Database,
    change_Value_Active_Cases,
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedCases)
