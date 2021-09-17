import React from 'react'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import { validate } from '../AuthorizationPage/AuthorizationPage'
import { Link, Redirect } from 'react-router-dom'
import {
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_SUCCESS,
    FETCH_Registration_REQUEST,
    REMOVE_FAILURE,
} from '../../actions'
import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'

function RegistrationPage({
    loadingFromState,
    errorFromState,
    user,
    FETCH_Registration_REQUEST,
    FETCH_MESSAGES_FAILURE,
    REMOVE_FAILURE,
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
                if (errorFromState) {
                    REMOVE_FAILURE()
                }
                FETCH_Registration_REQUEST(values)
            } else {
                const error = {
                    message: 'Пароли не совпадают',
                }
                FETCH_MESSAGES_FAILURE(error)
            }
        },
    })

    if (user) {
        return <Redirect to="/OperatorPage" />
    }

    return (
        <div className="Page">
            <h2 className="TitlePage">Регистрация</h2>
            <div className="containerForm">
                <Form onSubmit={formik.handleSubmit}>
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
                    <FormGroup className="position-relative">
                        <Label className="colorWhite" for="password">
                            Пароль
                        </Label>
                        <Input
                            className={
                                formik.touched.password &&
                                formik.errors.password
                                    ? 'input inputError'
                                    : 'input'
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
                        <Label className="colorWhite" for="password">
                            Подтверждение пароля
                        </Label>
                        <Input
                            className={
                                formik.touched.passwordConfirmation &&
                                formik.errors.password
                                    ? 'input inputError'
                                    : 'input'
                            }
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                        />
                    </FormGroup>
                    <Button className="btnCustom" color="primary" type="submit">
                        Регистрация
                    </Button>
                </Form>
                {loadingFromState ? <Spinner /> : null}
                {errorFromState ? (
                    <div className="error">{errorFromState}</div>
                ) : null}
            </div>
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
                        to="/ResetPassword"
                        className="customLink"
                        onClick={() => {
                            if (errorFromState) {
                                REMOVE_FAILURE()
                            }
                        }}
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ loadingFromState, errorFromState, user }) => {
    return {
        loadingFromState,
        errorFromState,
        user,
    }
}

const mapDispatchToProps = {
    FETCH_Registration_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    REMOVE_FAILURE,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
