import React from 'react';
import CategoryCard from "../cards/CategoryCard";


const CategoriesTable = ({categories, onChoose, onEdit, onDelete, ...props}) =>
    <div className="category-table">
        <div className="row">
            {categories.map((category) => (
                <div className="col-md-4 mb-4">
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onChoose={onChoose}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    </div>


export default CategoriesTable;