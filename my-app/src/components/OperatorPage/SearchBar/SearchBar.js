import React from 'react'
import './SearchBar.css'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import {
    fetch_Dialogues_From_Database,
    Set_Value_Search,
    Update_Dialogue_In_Database,
} from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { useHistory } from 'react-router-dom'

function SearchBar({
    fetch_Dialogues_From_Database,
    dialogues,
    valueSearch,
    Set_Value_Search,
    status,
    isSave,
    Update_Dialogue_In_Database,
    user,
}) {
    let resultSearch = []

    function searchStart(e) {
        fetch_Dialogues_From_Database()
        resultSearch = []
        Set_Value_Search(e.target.value.toLowerCase())
    }

    function search() {
        for (let objDialogue in dialogues) {
            let contentDialogue = dialogues[objDialogue]
            let nameClient = contentDialogue.client.toLowerCase()
            let timeMessage = contentDialogue.messages
            if (isSave) {
                if (
                    contentDialogue.isSave &&
                    contentDialogue.operatorUID === user.uid
                ) {
                    if (nameClient.includes(valueSearch)) {
                        let objResult = {
                            idDialog: objDialogue,
                            client: contentDialogue.client,
                            topic: contentDialogue.topic,
                            subtopic: contentDialogue.subtopic,
                            content: null,
                        }
                        resultSearch.push(objResult)
                    }
                    for (let elemMessage in timeMessage) {
                        let message = timeMessage[elemMessage]
                        if (message.content) {
                            let content = message.content.toLowerCase()
                            if (content.includes(valueSearch)) {
                                let objResult = {
                                    idDialogue: objDialogue,
                                    client: contentDialogue.client,
                                    topic: contentDialogue.topic,
                                    subtopic: contentDialogue.subtopic,
                                    content: message.content,
                                }
                                resultSearch.push(objResult)
                            }
                        }
                    }
                }
            } else {
                if (contentDialogue.status === status) {
                    if (nameClient.includes(valueSearch)) {
                        let objResult = {
                            idDialogue: objDialogue,
                            client: contentDialogue.client,
                            topic: contentDialogue.topic,
                            subtopic: contentDialogue.subtopic,
                            content: null,
                        }
                        resultSearch.push(objResult)
                    }
                    for (let elemMessage in timeMessage) {
                        let message = timeMessage[elemMessage]
                        if (message.content) {
                            let content = message.content.toLowerCase()
                            if (content.includes(valueSearch)) {
                                let objResult = {
                                    idDialogue: objDialogue,
                                    client: contentDialogue.client,
                                    topic: contentDialogue.topic,
                                    subtopic: contentDialogue.subtopic,
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

    if (dialogues && valueSearch) {
        search()
    }

    const ViewResultSearch = ({ arrResult }) => {
        const history = useHistory()
        return arrResult.map((elem) => {
            return (
                <ListGroupItem
                    key={elem.idDialogue}
                    className="resultSearch__item"
                    onClick={() => {
                        Set_Value_Search(null)
                        history.push(
                            `/OperatorPage/Dialogue/${elem.idDialogue}`
                        )
                        if (status === 'active') {
                            Update_Dialogue_In_Database(
                                {
                                    status: 'inWork',
                                    operatorUID: user.uid,
                                },
                                elem.idDialogue
                            )
                        }
                    }}
                >
                    <div className="resultSearch__dialogue">
                        <p className="resultSearch__dialogue_nameClient">
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
        dialogues && valueSearch && resultSearch.length === 0 ? (
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
                    className="containerSearch__search"
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

const mapStateToProps = ({ dialogues, valueSearch, user }) => {
    return {
        dialogues,
        valueSearch,
        user,
    }
}

const mapDispatchToProps = {
    fetch_Dialogues_From_Database,
    Set_Value_Search,
    Update_Dialogue_In_Database,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
