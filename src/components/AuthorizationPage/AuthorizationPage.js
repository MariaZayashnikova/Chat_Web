import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    fetchAuthorization,
    fetchAuthorizationViaGoogle,
    clearErrors,
} from '../../actions'
import Spinner from '../Spinner/Spinner'
import './AuthorizationPage.css'

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
    fetchAuthorization,
    clearErrors,
    fetchAuthorizationViaGoogle,
}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            if (errorFromState) clearErrors()

            fetchAuthorization(values)
        },
    })

    function onSignIn() {
        fetchAuthorizationViaGoogle()
    }

    return (
        <div className="pageLogin">
            <h2 className="pageLogin__titlePage">Авторизация</h2>
            <div className="pageLogin__containerForm">
                <Form onSubmit={formik.handleSubmit}>
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
                    <FormGroup>
                        <Label
                            className="pageLogin__containerForm_colorWhite"
                            for="password"
                        >
                            Пароль
                        </Label>
                        <Input
                            className={
                                formik.touched.password &&
                                    formik.errors.password
                                    ? 'pageLogin__containerForm_input pageLogin__containerForm_inputError'
                                    : 'pageLogin__containerForm_input'
                            }
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </FormGroup>
                    <Button
                        className="pageLogin__containerForm_btn"
                        color="primary"
                        type="submit"
                    >
                        Войти
                    </Button>
                </Form>
                {loadingFromState ? <Spinner /> : null}
                {errorFromState ? (
                    <div className="error">{errorFromState}</div>
                ) : null}
            </div>
            <div className="containerLinks">
                <div className="containerLinks__link">
                    <button
                        onClick={onSignIn}
                        className="containerLinks__link_btnGoogle"
                    >
                        <FontAwesomeIcon
                            className="containerLinks__link_icon"
                            icon={['fab', 'google']}
                        />
                        Войти через Google
                    </button>
                </div>
                <div className="containerLinks__link">
                    <Link
                        to="/Registration"
                        className="containerLinks__link_custom"
                        onClick={() => {
                            if (errorFromState) clearErrors()
                        }}
                    >
                        Зарегистрироваться
                    </Link>
                    <Link
                        to="/ResetPassword"
                        className="containerLinks__link_custom"
                        onClick={() => {
                            if (errorFromState) clearErrors()
                        }}
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ errorFromState, loadingFromState }) => ({ loadingFromState, errorFromState })

const mapDispatchToProps = {
    fetchAuthorization,
    clearErrors,
    fetchAuthorizationViaGoogle,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
