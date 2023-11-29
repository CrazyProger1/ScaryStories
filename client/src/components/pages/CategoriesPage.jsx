import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import CategoriesTable from "../tables/CategoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import "../../styles/Categories.css"
import {inject, observer} from "mobx-react";
import {Button} from "react-bootstrap";
import AddButton from "../buttons/AddButton";
import CategoryCreateUpdateModal from "../modals/CategoryCreateUpdateModal";


const CategoriesPage = inject("categoriesStore", "authStore")(observer(({categoriesStore, authStore, ...props}) => {
    useEffect(
        () => {
            categoriesStore.loadCategories();
        },
        []
    )
    const navigate = useNavigateCustom();
    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: ""});

    const handleCategoryChoose = (category) =>
        navigate("/category/" + category.id)


    const handleCategoryDeleteButtonClick = (category) => {
        categoriesStore.deleteCategory(category.id)
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
        categoriesStore.createCategory(data.name, data.pictureUrl);
    }

    const handleCategoryEdit = (data) => {
        setEditModalShow(false);
        categoriesStore.updateCategory(data.id, data.name, data.pictureUrl);
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
        </PageWrapper>
    );
}));


export default CategoriesPage;