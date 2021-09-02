import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap';
import { useFormik } from 'formik';
import {validate} from "../AuthorizationPage/AuthorizationPage";
import {Link} from "react-router-dom";
import {
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_SUCCESS,
    FETCH_Registration_REQUEST,
    REMOVE_FAILURE
} from "../../actions";
import {connect} from 'react-redux';

function RegistrationPage({ loading, error, FETCH_Registration_REQUEST, FETCH_MESSAGES_FAILURE, REMOVE_FAILURE}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        validate,
        onSubmit: values => {
            if(values.password === values.passwordConfirmation) {
                FETCH_Registration_REQUEST(values);
            } else {
                const error = {
                    message: 'Пароли не совпадают'
                }
                FETCH_MESSAGES_FAILURE(error);
            }
        },
    });

    return (
        <div className="Page">
            <h2 className="TitlePage" >Регистрация</h2>
            <div className="containerForm">
                <Form onSubmit={formik.handleSubmit}>
                    <FormGroup className="position-relative">
                        <Label className="colorWhite" for="email">Email</Label>
                        <Input
                            className={formik.touched.email && formik.errors.email ? "input inputError" : "input"}
                            id="email"
                            name="email"
                            type="text"
                            invalid={formik.touched.email && formik.errors.email && formik.errors.email.length > 0 ? true : false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <FormFeedback tooltip>{formik.errors.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup className="position-relative">
                        <Label className="colorWhite" for="password">Пароль</Label>
                        <Input
                            className={formik.touched.password && formik.errors.password ? "input inputError" : "input"}
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </FormGroup>
                    <FormGroup className="position-relative">
                        <Label className="colorWhite" for="password">Подтверждение пароля</Label>
                        <Input
                            className={formik.touched.password && formik.errors.password ? "input inputError" : "input"}
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                        />
                    </FormGroup>
                    <Button className="btn-custom" color="primary" type="submit">Регистрация</Button>
                </Form>
                {loading ? (
                    <div>Loading...</div>
                ) : null }
                {error ? (
                    <div className="error">{error}</div>
                ) : null }
            </div>
            <div className="containerLinks">
                <div className="container">
                    <Link to='/' className="customLink">Войти</Link>
                    <div>Забыли пароль?</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({loading, error}) => {
    return {
        loading,
        error
    }
};

const mapDispatchToProps = {
    FETCH_Registration_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    REMOVE_FAILURE
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);