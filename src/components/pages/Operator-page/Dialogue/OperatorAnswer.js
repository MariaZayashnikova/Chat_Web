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
import { pushNewMessageInDatabase } from '../../../../actions'
import Message from './MessageInfo'
import './Dialogue.css'

function OperatorAnswer({ itemId, pushNewMessageInDatabase, settingsUser }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [arrResAutocomplete, setArrResAutocomplete] = useState([])
    const [showTooltip, isShowTooltip] = useState(false)

    let valueForAutocomplete = ''

    const toggleDropdown = () => setDropdownOpen((dropdownOpen) => !dropdownOpen)
    const onEmojiClick = (event, emojiObject) => {
        setInputValue(inputValue + emojiObject.emoji)
    }
    const setValue = (data) => setInputValue(data)
    const pubnub = usePubNub()
    const onTypingStart = (presenceEvent) => {
        let message = presenceEvent
        pubnub.publish({ channel: itemId, message })
    }

    const onTypingEnd = () => {
        let message = 'operator onTypingEnd'
        pubnub.publish({ channel: itemId, message })
    }
    const pushArrResAC = (arr) => setArrResAutocomplete(arr)
    const addPhrase = (phrase) => setValue(inputValue + ' ' + phrase)
    const selectPhrase = (phrase) => setValue(phrase)

    function submitNewMessage(e) {
        e.preventDefault()
        if (!inputValue) return
        let time = new Date().getTime()
        let newMessage = {
            [time]: {
                content: inputValue,
                isOperator: true,
            },
        }
        pushNewMessageInDatabase(newMessage, itemId)
        setValue('')
    }

    function addPhraseInTooltip(phraseId, arrResult) {
        settingsUser.phrases.forEach(elem => {
            if (elem.id === phraseId) arrResult.push(elem)
        })
    }

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

    function changeInput(e) {
        onTypingStart('operator')
        valueForAutocomplete = e.target.value
        setValue(e.target.value)
        autocomplete()
    }

    const View = () => {
        return (
            <Popover placement="top-start" isOpen={showTooltip} target="myTooltip" toggle={isShowTooltip}>
                <PopoverHeader>Готовые фразы:</PopoverHeader>
                {arrResAutocomplete.map(elem => <PopoverBody onClick={() => {
                    selectPhrase(elem.content)
                    pushArrResAC([])
                }} key={elem.id}>{elem.content}</PopoverBody>)}
            </Popover>
        )
    }

    return (
        <>
            <Message itemId={itemId} />
            <div id="myTooltip"></div>
            <View />
            <div className="Answer">
                <Form onSubmit={submitNewMessage} className="Answer-form" >
                    <FormGroup className="position-relative">
                        <Label for="answer">Введите ответ:</Label>
                        <div className="position-relative">
                            <Input
                                id="answer"
                                name="answer"
                                onKeyUp={debounce(onTypingEnd, 3000)}
                                value={inputValue}
                                onInput={changeInput}
                            />
                            <FontAwesomeIcon
                                icon={['fas', 'smile']}
                                className="Answer-form__emoji_btn"
                                onClick={() => setShowEmoji(!showEmoji)}
                            />
                        </div>
                        {showEmoji ? (
                            <div className="Answer-form__emoji">
                                <Picker disableSearchBar="false" onEmojiClick={onEmojiClick} />
                            </div>
                        ) : null}
                    </FormGroup>
                    <Button className="Answer-form__btn" color="primary" type="submit" >
                        Отправить
                    </Button>
                </Form>
                <div className="ready-answers">
                    <div className="ready-answers__info">
                        <div>Или выберете из готовых:</div>
                        <FontAwesomeIcon icon={['fas', 'cog']} color="grey" />
                    </div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} size="sm" >
                        <DropdownToggle className="dropdown-btn" caret>
                            Варианты
                        </DropdownToggle>
                        <DropdownMenu>
                            {settingsUser.phrases.map(elem => <DropdownItem onClick={() => addPhrase(elem.content)} key={elem.id}>{elem.content}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ settingsUser }) => ({ settingsUser })

const mapDispatchToProps = {
    pushNewMessageInDatabase
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorAnswer)
