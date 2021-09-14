import React from 'react';
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {validate} from "../AuthorizationPage/AuthorizationPage";
import {RESET_PASSWORD, REMOVE_FAILURE, FETCH_MESSAGES_SUCCESS} from "../../actions";
import {connect} from "react-redux";
import Spinner from "../Spinner/Spinner";
import './ResetPasswordPage.css';

function ResetPasswordPage({loadingFromState, errorFromState, RESET_PASSWORD, REMOVE_FAILURE, FETCH_MESSAGES_SUCCESS}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate
    });

    function submitResetForm(email) {
        if(errorFromState) {
            REMOVE_FAILURE();
        }

        RESET_PASSWORD(email);
    }

    return (
        <div className="Page">
            <h2 className="TitlePage" >Восстановить пароль</h2>
            <div className="containerForm">
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
                    <FormFeedback tooltip>
                        <div>{formik.errors.email}</div>
                    </FormFeedback>
                </FormGroup>
                <Button className="btn-custom" color="primary" type="submit" onClick={() => {
                        submitResetForm(formik.values.email);
                }} >Отправить ссылку для восстановления пароля</Button>
            </div>
            {loadingFromState === true ? (
                <Spinner/>
            ) : null }
            {loadingFromState.length > 5 ? (
                <div className="reset-success">{loadingFromState}</div>
            ) : null }
            {errorFromState ? (
                <div className="error">{errorFromState}</div>
            ) : null }
            <div className="containerLinks">
                <div className="container">
                    <Link to='/' className="customLink" onClick={() => {
                        if(errorFromState) {
                            REMOVE_FAILURE();
                        }
                        if(loadingFromState) {
                            FETCH_MESSAGES_SUCCESS();
                        }
                    }}>Войти</Link>
                    <Link to='/Registration' className="customLink" onClick={() => {
                        if(errorFromState) {
                            REMOVE_FAILURE();
                        }
                        if(loadingFromState) {
                            FETCH_MESSAGES_SUCCESS();
                        }
                    }}>Регистрация</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({loadingFromState, errorFromState}) => {
    return {
        loadingFromState,
        errorFromState
    }
};

const mapDispatchToProps = {
    RESET_PASSWORD,
    REMOVE_FAILURE,
    FETCH_MESSAGES_SUCCESS
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
