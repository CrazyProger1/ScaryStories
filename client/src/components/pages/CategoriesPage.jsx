import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Categories.css"
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import CategoryCreateUpdateModal from "../modals/CategoryCreateUpdateModal";
import ErrorModal from "../modals/ErrorModal";
import QuestionModal from "../modals/QuestionModal";


const CategoriesPage = inject("categoriesStore", "authStore")(observer(({categoriesStore, authStore, ...props}) => {
    useEffect(
        () => {
            categoriesStore.readCategories();
        },
        []
    )
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigateCustom();


    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: ""});

    const [questionModalVisible, setQuestionModalVisible] = useState(false);

    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleCategoryChoose = (category) =>
        navigate("/category/" + category.id)


    const showError = (message) => {
        setErrorModalVisible(true);
        setErrorMessage(message);
    }


    const handleCategoryDeleteButtonClick = (category) => {
        setQuestionModalVisible(true);
        setCategoryToDelete(category);
    }


    const handleCategoryEditButtonClick = (category) => {
        setEditModalShow(true);
        setDefaultEditModalData({
            name: category.name,
            pictureUrl: category.picture_url,
            id: category.id
        });
    }


    const handleAddCategoryButtonClick = () =>
        setCreateModalShow(true);

    const handleCategoryAdd = (data) => {
        setCreateModalShow(false);
        categoriesStore.createCategory(data.name, data.pictureUrl).catch(error => {
            const response = error.response;
            if (response?.status === 403)
                showError(response.data.detail)

        });
    }

    const handleCategoryEdit = (data) => {
        setEditModalShow(false);
        categoriesStore.updateCategory(data.id, data.name, data.pictureUrl);
    }

    const handleDeleteCategory = () => {
        setQuestionModalVisible(false);
        if (categoryToDelete)
            categoriesStore.deleteCategory(categoryToDelete.id).catch(error => {
                const response = error.response;
                if (response?.status === 403)
                    showError(response.data.detail)
            })
    }

    return (
        <PageWrapper>
            {authStore.currentUser.is_superuser ? <div className="mt-5">
                <AddButton onClick={handleAddCategoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <CategoriesTable
                    categories={categoriesStore.categories}
                    onChoose={handleCategoryChoose}
                    onDelete={handleCategoryDeleteButtonClick}
                    onEdit={handleCategoryEditButtonClick}
                />
            </div>

            <CategoryCreateUpdateModal
                show={createModalShow}
                onSubmit={handleCategoryAdd}
                onClose={() => setCreateModalShow(false)}
                title="Category Creation"
                buttonText="Add"
            />

            <CategoryCreateUpdateModal
                defaultData={defaultEditModalData}
                show={editModalShow}
                onSubmit={handleCategoryEdit}
                onClose={() => setEditModalShow(false)}
                title="Category Edition"
                buttonText="Save"
            />
            <ErrorModal
                show={errorModalVisible}
                onClose={_ => setErrorModalVisible(false)}
                title="Error"
                message={errorMessage}
            />
            <QuestionModal
                show={questionModalVisible}
                onClose={_ => setQuestionModalVisible(false)}
                title="Category Deleting"
                message="Are you sure?"
                onContinue={handleDeleteCategory}
            />
        </PageWrapper>
    );
}));


export default CategoriesPage;