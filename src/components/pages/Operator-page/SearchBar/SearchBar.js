import React, { useState } from 'react'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import './SearchBar.css'

function SearchBar({ chats, status, isSave, user }) {
    let resultSearch = []

    const [value, setValue] = useState(null)

    function searchStart(e) {
        resultSearch = []
        setValue(e.target.value.toLowerCase())
    }

    function createResultObject(chatId, chat, content = null) {
        return {
            chatId: chatId,
            client: chat.client,
            topic: chat.topic,
            subtopic: chat.subtopic,
            content: content,
        }
    }

    function search() {
        for (let chatId in chats) {
            let chat = chats[chatId]
            let nameClient = chat.client.toLowerCase()
            let messages = chat.messages
            if (isSave) {
                if (chat.isSave && chat.operatorUID === user.uid) {
                    if (nameClient.includes(value)) {
                        let result = createResultObject(chatId, chat);
                        resultSearch.push(result)
                    }
                    for (let timeMessage in messages) {
                        let message = messages[timeMessage]
                        if (message.content) {
                            let content = message.content.toLowerCase()
                            if (content.includes(value)) {
                                let result = createResultObject(chatId, chat, message.content);
                                resultSearch.push(result)
                            }
                        }
                    }
                }
            } else {
                if (chat.status === status) {
                    if (nameClient.includes(value)) {
                        let result = createResultObject(chatId, chat);
                        resultSearch.push(result)
                    }
                    for (let timeMessage in messages) {
                        let message = messages[timeMessage]
                        if (message.content) {
                            let content = message.content.toLowerCase()
                            if (content.includes(value)) {
                                let result = createResultObject(chatId, chat, message.content);
                                resultSearch.push(result)
                            }
                        }
                    }
                }
            }
        }
    }

    // function mysearch() {
    //     for (let chatId in chats) {
    //         let chat = chats[chatId]
    //         let nameClient = chat.client.toLowerCase()
    //         let messages = chat.messages

    //         if (status === 'active') {

    //         } else {

    //         }

    //         if (chat.operatorUID !== user.uid) continue

    //         if (isSave) {
    //             if (chat.isSave && chat.operatorUID === user.uid) {
    //                 if (nameClient.includes(value)) {
    //                     let result = createResultObject(chatId, chat);
    //                     resultSearch.push(result)
    //                 }
    //                 for (let timeMessage in messages) {
    //                     let message = messages[timeMessage]
    //                     if (message.content) {
    //                         let content = message.content.toLowerCase()
    //                         if (content.includes(value)) {
    //                             let result = createResultObject(chatId, chat, message.content);
    //                             resultSearch.push(result)
    //                         }
    //                     }
    //                 }
    //             }
    //         } else {
    //             if (chat.status === status) {
    //                 if (nameClient.includes(value)) {
    //                     let result = createResultObject(chatId, chat);
    //                     resultSearch.push(result)
    //                 }
    //                 for (let timeMessage in messages) {
    //                     let message = messages[timeMessage]
    //                     if (message.content) {
    //                         let content = message.content.toLowerCase()
    //                         if (content.includes(value)) {
    //                             let result = createResultObject(chatId, chat, message.content);
    //                             resultSearch.push(result)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    if (chats && value) search()

    const ViewResultSearch = ({ arrResult }) => {
        return arrResult.map((elem, i) => {
            return (
                <Link key={elem.chatId + i} to={`/OperatorPage/Chat/${elem.chatId}`}>
                    <ListGroupItem className="resultSearch__item" >
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
        chats && value && resultSearch.length === 0 ? (
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

const mapStateToProps = ({ chats, user }) => ({ chats, user })

export default connect(mapStateToProps)(SearchBar)
