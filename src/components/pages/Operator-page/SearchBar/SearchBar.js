import React, { useState } from 'react'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import './SearchBar.css'

function SearchBar({ chats, status, user }) {
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

    function findSearchMatches(nameClient, chatId, chat, messages) {
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

    function search() {
        for (let chatId in chats) {
            const chat = chats[chatId]
            const nameClient = chat.client.toLowerCase()
            const messages = chat.messages

            if (status === 'active' && chat.status === 'active') {
                findSearchMatches(nameClient, chatId, chat, messages)
            }
            else if (chat.operatorUID !== user.uid) continue
            else if (chat.isSave && status === 'saved') {
                findSearchMatches(nameClient, chatId, chat, messages)
            } else if (chat.status === status) {
                findSearchMatches(nameClient, chatId, chat, messages)
            }
        }
    }

    if (chats && value) search()

    const ViewResultSearch = ({ arrResult }) => {
        return arrResult.map((elem, i) => {
            return (
                <Link key={elem.chatId + i} to={`/OperatorPage/Chat/${elem.chatId}`}>
                    <ListGroupItem className="result-search__item">
                        <div className="result-search__chat-info">
                            <p className="result-search__chat-info_name">
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

    return (
        <>
            <div className="SearchBar">
                <Label for="search">  Поиск:  </Label>
                <Input type="search" id="search" onInput={debounce(searchStart, 1000)} />
            </div>
            <div style={{ position: "relative" }}>
                {chats && value ? (
                    <ListGroup className="result-search">
                        {resultSearch.length > 0 ? (
                            <ViewResultSearch arrResult={resultSearch} />) : (
                            <ListGroupItem>Ничего не найдено</ListGroupItem>
                        )}
                    </ListGroup>
                ) : null}
            </div>
        </>
    )
}

const mapStateToProps = ({ chats, user }) => ({ chats, user })

export default connect(mapStateToProps)(SearchBar)
