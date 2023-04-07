import React from 'react'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    fetchMessageFailure,
    fetchRegistration,
    clearErrors,
} from '../../../actions'
import { validate } from '../Authorization-page/Authorization-page'
import Spinner from '../../Spinner/Spinner'

function RegistrationPage({
    loadingFromState,
    errorFromState,
    fetchRegistration,
    fetchMessageFailure,
    clearErrors,
}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: (values) => {
            if (values.password === values.passwordConfirmation) {
                if (errorFromState) clearErrors()

                fetchRegistration(values)
            } else {
                const error = {
                    message: 'Пароли не совпадают',
                }
                fetchMessageFailure(error)
            }
        },
    })

    return (
        <div className="page">
            <div className="container-form">
                <h2 className="container-form__title">Регистрация</h2>
                <div className="form">
                    <Form onSubmit={formik.handleSubmit}>
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
                        <FormGroup className="position-relative">
                            <Label
                                className="color-white"
                                for="password"
                            >
                                Пароль
                            </Label>
                            <Input
                                className={
                                    formik.touched.password &&
                                        formik.errors.password
                                        ? 'form__input form__input_error'
                                        : 'form__input'
                                }
                                type="password"
                                id="password"
                                name="password"
                                invalid={
                                    formik.touched.password &&
                                        formik.errors.password &&
                                        formik.errors.password.length > 0
                                        ? true
                                        : false
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <FormFeedback tooltip>
                                <div>{formik.errors.password}</div>
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup className="position-relative">
                            <Label
                                className="color-white"
                                for="password"
                            >
                                Подтверждение пароля
                            </Label>
                            <Input
                                className={
                                    formik.touched.passwordConfirmation &&
                                        formik.errors.password
                                        ? 'form__input form__input_error'
                                        : 'form__input'
                                }
                                type="password"
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirmation}
                            />
                        </FormGroup>
                        <Button
                            className="form__button"
                            color="primary"
                            type="submit"
                        >
                            Регистрация
                        </Button>
                    </Form>
                    {loadingFromState ? <Spinner /> : null}
                    {errorFromState ? (
                        <div className="error">{errorFromState}</div>
                    ) : null}
                </div>
                <div className="container-links">
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
                            to="/ResetPassword"
                            className="link_elem"
                            onClick={() => {
                                if (errorFromState) clearErrors()
                            }}
                        >
                            Забыли пароль?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ loadingFromState, errorFromState }) => ({ loadingFromState, errorFromState })

const mapDispatchToProps = {
    fetchRegistration,
    fetchMessageFailure,
    clearErrors,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
