import React from 'react'
import './SearchBar.css'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import {
    fetch_Data_From_Database,
    Set_Value_Search,
    Update_Data_In_Database,
} from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { useHistory } from 'react-router-dom'

function SearchBar({
    fetch_Data_From_Database,
    dataFromDatabase,
    valueSearch,
    Set_Value_Search,
    status,
    isSave,
    Update_Data_In_Database,
    user,
}) {
    let resultSearch = []
    function searchStart(e) {
        fetch_Data_From_Database()
        resultSearch = []
        Set_Value_Search(e.target.value.toLowerCase())
    }

    function search() {
        for (let idDialog in dataFromDatabase) {
            let objDialogs = dataFromDatabase[idDialog]
            for (let elem in objDialogs) {
                let contentDialog = objDialogs[elem]
                let statusDialogue = contentDialog.status
                let timeMessage = contentDialog.messages
                if (isSave) {
                    if (
                        contentDialog.isSave &&
                        contentDialog.operatorUID === user.uid
                    ) {
                        for (let elemMessage in timeMessage) {
                            let message = timeMessage[elemMessage]
                            if (message.content) {
                                let content = message.content.toLowerCase()
                                let res = content.includes(valueSearch)

                                if (res) {
                                    let objResult = {
                                        idDialog: elem,
                                        client: contentDialog.client,
                                        topic: contentDialog.topic,
                                        subtopic: contentDialog.subtopic,
                                        content: message.content,
                                    }
                                    resultSearch.push(objResult)
                                }
                            }
                        }
                    }
                } else {
                    if (statusDialogue === status) {
                        for (let elemMessage in timeMessage) {
                            let message = timeMessage[elemMessage]
                            if (message.content) {
                                let content = message.content.toLowerCase()
                                let res = content.includes(valueSearch)

                                if (res) {
                                    let objResult = {
                                        idDialog: elem,
                                        client: contentDialog.client,
                                        topic: contentDialog.topic,
                                        subtopic: contentDialog.subtopic,
                                        content: message.content,
                                    }
                                    resultSearch.push(objResult)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (dataFromDatabase && valueSearch) {
        search()
    }

    const ViewResultSearch = ({ arrResult }) => {
        const history = useHistory()
        return arrResult.map((elem) => {
            return (
                <ListGroupItem
                    key={elem.idDialog}
                    className="itemResult"
                    onClick={() => {
                        history.push(`/OperatorPage/Dialogue/${elem.idDialog}`)
                        if (status === 'active') {
                            Update_Data_In_Database(
                                {
                                    status: 'inWork',
                                    operatorUID: user.uid,
                                },
                                elem.idDialog
                            )
                        }
                    }}
                >
                    <div className="resultSearch-infoDialog">
                        <p className="resultSearch-infoDialog_nameClient">
                            {elem.client}
                        </p>
                        <p>{elem.topic}</p>
                        <p>{elem.subtopic}</p>
                    </div>
                    <p>{elem.content}</p>
                </ListGroupItem>
            )
        })
    }

    let result =
        resultSearch.length > 0 ? (
            <ViewResultSearch arrResult={resultSearch} />
        ) : null

    let noResult =
        dataFromDatabase && valueSearch && resultSearch.length === 0 ? (
            <ListGroupItem>Ничего не найдено</ListGroupItem>
        ) : null

    return (
        <div className="searchBar">
            <div className="containerSearch">
                <Label for="search" className="labelSearch">
                    Поиск:
                </Label>
                <Input
                    type="search"
                    id="search"
                    className="search"
                    onInput={debounce(searchStart, 1000)}
                />
            </div>
            {noResult}
            {result ? (
                <ListGroup className="resultSearch">{result}</ListGroup>
            ) : null}
        </div>
    )
}

const mapStateToProps = ({ dataFromDatabase, valueSearch, user }) => {
    return {
        dataFromDatabase,
        valueSearch,
        user,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    Set_Value_Search,
    Update_Data_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
