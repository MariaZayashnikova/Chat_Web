import './AuthorizationPage.css';
import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap';
import { useFormik } from 'formik';
import {FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS} from "../../actions";
import {connect} from 'react-redux';

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = true;
    }
    if (!values.email) {
        errors.email = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}

function AuthorizationPage({ loading, error, FETCH_MESSAGES_REQUEST}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            FETCH_MESSAGES_REQUEST(values);
        },
    });
    return (
        <div className="AuthorizationPage">
            <h2 className="TitlePage" >Авторизация</h2>
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
                        <Button className="btn-custom" color="primary" type="submit">Войти</Button>
                    </FormGroup>
                </Form>
                {loading ? (
                    <div>Loading...</div>
                ) : null }
                {error ? (
                    <div className="error">{error}</div>
                ) : null }
            </div>
        </div>
    );
}
const mapStateToProps = ({loading, error}) => {
    return {
        loading,
        error
    }
};

const mapDispatchToProps = {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);