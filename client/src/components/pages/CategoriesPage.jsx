import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import "../../styles/Categories.css"
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import CategoryCreateUpdateModal from "../modals/CategoryCreateUpdateModal";
import ErrorModal from "../modals/ErrorModal";

const CategoriesPage = inject("categoriesStore", "authStore")(observer(({categoriesStore, authStore, ...props}) => {
    useEffect(
        () => {
            categoriesStore.readCategories();
        },
        []
    )


    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const showError = (message) => {
        setErrorModalVisible(true);
        setErrorMessage(message);
    }


    const handleAddCategoryButtonClick = () =>
        setCreateModalVisible(true);

    const handleCategoryAdd = (data) => {
        setCreateModalVisible(false);
        categoriesStore.createCategory(data.name, data.pictureUrl).catch(error => {
            const response = error.response;
            if (response?.status === 403)
                showError(response.data.detail)

        });
    }


    return (
        <PageWrapper>
            {authStore.currentUser.is_superuser ? <div className="mt-5">
                <AddButton onClick={handleAddCategoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <CategoriesTable
                    categories={categoriesStore.categories}
                />
            </div>

            <ErrorModal
                show={errorModalVisible}
                onClose={_ => setErrorModalVisible(false)}
                title="Error"
                message={errorMessage}
            />
            <CategoryCreateUpdateModal
                show={createModalVisible}
                onSubmit={handleCategoryAdd}
                onClose={() => setCreateModalVisible(false)}
                title="Category Creation"
                buttonText="Add"
            />


        </PageWrapper>
    );
}));


export default CategoriesPage;