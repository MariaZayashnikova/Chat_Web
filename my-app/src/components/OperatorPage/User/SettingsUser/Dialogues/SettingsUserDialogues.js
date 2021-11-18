import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import './SettingsUserDialogue.css'
import { Button, Input, Fade, ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import {
    fetch_User_Settings,
    set_New_Settings_Dialogue,
} from '../../../../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SettingsUserDialogues({
    set_New_Settings_Dialogue,
    user,
    settingsUser,
    fetch_User_Settings,
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

    return (
        <div className="containerSettingsDialogues">
            <h2>Настройки Диалогов</h2>
            <div className="settingsDialogue">
                <div className="settingsDialogue__block">
                    <div className="settingsDialogue__readyPhrases">
                        <h4>Готовые фразы:</h4>
                        {settingsUser ? (
                            <Formik
                                initialValues={{
                                    phrases: settingsUser.phrases,
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
                                        set_New_Settings_Dialogue(obj, user.uid)
                                        setShowInput(false)
                                        setValueInput('')
                                        fetch_User_Settings(user.uid)
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
                                        set_New_Settings_Dialogue(obj, user.uid)
                                        setShowBtnSubmit(false)
                                        fetch_User_Settings(user.uid)
                                    }
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        <FieldArray
                                            name="phrases"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {values.phrases &&
                                                        values.phrases.length > 0
                                                        ? values.phrases.map(
                                                            (
                                                                phrase,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="settingsDialogue__readyPhrases_phrase"
                                                                >
                                                                    <Field
                                                                        as="div"
                                                                        name={`phrases.${index}`}
                                                                    >
                                                                        {
                                                                            phrase
                                                                        }
                                                                    </Field>
                                                                    <Button
                                                                        type="button"
                                                                        color="danger"
                                                                        outline
                                                                        size="sm"
                                                                        className="settingsDialogue__readyPhrases_phraseBtn max-height"
                                                                        onClick={() => {
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                            let obj =
                                                                            {
                                                                                automaticGreeting:
                                                                                    values.automaticGreeting,
                                                                            }
                                                                            values.phrases.forEach(
                                                                                (
                                                                                    elem,
                                                                                    i
                                                                                ) => {
                                                                                    if (
                                                                                        i ===
                                                                                        index
                                                                                    ) {
                                                                                        values.phrases.splice(
                                                                                            i,
                                                                                            1
                                                                                        )
                                                                                    }
                                                                                }
                                                                            )
                                                                            obj.phrases =
                                                                                values.phrases
                                                                            set_New_Settings_Dialogue(
                                                                                obj,
                                                                                user.uid
                                                                            )
                                                                            fetch_User_Settings(
                                                                                user.uid
                                                                            )
                                                                        }}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                </div>
                                                            )
                                                        )
                                                        : null}
                                                    <div className="settingsDialogue__readyPhrases_containerAdd">
                                                        {showInput ? (
                                                            <>
                                                                <Input
                                                                    value={
                                                                        valueInput
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setValueInput(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                />
                                                                <Button
                                                                    color="success"
                                                                    type="submit"
                                                                    className="settingsDialogue__readyPhrases_phraseBtn"
                                                                    onClick={() => {
                                                                        if (
                                                                            valueInput
                                                                        ) {
                                                                            arrayHelpers.push(
                                                                                valueInput
                                                                            )
                                                                        }
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
                                                                    if (
                                                                        !showInput
                                                                    ) {
                                                                        setShowInput(
                                                                            true
                                                                        )
                                                                    }
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
        </div>
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
    set_New_Settings_Dialogue,
    fetch_User_Settings,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsUserDialogues)
