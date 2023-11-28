import React, {useState} from 'react';

const CategoryCard = ({category, onChoose, ...props}) => {
    const {name, picture_url: pictureUrl} = category;
    const [picSrc, setPicSrc] = useState(pictureUrl);

    const handleImageError = () =>
        setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/picture.jpg');


    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(category)}>
            <div className="card category-card">
                <img src={picSrc}
                     className="card-img-top" alt={name} onErrorCapture={handleImageError}/>
                <div className="card-body card-img-overlay">
                    <h5 className="card-title category-card-title">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;