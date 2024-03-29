import React from 'react'
import { Button, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { resetPassword, clearErrors } from '../../../actions'
import { validate } from '../../../utils'
import 'react-toastify/dist/ReactToastify.css'

function ResetPasswordPage({ error, resetPassword, clearErrors }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
    })

    function submitResetForm(email) {
        if (error) clearErrors()

        resetPassword(email)
    }

    return (
        <div className="page">
            <div className="container-form">
                <h2 className="container-form__title">Восстановить пароль</h2>
                <div className="form">
                    <FormGroup className="position-relative">
                        <Label
                            className="color-white"
                            for="email"
                        >
                            Email
                        </Label>
                        <Input
                            className={
                                formik.touched.email && formik.errors.email
                                    ? 'form__input form__input_error'
                                    : 'form__input'
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
                        className="form__button"
                        color="primary"
                        type="submit"
                        onClick={() => submitResetForm(formik.values.email)}
                    >
                        Отправить ссылку для восстановления пароля
                    </Button>
                </div>
                {error ? (
                    <div className="error">{error}</div>
                ) : null}
                <ToastContainer />
                <div className="container-links">
                    <div className="link">
                        <Link to="/" className="link_elem" >
                            Войти
                        </Link>
                        <Link to="/Registration" className="link_elem" >
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ error }) => ({ error })

const mapDispatchToProps = { resetPassword, clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
