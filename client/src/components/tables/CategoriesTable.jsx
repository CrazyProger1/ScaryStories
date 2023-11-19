import React from 'react';
import {useNavigate} from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";


const categories = [
    {
        id: 1,
        name: 'Abandoned Buildings',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
    },
    {
        id: 2,
        name: 'Категория 2',
        image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
    },
    {
        id: 3,
        name: 'Категория 3',
        image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
    },
];

const CategoriesTable = () => {
    const navigate = useNavigate();

    const handleCategoryChoose = (category) =>
        navigate("/stories/" + category.id)


    return (
        <div className="category-table mt-4">
            <div className="row">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onChoose={handleCategoryChoose}/>
                ))}
            </div>
        </div>
    );
};

export default CategoriesTable;