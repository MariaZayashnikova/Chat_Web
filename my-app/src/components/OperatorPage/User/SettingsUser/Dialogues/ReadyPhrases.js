import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import { Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uniqid from 'uniqid';
import './SettingsUserDialogue.css'

function ReadyPhrases({ phrases, submit }) {
    const [valueInput, setValueInput] = useState('')
    const [showInput, setShowInput] = useState(false)

    function createObjNewPhrase(content) {
        let obj = {
            id: uniqid(),
            content: content
        }

        return obj
    }

    function handleClickBtnDelete(arrayHelpers, index, phraseId, values) {
        arrayHelpers.remove(index)
        let phrases = values.phrases.filter(item => item.id !== phraseId)
        submit({ phrases })
    }

    return (
        <>
            {phrases ? (
                <Formik
                    initialValues={{
                        phrases: phrases
                    }}
                    onSubmit={(values) => {
                        submit(values)
                        setShowInput(false)
                        setValueInput('')
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <FieldArray
                                name="phrases"
                                render={(arrayHelpers) => (
                                    < div >
                                        {!!values?.phrases?.length && values.phrases.map(
                                            (phrase, index) => (
                                                <div
                                                    key={phrase.id}
                                                    className="settingsDialogue__readyPhrases_phrase"
                                                >
                                                    <Field
                                                        as="div"
                                                        name={`phrase.${phrase.id}`}
                                                    >
                                                        {phrase.content}
                                                    </Field>
                                                    <Button
                                                        type="button"
                                                        color="danger"
                                                        outline
                                                        size="sm"
                                                        className="settingsDialogue__readyPhrases_phraseBtn max-height"
                                                        onClick={() => handleClickBtnDelete(arrayHelpers, index, phrase.id, values)}
                                                    >
                                                        -
                                                    </Button>
                                                </div>
                                            )
                                        )
                                        }
                                        < div className="settingsDialogue__readyPhrases_containerAdd">
                                            {showInput ? (
                                                <>
                                                    <Input
                                                        value={valueInput}
                                                        onChange={(e) => setValueInput(e.target.value)}
                                                    />
                                                    <Button
                                                        color="success"
                                                        type="submit"
                                                        className="settingsDialogue__readyPhrases_phraseBtn"
                                                        onClick={() => {
                                                            if (valueInput) {
                                                                let res = createObjNewPhrase(valueInput)
                                                                arrayHelpers.push(res)
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={['fas', 'check',]}
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
                                                    ????????????????
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            />

                        </Form>
                    )}
                </Formik>
            ) : null}
        </>
    )
}


export default ReadyPhrases
