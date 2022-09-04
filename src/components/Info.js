import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from '../redux/actions/project.action';
import PersonalDetails from "./PersonalDetails";
import ProjectDetails from "./ProjectDetails";

const Info = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    return (
        <div className="container info-wrapper">
            <PersonalDetails />
            <div className="col-md">
                <ProjectDetails />
            </div>
        </div>
    );
};

export default Info;