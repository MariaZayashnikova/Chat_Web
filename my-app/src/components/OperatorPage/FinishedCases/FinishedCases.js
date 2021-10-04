import React from 'react'
import '../OperatorPage.css'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import {
    change_Value_Active_Cases,
    fetch_Data_From_Database,
    Update_Data_In_Database,
} from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../Spinner/Spinner'
import { useHistory } from 'react-router-dom'
import './FinishedCases.css'
import { ToastContainer } from 'react-toastify'

function FinishedCases({
    fetch_Data_From_Database,
    dataFromDatabase,
    change_Value_Active_Cases,
    valueActiveCases,
    loadingFromState,
    Update_Data_In_Database,
    user,
}) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }

    let allResultFilter = []

    let hasMoreActiveCases = true

    let isSavedCase = false

    function filterData() {
        for (let idDialog in dataFromDatabase) {
            let objDialogs = dataFromDatabase[idDialog]

            for (let elem in objDialogs) {
                let contentDialog = objDialogs[elem]
                let status = contentDialog.status

                let messages = contentDialog.messages
                if (status === 'finished') {
                    if (contentDialog.isSave) {
                        isSavedCase = contentDialog.isSave
                    }
                    let objResult = {
                        idDialog: elem,
                        client: contentDialog.client,
                        topic: contentDialog.topic,
                        subtopic: contentDialog.subtopic,
                        content: Object.values(messages).pop().content,
                        time: Object.keys(messages).pop(),
                    }
                    allResultFilter.push(objResult)
                }
            }
        }
    }

    let displayedFilterResults = []

    function createDisplayedFilterResults() {
        let i = 0
        allResultFilter.forEach((elem) => {
            i++
            if (i > valueActiveCases) {
                return
            } else {
                displayedFilterResults.push(elem)
            }
        })
    }

    if (dataFromDatabase) {
        filterData()
        createDisplayedFilterResults()
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
                <ListGroupItem key={elem.idDialog}>
                    <div className="infoDialogue">
                        <div className="infoDialogue-user">
                            <FontAwesomeIcon
                                icon={['fas', 'user-tie']}
                                size="3x"
                                color="darkblue"
                                className="customIcon"
                            />
                            <p>{elem.client}</p>
                        </div>
                        <div className="infoDialogue-topic">
                            <div>
                                <p className="titleTopic">Тема:</p> {elem.topic}
                            </div>
                            <div>
                                <p className="titleTopic">Подтема:</p>
                                {elem.subtopic}
                            </div>
                        </div>
                        <div className="pageFinished-contentMessage">
                            {elem.content}
                        </div>
                        <div className="containerInfo">
                            <div className="timeAndStar">
                                <div>{timestamp}</div>
                                <div>
                                    <div>Оценка</div>
                                    <FontAwesomeIcon
                                        icon={['fas', 'star']}
                                        color="yellow"
                                    />
                                    <FontAwesomeIcon
                                        icon={['fas', 'star']}
                                        color="yellow"
                                    />
                                    <FontAwesomeIcon
                                        icon={['fas', 'star']}
                                        color="yellow"
                                    />
                                    <FontAwesomeIcon
                                        icon={['fas', 'star']}
                                        color="yellow"
                                    />
                                    <FontAwesomeIcon
                                        icon={['fas', 'star']}
                                        color="yellow"
                                    />
                                </div>
                            </div>
                            <div className="buttons">
                                <Button
                                    type="button"
                                    outline
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                        history.push(
                                            `/OperatorPage/Dialogue/${elem.idDialog}`
                                        )
                                    }}
                                >
                                    Войти в диалог
                                </Button>
                                {isSavedCase ? (
                                    <Button
                                        type="button"
                                        outline
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            Update_Data_In_Database(
                                                { isSave: false },
                                                elem.idDialog
                                            )
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
                                            Update_Data_In_Database(
                                                { isSave: true },
                                                elem.idDialog
                                            )
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
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    <SearchBar status={'finished'} />
                    <ToastContainer />
                    <div className="containerQueue">
                        {loadingFromState ? <Spinner /> : null}
                        <ListGroup id="scrollableDiv" className="listQueue">
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

const mapStateToProps = ({
    dataFromDatabase,
    valueActiveCases,
    loadingFromState,
    user,
}) => {
    return {
        dataFromDatabase,
        valueActiveCases,
        loadingFromState,
        user,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    change_Value_Active_Cases,
    Update_Data_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishedCases)
