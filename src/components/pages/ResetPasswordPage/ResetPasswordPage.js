import React from 'react'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { resetPassword, clearErrors } from '../../../actions'
import { validate } from '../AuthorizationPage/AuthorizationPage'
import 'react-toastify/dist/ReactToastify.css'

function ResetPasswordPage({ errorFromState, resetPassword, clearErrors }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
    })

    function submitResetForm(email) {
        if (errorFromState) clearErrors()

        resetPassword(email)
    }

    return (
        <div className="page">
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
                        onClick={() => submitResetForm(formik.values.email)}
                    >
                        Отправить ссылку для восстановления пароля
                    </Button>
                </div>
                {errorFromState ? (
                    <div className="error">{errorFromState}</div>
                ) : null}
                <ToastContainer />
                <div className="containerLinks">
                    <div className="link">
                        <Link
                            to="/"
                            className="link_elem"
                            onClick={() => {
                                if (errorFromState) clearErrors()
                            }}
                        >
                            Войти
                        </Link>
                        <Link
                            to="/Registration"
                            className="link_elem"
                            onClick={() => {
                                if (errorFromState) clearErrors()
                            }}
                        >
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ errorFromState }) => ({ errorFromState })

const mapDispatchToProps = { resetPassword, clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
