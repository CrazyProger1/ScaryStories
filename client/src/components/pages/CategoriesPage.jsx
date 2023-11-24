import React, {useEffect} from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Categories.css"
import {inject, observer} from "mobx-react";


const CategoriesPage = inject("categoriesStore")(observer(({categoriesStore, ...props}) => {
    useEffect(
        () => {
            categoriesStore.loadCategories();
        },
        []
    )
    const navigate = useNavigateCustom();

    const handleCategoryChoose = (category) =>
        navigate("/category/" + category.id)

    return (
        <PageWrapper>
            <div className="mt-5">
                <CategoriesTable categories={categoriesStore.categories} onChoose={handleCategoryChoose}/>
            </div>
        </PageWrapper>
    );
}));


export default CategoriesPage;