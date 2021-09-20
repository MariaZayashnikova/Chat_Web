import './AuthorizationPage.css'
import React from 'react'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import {
    FETCH_MESSAGES_FAILURE,
    FETCH_Authorization_REQUEST,
    FETCH_AuthorizationViaGoogle_REQUEST,
    REMOVE_FAILURE,
} from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../Spinner/Spinner'

const validate = (values) => {
    const errors = {}

    if (!values.password) {
        errors.password = true
    } else if (
        !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/i.test(
            values.password
        )
    ) {
        errors.password =
            'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков'
    }

    if (!values.email) {
        errors.email = true
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    return errors
}

export { validate }

function AuthorizationPage({
    errorFromState,
    loadingFromState,
    FETCH_Authorization_REQUEST,
    REMOVE_FAILURE,
    FETCH_AuthorizationViaGoogle_REQUEST,
}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            if (errorFromState) {
                REMOVE_FAILURE()
            }
            FETCH_Authorization_REQUEST(values)
        },
    })

    function onSignIn() {
        FETCH_AuthorizationViaGoogle_REQUEST()
    }

    return (
        <div className="Page">
            <h2 className="TitlePage">Авторизация</h2>
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
                    <FormGroup>
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </FormGroup>
                    <Button className="btnCustom" color="primary" type="submit">
                        Войти
                    </Button>
                </Form>
                {loadingFromState ? <Spinner /> : null}
                {errorFromState ? (
                    <div className="error">{errorFromState}</div>
                ) : null}
            </div>
            <div className="containerLinks">
                <div className="container">
                    <button onClick={onSignIn} className="btnCustomNet">
                        <FontAwesomeIcon
                            className="custom-icon"
                            icon={['fab', 'google']}
                        />
                        Войти через Google
                    </button>
                </div>
                <div className="container">
                    <Link
                        to="/Registration"
                        className="customLink"
                        onClick={() => {
                            if (errorFromState) {
                                REMOVE_FAILURE()
                            }
                        }}
                    >
                        Зарегистрироваться
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

const mapStateToProps = ({ errorFromState, loadingFromState }) => {
    return {
        loadingFromState,
        errorFromState,
    }
}

const mapDispatchToProps = {
    FETCH_Authorization_REQUEST,
    FETCH_MESSAGES_FAILURE,
    REMOVE_FAILURE,
    FETCH_AuthorizationViaGoogle_REQUEST,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
