import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Label,
    Form,
} from 'reactstrap'
import 'moment/locale/ru.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from 'emoji-picker-react'
import debounce from 'lodash.debounce'
import { usePubNub } from 'pubnub-react'
import {
    fetchDialoguesFromDatabase,
    pushNewMessageInDatabase,
} from '../../../actions'
import Message from './MessageInfo'
import './Dialogue.css'

function OperatorAnswer({
    itemId,
    pushNewMessageInDatabase,
    fetchDialoguesFromDatabase,
    settingsUser
}) {
    function submitNewMessage() {
        if (!inputValue) return
        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: inputValue,
                isOperator: true,
            },
        }
        pushNewMessageInDatabase(newMessage, itemId)
        fetchDialoguesFromDatabase()
    }

    const [dropdownOpen, setDropdownOpen] = useState(false)

    let toggleDropdown = () => setDropdownOpen((dropdownOpen) => !dropdownOpen)

    const onEmojiClick = (event, emojiObject) => {
        setInputValue(inputValue + emojiObject.emoji)
    }

    const [showEmoji, setShowEmoji] = useState(false)

    const [inputValue, setInputValue] = useState('')

    const pubnub = usePubNub()

    let [channels] = useState([`${itemId}`])

    const onTypingStart = (presenceEvent) => {
        let message = presenceEvent
        pubnub.publish({ channel: channels, message })
    }

    const onTypingEnd = () => {
        let message = 'operator onTypingEnd'
        pubnub.publish({ channel: channels, message })
    }

    return (
        <div>
            <Message itemId={itemId} />
            <div className="containerDialogue__Answers">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        submitNewMessage()
                        setInputValue('')
                    }}
                    className="containerDialogue__Answer"
                >
                    <FormGroup className="position-relative">
                        <Label for="answer">Введите ответ:</Label>
                        <div className="position-relative">
                            <Input
                                id="answer"
                                name="answer"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyUp={debounce(onTypingEnd, 3000)}
                                onInput={() => onTypingStart('operator')}
                            />
                            <FontAwesomeIcon
                                icon={['fas', 'smile']}
                                className="containerDialogue__input_emoji"
                                onClick={() => setShowEmoji(!showEmoji)}
                            />
                        </div>
                        {showEmoji ? (
                            <div className="containerDialogue__input_emojiPicker">
                                <Picker
                                    disableSearchBar="false"
                                    onEmojiClick={onEmojiClick}
                                />
                            </div>
                        ) : null}
                    </FormGroup>
                    <Button
                        className="containerDialogue__Answer_btn"
                        color="primary"
                        type="submit"
                    >
                        Отправить
                    </Button>
                </Form>
                <div className="containerDialogue__readyAnswers">
                    <div className="containerDialogue__readyAnswers_settings">
                        <div>Или выберете из готовых:</div>
                        <FontAwesomeIcon icon={['fas', 'cog']} color="grey" />
                    </div>
                    <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggleDropdown}
                        size="sm"
                    >
                        <DropdownToggle className="dropdownCustom" caret>
                            Варианты
                        </DropdownToggle>
                        <DropdownMenu>
                            {settingsUser.phrases.map((elem, index) => <DropdownItem key={index}>{elem}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ settingsUser }) => ({ settingsUser })

const mapDispatchToProps = {
    pushNewMessageInDatabase,
    fetchDialoguesFromDatabase,
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorAnswer)
