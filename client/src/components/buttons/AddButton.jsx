import React from 'react';
import {Button} from "react-bootstrap";

const AddButton = ({onClick, ...props}) => {
    return (
        <div>
            <Button onClick={onClick}>
                +
            </Button>
        </div>
    );
};

export default AddButton;