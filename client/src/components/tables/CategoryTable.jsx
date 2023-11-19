import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {inject, observer} from "mobx-react";
import CategoryItem from "../items/CategoryItem";


const CategoryTable = inject("categoryStore")(observer(({categoryStore, ...props}) => {
    useEffect(
        () => {
            categoryStore.loadCategories()
        },
        []
    )

    const navigate = useNavigate();


    const categories = [
        {
            name: 'Abandoned Buildings',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
        },
        {
            name: 'Категория 2',
            image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
        },
        {
            name: 'Категория 3',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Категория 4',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Abandoned Buildings',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
        },
        {
            name: 'Категория 2',
            image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
        },
        {
            name: 'Категория 3',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Категория 4',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Abandoned Buildings',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
        },
        {
            name: 'Категория 2',
            image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
        },
        {
            name: 'Категория 3',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Категория 4',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Abandoned Buildings',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
        },
        {
            name: 'Категория 2',
            image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
        },
        {
            name: 'Категория 3',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
        {
            name: 'Категория 4',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        },
    ];

    const handleCategoryChoose = (category) => {
        navigate("/stories/" + category.name)
    }
    return (
        <div className="category-table mt-4">
            <div className="row">
                {categories.map((category) => (
                    <CategoryItem key={category.name} category={category} onChoose={handleCategoryChoose}/>
                ))}
            </div>
        </div>
    );
}));

export default CategoryTable;