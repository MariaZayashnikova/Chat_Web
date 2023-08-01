import React from 'react'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { gotError, registration, clearErrors } from '../../../actions'
import { validate } from '../Authorization-page/Authorization-page'
import Spinner from '../../Spinner/Spinner'

function RegistrationPage({ loading, error, registration, gotError, clearErrors }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validate,
        onSubmit: (values) => {
            if (values.password === values.passwordConfirmation) {
                if (error) clearErrors()

                registration(values)
            } else {
                const error = {
                    message: 'Пароли не совпадают',
                }
                gotError(error)
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
                    {loading ? <Spinner /> : null}
                    {error ? (
                        <div className="error">{error}</div>
                    ) : null}
                </div>
                <div className="container-links">
                    <div className="link">
                        <Link
                            to="/"
                            className="link_elem"
                            onClick={() => {
                                if (error) clearErrors()
                            }}
                        >
                            Войти
                        </Link>
                        <Link
                            to="/ResetPassword"
                            className="link_elem"
                            onClick={() => {
                                if (error) clearErrors()
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

const mapStateToProps = ({ loading, error }) => ({ loading, error })

const mapDispatchToProps = {
    registration,
    gotError,
    clearErrors,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
