import React from 'react'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { validate } from '../AuthorizationPage/AuthorizationPage'
import { RESET_PASSWORD, REMOVE_FAILURE } from '../../actions'
import { connect } from 'react-redux'
import './ResetPasswordPage.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ResetPasswordPage({ errorFromState, RESET_PASSWORD, REMOVE_FAILURE }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
    })

    function submitResetForm(email) {
        if (errorFromState) {
            REMOVE_FAILURE()
        }

        RESET_PASSWORD(email)
    }

    return (
        <div className="Page">
            <h2 className="TitlePage">Восстановить пароль</h2>
            <div className="containerForm">
                <FormGroup className="position-relative">
                    <Label className="colorWhite" for="email">
                        Email
                    </Label>
                    <Input
                        className={
                            formik.touched.email && formik.errors.email
                                ? 'input inputError'
                                : 'input'
                        }
                        id="email"
                        name="email"
                        type="text"
                        invalid={
                            formik.touched.email &&
                            formik.errors.email &&
                            formik.errors.email.length > 0
                                ? true
                                : false
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <FormFeedback tooltip>
                        <div>{formik.errors.email}</div>
                    </FormFeedback>
                </FormGroup>
                <Button
                    className="btnCustom"
                    color="primary"
                    type="submit"
                    onClick={() => {
                        submitResetForm(formik.values.email)
                    }}
                >
                    Отправить ссылку для восстановления пароля
                </Button>
            </div>
            {errorFromState ? (
                <div className="error">{errorFromState}</div>
            ) : null}
            <ToastContainer />
            <div className="containerLinks">
                <div className="container">
                    <Link
                        to="/"
                        className="customLink"
                        onClick={() => {
                            if (errorFromState) {
                                REMOVE_FAILURE()
                            }
                        }}
                    >
                        Войти
                    </Link>
                    <Link
                        to="/Registration"
                        className="customLink"
                        onClick={() => {
                            if (errorFromState) {
                                REMOVE_FAILURE()
                            }
                        }}
                    >
                        Регистрация
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ errorFromState }) => {
    return {
        errorFromState,
    }
}

const mapDispatchToProps = {
    RESET_PASSWORD,
    REMOVE_FAILURE,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
