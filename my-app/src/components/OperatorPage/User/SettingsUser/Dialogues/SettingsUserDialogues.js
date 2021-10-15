import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import './SettingsUserDialogue.css'
import { Button, Input } from 'reactstrap'
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
}) {
    if (!settingsUser) {
        fetch_User_Settings(user.uid)
    }

    const [showInput, setShowInput] = useState(false)
    const [valueInput, setValueInput] = useState('')

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
                                    phrases: settingsUser,
                                }}
                                onSubmit={(values) => {
                                    if (valueInput) {
                                        let obj = {}
                                        values.phrases.forEach(
                                            (elem, index) => {
                                                obj[index] = elem
                                            }
                                        )
                                        set_New_Settings_Dialogue(obj, user.uid)
                                        setShowInput(false)
                                        setValueInput('')
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
                                                                                  {}
                                                                              values.phrases.forEach(
                                                                                  (
                                                                                      elem,
                                                                                      i
                                                                                  ) => {
                                                                                      if (
                                                                                          i !==
                                                                                          index
                                                                                      ) {
                                                                                          obj[
                                                                                              i
                                                                                          ] =
                                                                                              elem
                                                                                      }
                                                                                  }
                                                                              )
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
                                    </Form>
                                )}
                            </Formik>
                        ) : null}
                    </div>
                    <div className="settingsDialogue__greetings">
                        <div>Автоматическое приветствие:</div>
                        <Input />
                    </div>
                </div>
                <div className="settingsDialogue__block">
                    <div>
                        <h4>Список тем</h4>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                    </div>
                    <div>
                        <h4>Список подтем</h4>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                        <div>Тема 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, settingsUser }) => {
    return {
        user,
        settingsUser,
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
