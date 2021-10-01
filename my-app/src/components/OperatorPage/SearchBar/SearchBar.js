import React from 'react'
import './SearchBar.css'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'
import { fetch_Data_From_Database, Set_Value_Search } from '../../../actions'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

function SearchBar({
    fetch_Data_From_Database,
    dataFromDatabase,
    valueSearch,
    Set_Value_Search,
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
                let timeMessage = contentDialog.messages
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

    if (dataFromDatabase && valueSearch) {
        search()
    }
    let result =
        resultSearch.length > 0 ? (
            <ViewResultSearch arrResult={resultSearch} />
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
                    onInput={debounce(searchStart, 2000)}
                />
            </div>
            {result ? (
                <ListGroup className="resultSearch">{result}</ListGroup>
            ) : null}
        </div>
    )
}

const ViewResultSearch = ({ arrResult }) => {
    return arrResult.map((elem) => {
        return (
            <ListGroupItem key={elem.idDialog}>
                <div className="resultSearch-infoDialog">
                    <p>{elem.client}</p>
                    <p>{elem.topic}</p>
                    <p>{elem.subtopic}</p>
                </div>
                <p>{elem.content}</p>
            </ListGroupItem>
        )
    })
}

const mapStateToProps = ({ dataFromDatabase, valueSearch }) => {
    return {
        dataFromDatabase,
        valueSearch,
    }
}

const mapDispatchToProps = {
    fetch_Data_From_Database,
    Set_Value_Search,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
