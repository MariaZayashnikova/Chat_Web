import './page-login.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import firebase from "firebase/app";
import "firebase/auth";

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

function PageLogin() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                    let user = userCredential.user;
                        console.log(user);
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                });
        },
    });
    return (
        <div className="PageLogin">
            <h1 className="TitleLogin">Chat</h1>
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

            </div>
        </div>
    );
}

export default PageLogin;