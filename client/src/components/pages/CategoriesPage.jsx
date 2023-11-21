import React from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Categories.css"

const categories = [
    {
        id: 1,
        name: 'Abandoned Buildings',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
    },
    {
        id: 2,
        name: 'Category 2',
        image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
    },
    {
        id: 3,
        name: 'Category 3',
        image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
    },
];


const CategoriesPage = () => {
    const navigate = useNavigateCustom();

    const handleCategoryChoose = (category) =>
        navigate("/category/" + category.id)

    return (
        <PageWrapper>
            <div className="mt-5">
                <CategoriesTable categories={categories} onChoose={handleCategoryChoose}/>
            </div>
        </PageWrapper>
    );
};


export default CategoriesPage;