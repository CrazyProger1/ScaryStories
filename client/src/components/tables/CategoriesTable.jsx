import React from 'react';
import {useNavigate} from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";


const CategoriesTable = ({categories, onChoose, ...props}) => {

    return (
        <div className="category-table mt-4">
            <div className="row">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onChoose={onChoose}/>
                ))}
            </div>
        </div>
    );
};

export default CategoriesTable;