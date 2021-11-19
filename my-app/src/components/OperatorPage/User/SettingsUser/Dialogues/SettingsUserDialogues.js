import React, { useState, useCallback } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import { Button, Input, Fade, ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    fetchUserSettings,
    setNewSettingsDialogue,
} from '../../../../../actions'
import './SettingsUserDialogue.css'

let csArr = [
    {
        id: 'wornvowienc',
        m: "1"
    },
    {
        id: 'pwrvnq[wpd',
        m: "2"
    },
    {
        id: ';qwomvpoqwmv',
        m: "3"
    },
    {
        id: 'worn5ugniunvvowienc',
        m: "4"
    }
]

function SettingsUserDialogues({
    setNewSettingsDialogue,
    user,
    settingsUser,
    fetchUserSettings,
    topics,
}) {
    const [showInput, setShowInput] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const [valueInputAutomaticGreeting, setValueInputAutomaticGreeting] =
        useState(
            settingsUser.automaticGreeting ? settingsUser.automaticGreeting : ''
        )
    const [showBtnSubmit, setShowBtnSubmit] = useState(false)

    const [fadeIn, setFadeIn] = useState(true)
    const [subtopics, setSubtopics] = useState(Object.values(topics)[0])
    const [currentIndex, setCurrentIndex] = useState(0)

    const toggle = (topic, i) => {
        if (i === currentIndex) {
            setFadeIn(false)
        } else {
            setFadeIn(true)
            setCurrentIndex(i)
            for (let elem in topics) {
                if (elem === topic) {
                    let newSubtopics = topics[elem]
                    setSubtopics(newSubtopics)
                }
            }
        }
    }

    const ViewTopics = () => {
        let arrTopics = Object.keys(topics)
        return arrTopics.map((elem, i) => {
            return (
                <ListGroup key={i}>
                    <ListGroupItem
                        active={i === currentIndex ? true : false}
                        tag="button"
                        action
                        onClick={() => toggle(elem, i)}
                    >
                        {elem}
                    </ListGroupItem>
                </ListGroup>
            )
        })
    }

    const ViewSubtopics = () => {
        return subtopics.map((elem, i) => {
            return (
                <div key={i}>
                    <Fade in={fadeIn} tag="div" className="mt-3">
                        {elem}
                    </Fade>
                </div>
            )
        })
    }

    const [value, setValue] = useState();


    return (
        <div className="containerSettingsDialogues">
            {/* <div>
                <h3>Using useCallback hook:</h3>

                <input onChange={useCallback(e => setValue(e.target.value), [])} />
                {value}
                {console.log('update')}
            </div> */}

            <h2>Настройки Диалогов</h2>
            <div className="settingsDialogue">
                <div className="settingsDialogue__block">
                    <div className="settingsDialogue__readyPhrases">
                        <h4>Готовые фразы:</h4>
                        {settingsUser ? (
                            <Formik
                                initialValues={{
                                    phrases: csArr,
                                    automaticGreeting:
                                        settingsUser.automaticGreeting,
                                }}
                                onSubmit={(values) => {
                                    if (valueInput) {
                                        let obj = {
                                            automaticGreeting:
                                                values.automaticGreeting,
                                            phrases: values.phrases,
                                        }
                                        setNewSettingsDialogue(obj, user.uid)
                                        setShowInput(false)
                                        setValueInput('')
                                        fetchUserSettings(user.uid)
                                    }

                                    if (
                                        values.automaticGreeting !==
                                        valueInputAutomaticGreeting
                                    ) {
                                        let obj = {
                                            automaticGreeting:
                                                valueInputAutomaticGreeting,
                                            phrases: values.phrases,
                                        }
                                        setNewSettingsDialogue(obj, user.uid)
                                        setShowBtnSubmit(false)
                                        fetchUserSettings(user.uid)
                                    }
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        <FieldArray
                                            name="phrases"
                                            render={(arrayHelpers) => (
                                                < div >
                                                    {
                                                        values.phrases &&
                                                            values.phrases.length > 0
                                                            ? values.phrases.map(
                                                                (phrase, index) => (
                                                                    <div
                                                                        key={phrase.id}
                                                                        className="settingsDialogue__readyPhrases_phrase"
                                                                    >
                                                                        <Field
                                                                            as="div"
                                                                            name={`phrases.${phrase.id}`}
                                                                        >
                                                                            {phrase.m}
                                                                        </Field>
                                                                        <Button
                                                                            type="button"
                                                                            color="danger"
                                                                            outline
                                                                            size="sm"
                                                                            className="settingsDialogue__readyPhrases_phraseBtn max-height"
                                                                            onClick={() => {
                                                                                arrayHelpers.remove(phrase)
                                                                                console.log(phrase)
                                                                                //values.phrases = values.phrases.filter(item => item.id !== phrase.id)

                                                                                console.log(values.phrases)
                                                                                // let res = values.phrases.filter((item, i) => i !== index)

                                                                                // let obj =
                                                                                // {
                                                                                //     automaticGreeting: values.automaticGreeting,
                                                                                //     phrases: res
                                                                                // }

                                                                                // console.log(obj)

                                                                                // values.phrases.forEach(
                                                                                //     (elem, i) => {
                                                                                //         if (i === index) {
                                                                                //             values.phrases.splice(i, 1)
                                                                                //         }
                                                                                //     }
                                                                                // )
                                                                                // console.log(values.phrases)
                                                                                // obj.phrases = values.phrases
                                                                                // setNewSettingsDialogue(obj, user.uid)
                                                                                // fetchUserSettings(user.uid)
                                                                            }}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                    </div>
                                                                )
                                                            )
                                                            : null
                                                    }
                                                    < div className="settingsDialogue__readyPhrases_containerAdd">
                                                        {showInput ? (
                                                            <>
                                                                <Input
                                                                    value={
                                                                        valueInput
                                                                    }
                                                                    onChange={(e) => setValueInput(e.target.value)}
                                                                />
                                                                <Button
                                                                    color="success"
                                                                    type="submit"
                                                                    className="settingsDialogue__readyPhrases_phraseBtn"
                                                                    onClick={() => {
                                                                        if (valueInput) arrayHelpers.push(valueInput)
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={[
                                                                            'fas',
                                                                            'check',
                                                                        ]}
                                                                        color="white"
                                                                    />
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <Button
                                                                color="primary"
                                                                type="button"
                                                                onClick={() => {
                                                                    if (!showInput) setShowInput(true)
                                                                }}
                                                            >
                                                                Добавить
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <div className="settingsDialogue__greetings">
                                            <div>
                                                Автоматическое приветствие:
                                            </div>
                                            <Input
                                                value={
                                                    valueInputAutomaticGreeting
                                                }
                                                onChange={(e) => {
                                                    setValueInputAutomaticGreeting(
                                                        e.target.value
                                                    )
                                                    setShowBtnSubmit(true)
                                                }}
                                            />
                                            {showBtnSubmit ? (
                                                <Button
                                                    color="success"
                                                    type="submit"
                                                    className="settingsDialogue__readyPhrases_phraseBtn"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={['fas', 'check']}
                                                        color="white"
                                                    />
                                                </Button>
                                            ) : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        ) : null}
                    </div>
                </div>
                <div className="settingsDialogue__block">
                    <div>
                        <h4>Список тем</h4>
                        <div className="settingsDialogue__containerTopics">
                            <ViewTopics />
                        </div>
                    </div>
                    <div>
                        <h4>Список подтем</h4>
                        <div className="settingsDialogue__containerTopics">
                            <ViewSubtopics />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = ({ user, settingsUser, topics }) => {
    return {
        user,
        settingsUser,
        topics,
    }
}

const mapDispatchToProps = {
    setNewSettingsDialogue,
    fetchUserSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUserDialogues)
