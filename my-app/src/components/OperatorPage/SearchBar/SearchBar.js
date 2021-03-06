import React from 'react'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import {
    fetchDialoguesFromDatabase,
    setValueSearch,
    updateDialogueInDatabase,
} from '../../../actions'
import './SearchBar.css'

function SearchBar({
    fetchDialoguesFromDatabase,
    dialogues,
    valueSearch,
    setValueSearch,
    status,
    isSave,
    updateDialogueInDatabase,
    user,
}) {
    let resultSearch = []

    function searchStart(e) {
        fetchDialoguesFromDatabase()
        resultSearch = []
        setValueSearch(e.target.value.toLowerCase())
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

    if (dialogues && valueSearch) search()

    const ViewResultSearch = ({ arrResult }) => {
        const history = useHistory()
        return arrResult.map((elem) => {
            return (
                <ListGroupItem
                    key={elem.idDialogue}
                    className="resultSearch__item"
                    onClick={() => {
                        setValueSearch(null)
                        history.push(
                            `/OperatorPage/Dialogue/${elem.idDialogue}`
                        )
                        if (status === 'active') {
                            updateDialogueInDatabase(
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
            <ListGroupItem>???????????? ???? ??????????????</ListGroupItem>
        ) : null

    return (
        <div className="searchBar">
            <div className="containerSearch">
                <Label for="search" className="labelSearch">
                    ??????????:
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
    fetchDialoguesFromDatabase,
    setValueSearch,
    updateDialogueInDatabase,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
