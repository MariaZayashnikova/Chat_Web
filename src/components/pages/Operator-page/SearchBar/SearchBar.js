import React from 'react'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { setValueSearch, updateChatsInDB } from '../../../../actions'
import './SearchBar.css'

function SearchBar({ chats, valueSearch, setValueSearch, status, isSave, updateChatsInDB, user }) {
    let resultSearch = []

    function searchStart(e) {
        resultSearch = []
        setValueSearch(e.target.value.toLowerCase())
    }

    function search() {
        for (let objDialogue in chats) {
            let contentDialogue = chats[objDialogue]
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

    if (chats && valueSearch) search()

    const ViewResultSearch = ({ arrResult }) => {
        return arrResult.map((elem, i) => {
            return (
                <Link key={elem.idDialogue + i} to={`/OperatorPage/Dialogue/${elem.idDialogue}`}>
                    <ListGroupItem
                        className="resultSearch__item"
                        onClick={() => {
                            if (status === 'active') {
                                updateChatsInDB(
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
                </Link>
            )
        })
    }

    let result =
        resultSearch.length > 0 ? (
            <ViewResultSearch arrResult={resultSearch} />
        ) : null

    let noResult =
        chats && valueSearch && resultSearch.length === 0 ? (
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

const mapStateToProps = ({ chats, valueSearch, user }) => {
    return {
        chats,
        valueSearch,
        user,
    }
}

const mapDispatchToProps = {
    setValueSearch,
    updateChatsInDB,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
