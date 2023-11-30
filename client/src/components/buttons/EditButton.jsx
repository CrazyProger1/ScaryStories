import React from 'react';
import {BiSolidPencil} from "react-icons/bi";

const EditButton = ({onClick, ...props}) => {
    return (
        <div>
            <BiSolidPencil className="button-icon-edit"  onClick={onClick}/>
        </div>
    );
};

export default EditButton;