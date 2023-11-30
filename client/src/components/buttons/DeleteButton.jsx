import React from 'react';
import {BiSolidPencil, BiSolidTrash} from "react-icons/bi";
import "../../styles/Buttons.css"

const DeleteButton = ({onClick, ...props}) => {
    return (
        <div>
            <BiSolidTrash className="button-icon-delete" onClick={onClick}/>
        </div>
    );
};

export default DeleteButton;