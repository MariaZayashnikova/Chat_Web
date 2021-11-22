import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Field } from 'react-final-form'
import { ToastContainer } from 'react-toastify'
import {
    fetchMessageFailure,
    clearErrors,
    updatePassword,
    updateUserName,
    updatedUserName,
} from '../../../../../actions'
import './SettingsProfile.css'

function SettingsProfile({
    fetchMessageFailure,
    errorFromState,
    clearErrors,
    updatePassword,
    user,
    updateUserName,
    updatedUserName,
    closeModal,
}) {
    function onSubmit(values) {
        if (values.password) {
            if (values.password === values.passwordConfirmation) {
                if (
                    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/i.test(
                        values.password
                    )
                ) {
                    const error = {
                        message:
                            'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков',
                    }
                    fetchMessageFailure(error)
                } else {
                    if (errorFromState) clearErrors()
                    updatePassword(values.password)
                    setTimeout(closeModal, 5000)
                }
            } else {
                const error = {
                    message: 'Пароли не совпадают',
                }
                fetchMessageFailure(error)
            }
        }

        if (user.name !== values.name) {
            updateUserName(values.name)
            let newUser = {
                name: values.name,
                email: user.email,
                token: user._lat,
                uid: user.uid,
            }
            updatedUserName(newUser)
            setTimeout(closeModal, 5000)
        }
    }

    let initialUserName = user.name ? user.name : ''

    return (
        <>
            <ToastContainer />
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    name: initialUserName,
                    password: '',
                    passwordConfirmation: '',
                    avatar: '',
                }}
                render={({ handleSubmit, values }) => (
                    <form className="formSettings" onSubmit={handleSubmit}>
                        <h2>Настройки профиля</h2>
                        <div className="formSettings__inputs">
                            <label className="formSettings__inputs_label">
                                Имя:
                            </label>
                            <Field
                                name="name"
                                component="input"
                                value={values.name}
                            />
                        </div>
                        <div className="formSettings__containerAvatar">
                            <label>Аватар:</label>
                            <FontAwesomeIcon
                                icon={['fas', 'user']}
                                color="darkblue"
                                size="3x"
                            />
                            <Field name="avatar">
                                {(props) => (
                                    <div>
                                        <input
                                            {...props.input}
                                            type="file"
                                            value={values.avatar}
                                        />
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="formSettings__inputs">
                            <label className="formSettings__inputs_label">
                                Пароль
                            </label>
                            <Field
                                name="password"
                                type="password"
                                component="input"
                                value={values.password}
                            />
                        </div>
                        <div className="formSettings__inputs">
                            <label className="formSettings__inputs_label">
                                Подтверждение пароля
                            </label>
                            <Field
                                name="passwordConfirmation"
                                type="password"
                                component="input"
                                value={values.passwordConfirmation}
                            />
                        </div>
                        <Button
                            className="formSettings_btn"
                            color="primary"
                            type="submit"
                        >
                            Обновить профиль
                        </Button>
                    </form>
                )}
            />
            {errorFromState ? (
                <div className="error">{errorFromState}</div>
            ) : null}
        </>
    )
}

const mapStateToProps = ({ errorFromState, user }) => ({ errorFromState, user })

const mapDispatchToProps = {
    clearErrors,
    fetchMessageFailure,
    updatePassword,
    updateUserName,
    updatedUserName,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProfile)
