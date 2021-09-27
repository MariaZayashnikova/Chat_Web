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

function ActiveCases({ fetch_Data_From_Database, dataFromDatabase }) {
    if (!dataFromDatabase) {
        fetch_Data_From_Database()
    }
    let resultFilter = []
    function filterData() {
        for (let idDialog in dataFromDatabase) {
            let objDialogs = dataFromDatabase[idDialog]
            for (let elem in objDialogs) {
                let contentDialog = objDialogs[elem]
                let status = contentDialog.status
                let timeMessage = contentDialog.messages
                for (let elemMessage in timeMessage) {
                    let message = timeMessage[elemMessage]

                    if (status === 'active') {
                        let objResult = {
                            idDialog: elem,
                            client: contentDialog.client,
                            topic: contentDialog.topic,
                            subtopic: contentDialog.subtopic,
                            content: message.content,
                        }
                        resultFilter.push(objResult)
                    }
                }
            }
        }
    }
    if (dataFromDatabase) {
        filterData()
    }

    let result =
        resultFilter.length > 0 ? <ViewResult arrResult={resultFilter} /> : null
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    <SearchBar />
                    <div className="queue">Клиентов в очереди:</div>
                    <ListGroup>{result}</ListGroup>
                </div>
            </div>
        </div>
    )
}

const ViewResult = ({ arrResult }) => {
    return arrResult.map((elem) => {
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
                    <div>
                        <div>Время сообщения</div>
                        <Button outline color="primary" size="sm">
                            Войти в диалог
                        </Button>
                    </div>
                </div>
            </ListGroupItem>
        )
    })
}

const mapStateToProps = ({ dataFromDatabase }) => {
    return {
        dataFromDatabase,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCases)
