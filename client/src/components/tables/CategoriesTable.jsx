import React from 'react';
import CategoryCard from "../cards/CategoryCard";


const CategoriesTable = ({categories, onChoose, onEdit, onDelete, ...props}) =>
    <div className="category-table">
        <div className="row">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onChoose={onChoose}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    </div>


export default CategoriesTable;