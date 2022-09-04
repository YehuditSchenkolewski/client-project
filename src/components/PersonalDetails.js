import React from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';

export default () => {
    const personalDetails = useSelector((state) => state.auth.personalDetails);
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img
                variant="top"
                src={personalDetails.avatar}
                alt="info-img" 
                />
            <Card.Body>
                <Card.Title><strong> Name:</strong> {personalDetails.name}</Card.Title>
                <Card.Text>
                    <strong> Team:</strong> {personalDetails.Team}
                </Card.Text>
                <Card.Text>
                    <strong> joinedAt:</strong> {personalDetails.joinedAt}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}