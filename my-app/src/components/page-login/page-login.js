import './page-login.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import {FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS} from "../../actions";
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

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

function PageLogin({ loading, error, FETCH_MESSAGES_REQUEST}) {
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
        <div className="PageLogin">
            <h1 className="TitleLogin">
                <FontAwesomeIcon className="icons" icon={faComments} />
                Chat</h1>
            <div className="containerForm">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Control
                        className={formik.touched.email && formik.errors.email ? "input inputError" : "input"}
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && formik.errors.email.length > 0 ? (
                        <div className="error" >{formik.errors.email}</div>
                    ) : null}
                    <Form.Control
                        className={formik.touched.password && formik.errors.password ? "input inputError" : "input"}
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <Button type="submit">Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin);