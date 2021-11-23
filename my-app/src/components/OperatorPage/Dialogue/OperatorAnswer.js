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
    Popover,
    PopoverHeader,
    PopoverBody
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
    const [dropdownOpen, setDropdownOpen] = useState(false)
    let toggleDropdown = () => setDropdownOpen((dropdownOpen) => !dropdownOpen)

    const [showEmoji, setShowEmoji] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const onEmojiClick = (event, emojiObject) => {
        setInputValue(inputValue + emojiObject.emoji)
    }
    const setValue = (data) => setInputValue(data)

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

    let valueForAutocomplete = ''
    const [arrResAutocomplete, setArrResAutocomplete] = useState([])
    const pushArrResAC = (arr) => setArrResAutocomplete(arr)

    const [showTooltip, isShowTooltip] = useState(false)

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

    const addPhrase = (phrase) => setValue(inputValue + ' ' + phrase)

    function addPhraseInTooltip(phraseId, arrResult) {
        settingsUser.phrases.forEach(elem => {
            if (elem.id === phraseId) arrResult.push(elem)
        })
    }

    const selectPhrase = (phrase) => setValue(phrase)

    function autocomplete() {
        let str = valueForAutocomplete
        let phrases = settingsUser.phrases
        let arrResult = []

        phrases = phrases.map(elem => {
            return {
                content: elem.content.toLowerCase().replace(/[^a-zа-яё0-9\s]/gm, ''),
                id: elem.id
            }
        })

        str = str.toLowerCase().replace(/[^a-zа-яё0-9\s]/gm, '')

        if (str.length > 0) {
            phrases.forEach(phrase => {
                if (phrase.content.includes(str) && phrase.content.length !== str.length) addPhraseInTooltip(phrase.id, arrResult)
            })
        }

        pushArrResAC(arrResult)
    }

    if (arrResAutocomplete.length > 0 && !showTooltip) isShowTooltip(true)
    if (arrResAutocomplete.length === 0 && showTooltip) isShowTooltip(false)

    const View = () => {
        return (
            <>
                <Popover placement="top-start" isOpen={showTooltip} target="myTooltip" toggle={isShowTooltip}>
                    <PopoverHeader>Готовые фразы:</PopoverHeader>
                    {arrResAutocomplete.map(elem => <PopoverBody className="containerDialogue-tooltips" onClick={() => {
                        selectPhrase(elem.content)
                        pushArrResAC([])
                    }} key={elem.id}>{elem.content}</PopoverBody>)}
                </Popover>
            </>
        )
    }

    return (
        <div>
            <Message itemId={itemId} />
            <div id="myTooltip"></div>
            <View />
            <div className="containerDialogue__Answers">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        submitNewMessage()
                        setValue('')
                    }}
                    className="containerDialogue__Answer"
                >
                    <FormGroup className="position-relative">
                        <Label for="answer">Введите ответ:</Label>
                        <div className="position-relative">
                            <Input
                                id="answer"
                                name="answer"
                                onKeyUp={debounce(onTypingEnd, 3000)}
                                value={inputValue}
                                onInput={(e) => {
                                    onTypingStart('operator')
                                    valueForAutocomplete = e.target.value
                                    setValue(e.target.value)
                                    autocomplete()
                                }}
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
                            {settingsUser.phrases.map(elem => <DropdownItem onClick={() => addPhrase(elem.content)} key={elem.id}>{elem.content}</DropdownItem>)}
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
