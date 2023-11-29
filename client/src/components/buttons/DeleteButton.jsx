import React from 'react';
import {BiSolidPencil, BiSolidTrash} from "react-icons/bi";

const DeleteButton = ({onClick, ...props}) => {
    return (
        <div>
            <BiSolidTrash color="#800000" onClick={onClick} style={{cursor: "pointer"}}/>
        </div>
    );
};

export default DeleteButton;