import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Categories.css"
import {inject, observer} from "mobx-react";
import {Button} from "react-bootstrap";
import AddButton from "../buttons/AddButton";
import CategoryAddingModal from "../modals/CategoryAddingModal";


const CategoriesPage = inject("categoriesStore", "authStore")(observer(({categoriesStore, authStore, ...props}) => {
    useEffect(
        () => {
            categoriesStore.loadCategories();
        },
        []
    )
    const navigate = useNavigateCustom();
    const [modalShow, setModalShow] = useState(false);

    const handleCategoryChoose = (category) =>
        navigate("/category/" + category.id)

    const handleAddCategoryButtonClick = () =>
        setModalShow(true);

    const handleCategoryAdd = (data) => {
        setModalShow(false);
        categoriesStore.createCategory(data.name, data.pictureUrl);
    }

    return (
        <PageWrapper>
            {authStore.currentUser.is_superuser ? <div className="mt-5">
                <AddButton onClick={handleAddCategoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <CategoriesTable categories={categoriesStore.categories} onChoose={handleCategoryChoose}/>
            </div>

            <CategoryAddingModal
                show={modalShow}
                onSubmit={handleCategoryAdd}
                onClose={() => setModalShow(false)}
            />
        </PageWrapper>
    );
}));


export default CategoriesPage;