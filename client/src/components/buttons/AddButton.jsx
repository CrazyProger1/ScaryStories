import React from 'react';
import "../../styles/Buttons.css"

const AddButton = ({onClick, ...props}) => {
    return (
        <div onClick={onClick} className="button-add d-flex justify-content-center align-items-center">
                <img
                    src={process.env.PUBLIC_URL + "/imgs/icons/add.png"}
                    alt=""
                />
        </div>
    );
};

export default AddButton;