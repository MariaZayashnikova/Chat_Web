import React from 'react'
import '../OperatorPage.css'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'
import { fetch_Data_From_Database } from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ActiveCases.css'
import moment from 'moment'
import 'moment/locale/ru.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../Spinner/Spinner'
import { Redirect } from 'react-router-dom'

function ActiveCases({ fetch_Data_From_Database, dataFromDatabase, user }) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }
    let resultFilter = []
    let numberElem = 5
    function filterData(number) {
        for (let idDialog in dataFromDatabase) {
            let objDialogs = dataFromDatabase[idDialog]
            let i = 0
            for (let elem in objDialogs) {
                let contentDialog = objDialogs[elem]
                let status = contentDialog.status
                let timeMessage = contentDialog.messages
                for (let elemMessage in timeMessage) {
                    let message = timeMessage[elemMessage]
                    if (status === 'active') {
                        i++
                        let objResult = {
                            idDialog: elem,
                            client: contentDialog.client,
                            topic: contentDialog.topic,
                            subtopic: contentDialog.subtopic,
                            content: message.content,
                            time: elemMessage,
                        }
                        if (i > number) {
                            return
                        } else {
                            resultFilter.push(objResult)
                        }
                    }
                }
            }
        }
    }
    if (dataFromDatabase) {
        filterData(numberElem)
    }
    function loadFunc(number) {
        filterData(number)
        console.log(number)
    }

    if (!user) {
        ;<Redirect to="/" />
    }

    /*    let result =
        resultFilter.length > 0 ? <ViewResult arrResult={resultFilter} /> : null*/
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    <SearchBar />
                    <div className="queue">Клиентов в очереди:</div>
                    <ListGroup className="listQueue">
                        <InfiniteScroll
                            dataLength={resultFilter.length}
                            pageStart={0}
                            next={() => loadFunc(numberElem + 5)}
                            hasMore={true}
                            loader={<Spinner />}
                            children={resultFilter}
                        >
                            {resultFilter.map((elem) => {
                                let timestamp = moment(
                                    parseInt(elem.time, 10)
                                ).fromNow() /*.format(
            'DD MMMM YYYY, HH:mm'
        )*/
                                return (
                                    <ListGroupItem key={elem.idDialog}>
                                        <div className="infoDialog">
                                            <div className="infoDialog-user">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'user-tie']}
                                                    size="3x"
                                                    color="darkblue"
                                                    className="customIcon"
                                                />
                                                <p>{elem.client}</p>
                                            </div>
                                            <div className="infoDialog-topic">
                                                <div>
                                                    <p className="titleTopic">
                                                        Тема:
                                                    </p>{' '}
                                                    {elem.topic}
                                                </div>
                                                <div>
                                                    <p className="titleTopic">
                                                        Подтема:
                                                    </p>{' '}
                                                    {elem.subtopic}
                                                </div>
                                            </div>
                                            <div className="contentMessage">
                                                {elem.content}
                                            </div>
                                            <div className="infoDialog-time_button">
                                                <div className="infoDialog-time">
                                                    <div>{timestamp}</div>
                                                </div>
                                                <Button
                                                    outline
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Войти в диалог
                                                </Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                )
                            })}
                        </InfiniteScroll>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

/*const ViewResult = ({ arrResult }) => {
    return arrResult.map((elem) => {
        let timestamp = moment(parseInt(elem.time, 10)).fromNow() /!*.format(
            'DD MMMM YYYY, HH:mm'
        )*!/

        return (
            <ListGroupItem key={elem.idDialog}>
                <div className="infoDialog">
                    <div className="infoDialog-user">
                        <FontAwesomeIcon
                            icon={['fas', 'user-tie']}
                            size="3x"
                            color="darkblue"
                            className="customIcon"
                        />
                        <p>{elem.client}</p>
                    </div>
                    <div className="infoDialog-topic">
                        <div>
                            <p className="titleTopic">Тема:</p> {elem.topic}
                        </div>
                        <div>
                            <p className="titleTopic">Подтема:</p>{' '}
                            {elem.subtopic}
                        </div>
                    </div>
                    <div className="contentMessage">{elem.content}</div>
                    <div className="infoDialog-time_button">
                        <div className="infoDialog-time">
                            <div>{timestamp}</div>
                        </div>
                        <Button outline color="primary" size="sm">
                            Войти в диалог
                        </Button>
                    </div>
                </div>
            </ListGroupItem>
        )
    })
}*/

const mapStateToProps = ({ dataFromDatabase, user }) => {
    return {
        dataFromDatabase,
        user,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCases)
