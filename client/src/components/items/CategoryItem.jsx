import React from 'react';
import "../../styles/Categories.css"

const CategoryItem = ({category, onChoose, ...props}) => {
    const {name, image} = category;
    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(category)}>
            <div className="card category-card">
                <img src={image} className="card-img-top category-card-img" alt={name}/>
                <div className="card-body card-img-overlay">
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;