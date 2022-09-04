import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { setEmailAndPass, setError } from '../redux/actions/auth.actions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import './Login.css';

export default ({ setMyEmail, setMyPassword }) => {
    const error = useSelector((state) => state.auth.error);

    const [loading, setLoading] = useState(false);
    const [showHidePassword, changeShowHidePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Required")
            .matches(/^[A-Za-z0-9@_.]+$/, "Only English letters").required("Required *"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/^[A-Za-z0-9]+$/, "Only latin letters and digits").required("Required *")
            .matches(/(?=.*\d)/, 'Password must contain at least 1 number'),
    });

    const handleLogin = (formValue) => {
        const { email, password } = formValue;
        dispatch(setError(''));
        setLoading(true);
        dispatch(setEmailAndPass(email, password, navigate));
        // setLoading(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({ dirty, isValid }) => (

                <Form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className="form-control" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <span className="hide-show-btn"
                            onClick={() => changeShowHidePassword(!showHidePassword)}>
                            {showHidePassword ? (<FaEye></FaEye>) : (<FaEyeSlash></FaEyeSlash>)}
                        </span>
                        <Field name="password" type={showHidePassword ? "text" : "password"}
                            className="form-control" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit"
                            // TODO: disable on loading -  || initialValues.email === "" || initialValues.password === ""
                            className={`${"btn btn-primary btn-block submit"} ${dirty && !isValid ? "disabled-button" : "enable-button"}`}
                            style={{ cursor: dirty && !isValid ? 'not-allowed' : 'pointer' }}
                            disabled={dirty && !isValid}>
                            {loading && !error && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {error && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}