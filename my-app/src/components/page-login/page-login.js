import './page-login.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';

function PageLogin() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className="PageLogin">
            <h1 className="TitleLogin">Chat</h1>
            <div className="containerForm">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Control
                        className="input"
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <Form.Control
                        className="input"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <Button type="submit" variant="outline-primary" size="lg">Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default PageLogin;