import React from 'react'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { validate } from '../AuthorizationPage/AuthorizationPage'
import { RESET_PASSWORD, REMOVE_FAILURE } from '../../actions'
import { connect } from 'react-redux'
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
        <div className="pageLogin">
            <h2 className="pageLogin__titlePage">Восстановить пароль</h2>
            <div className="pageLogin__containerForm">
                <FormGroup className="position-relative">
                    <Label
                        className="pageLogin__containerForm_colorWhite"
                        for="email"
                    >
                        Email
                    </Label>
                    <Input
                        className={
                            formik.touched.email && formik.errors.email
                                ? 'pageLogin__containerForm_input pageLogin__containerForm_inputError'
                                : 'pageLogin__containerForm_input'
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
                    className="pageLogin__containerForm_btn"
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
                <div className="containerLinks__link">
                    <Link
                        to="/"
                        className="containerLinks__link_custom"
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
                        className="containerLinks__link_custom"
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
