import React from 'react';
import {BiSolidPencil} from "react-icons/bi";

const EditButton = ({onClick, ...props}) => {
    return (
        <div>
            <BiSolidPencil color="#212529" onClick={onClick} style={{cursor: "pointer"}}/>
        </div>
    );
};

export default EditButton;