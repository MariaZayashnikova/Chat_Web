import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { auth, authViaGoogle, clearErrors, } from '../../../actions'
import Spinner from '../../Spinner/Spinner'
import './Authorization-page.css'

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

function AuthorizationPage({ error, loading, auth, clearErrors, authViaGoogle }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            if (error) clearErrors()

            auth(values)
        },
    })

    function onSignIn() {
        authViaGoogle()
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Тестовый пользователь</Popover.Header>
            <Popover.Body>
                Чтобы посмотреть проект, не указывая своих данных, Вы можете воспользоваться тестовым пользователем.<br />
                Логин: testUser@yandex.ru<br />
                Пароль: TestUser1<br />
                У тестового пользователя нет прав на внесение каких-либо изменений. Тестовый пользователь предназначен только для просмотра проекта.
            </Popover.Body>
        </Popover>
    );

    const PromptTestUser = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button color="primary">Нужен тестовый пользователь?<br /> Нажми</Button>
        </OverlayTrigger>
    );

    return (
        <div className="page">
            <div className="container-form">
                <h2 className="container-form__title">Авторизация</h2>
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
                        <FormGroup>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </FormGroup>
                        <Button
                            className="form__button"
                            color="primary"
                            type="submit"
                        >
                            Войти
                        </Button>
                    </Form>
                    {loading ? <Spinner /> : null}
                    {error ? (
                        <div className="error">{error}</div>
                    ) : null}
                </div>
                <div className="container-links">
                    <div className="link">
                        <button onClick={onSignIn} className="link_btnGoogle" >
                            <FontAwesomeIcon className="link_icon" icon={['fab', 'google']} />
                            Войти через Google
                        </button>
                    </div>
                    <div className="link">
                        <Link
                            to="/Registration"
                            className="link_elem"
                            onClick={() => {
                                if (error) clearErrors()
                            }}
                        >
                            Зарегистрироваться
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
            <div>
                <PromptTestUser />
            </div>
        </div>
    )
}

const mapStateToProps = ({ error, loading }) => ({ loading, error })

const mapDispatchToProps = {
    auth,
    clearErrors,
    authViaGoogle,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
