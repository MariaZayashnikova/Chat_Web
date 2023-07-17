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
    updateUsersAvatar
} from '../../../../../../actions'
import PicturePreview from '../../../../../Picture-preview/Picture-preview'
import './Settings-profile.css'

function SettingsProfile({
    fetchMessageFailure,
    errorFromState,
    clearErrors,
    updatePassword,
    user,
    updateUserName,
    updatedUserName,
    closeModal,
    updateUsersAvatar
}) {

    let initialUserName = user.name ? user.name : ''

    let fileInput = React.createRef()

    function onSubmit(values) {
        if (values.password) {
            if (values.password === values.passwordConfirmation) {
                if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/i.test(values.password)) {
                    const error = {
                        message: 'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков'
                    }
                    fetchMessageFailure(error)

                } else {
                    if (errorFromState) clearErrors()

                    updatePassword(values.password)
                }
            } else {
                const error = {
                    message: 'Пароли не совпадают'
                }
                fetchMessageFailure(error)
            }
        }

        if (user.name !== values.name || fileInput.current.files[0]) {
            let newUser = {
                name: user.name,
                email: user.email,
                photoUrl: user.photoUrl,
                token: user.token,
                uid: user.uid,
            }

            if (user.name !== values.name) {
                updateUserName(values.name)
                newUser.name = values.name
            }

            if (fileInput.current.files[0]) {
                newUser.photoUrl = window.URL.createObjectURL(fileInput.current.files[0])

                let obj = {
                    user,
                    avatar: fileInput.current.files[0]
                }
                updateUsersAvatar(obj)
            }

            updatedUserName(newUser)
        }

        setTimeout(closeModal, 5000)
    }

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
                    <form className="Settings-profile" onSubmit={handleSubmit}>
                        <h2>Настройки профиля</h2>
                        <div className="Settings-profile-inputs">
                            <label>  Имя: </label>
                            <Field name="name" component="input" value={values.name} />
                        </div>
                        <div className="Settings-profile-avatar">
                            <label>Аватар:</label>
                            {user.photoUrl ? (
                                <div className="avatar">
                                    <PicturePreview srcImg={user.photoUrl} style={{ name: "avatar_image" }} />
                                </div>
                            )
                                : <FontAwesomeIcon icon={['fas', 'user']} color="darkblue" size="3x" />
                            }
                            <Field name="avatar">
                                {(props) => (
                                    <div>
                                        <input
                                            {...props.input}
                                            type="file"
                                            value={values.avatar}
                                            ref={fileInput}
                                        />
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="Settings-profile-inputs">
                            <label>  Пароль </label>
                            <Field name="password" type="password" component="input" value={values.password} />
                        </div>
                        <div className="Settings-profile-inputs">
                            <label>  Подтверждение пароля </label>
                            <Field name="passwordConfirmation" type="password" component="input" value={values.passwordConfirmation} />
                        </div>
                        <Button color="primary" type="submit" >
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
    updateUsersAvatar
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProfile)