import React from 'react';
import CategoryCard from "../cards/CategoryCard";
import {observer} from "mobx-react";


const CategoriesTable = observer(({categories, ...props}) =>
    <div className="category-table">
        <div className="row">
            {categories.map((category) => (
                <div className="col-md-4 mb-4">
                    <CategoryCard
                        key={category.id}
                        category={category}
                    />
                </div>
            ))}
        </div>
    </div>)


export default CategoriesTable;