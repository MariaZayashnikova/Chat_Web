import './AuthorizationPage.css';
import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Label, Button } from 'reactstrap';
import { useFormik } from 'formik';
import {
    FETCH_MESSAGES_FAILURE,
    FETCH_Authorization_REQUEST,
    REMOVE_FAILURE,
    FETCH_AuthorizationViaGoogle_REQUEST
} from "../../actions";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner/Spinner";

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

export {validate};

function AuthorizationPage({ loading, error, FETCH_Authorization_REQUEST, REMOVE_FAILURE, user, FETCH_AuthorizationViaGoogle_REQUEST}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            if(error) {
                REMOVE_FAILURE();
            }
            FETCH_Authorization_REQUEST(values);
        },
    });
    function onSignIn() {
        FETCH_AuthorizationViaGoogle_REQUEST();
    }

    return (
        <div className="Page">
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
                    </FormGroup>
                    <Button className="btn-custom" color="primary" type="submit">Войти</Button>
                </Form>
                {loading ? (
                    <Spinner/>
                ) : null }
                {error ? (
                    <div className="error">{error}</div>
                ) : null }
            </div>
            <div className="containerLinks">
                <div className="container">
                    <button className="btn-custom-net">
                        <FontAwesomeIcon className="custom-icon" icon={['fab', 'vk']} />
                        Войти через VK
                    </button>
                    <button onClick={onSignIn} className="btn-custom-net">
                        <FontAwesomeIcon className="custom-icon" icon={['fab', 'google']} />
                        Войти через Google
                    </button>
                </div>
                <div className="container">
                    <Link to='/Registration' className="customLink" onClick={() => {
                        if(error) {
                            REMOVE_FAILURE();
                        }
                    }} >Зарегистрироваться</Link>
                    <div>Забыли пароль?</div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({loading, error, user}) => {
    return {
        loading,
        error,
        user
    }
};

const mapDispatchToProps = {
    FETCH_Authorization_REQUEST,
    FETCH_MESSAGES_FAILURE,
    REMOVE_FAILURE,
    FETCH_AuthorizationViaGoogle_REQUEST
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);