import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/actions/auth.actions";
import * as AuthService from "../services/auth.services";
import { useNavigate } from 'react-router-dom'

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
        dispatch(logOut(false));
        navigate('/login');
    }, []);

    return (
        <div>Loader</div>
    )
}