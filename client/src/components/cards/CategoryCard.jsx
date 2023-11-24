import React from 'react';

const CategoryCard = ({category, onChoose, ...props}) => {
    const {name, picture_url} = category;

    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(category)}>
            <div className="card category-card">
                <img src={picture_url} className="card-img-top" alt={name}/>
                <div className="card-body card-img-overlay">
                    <h5 className="card-title category-card-title">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;