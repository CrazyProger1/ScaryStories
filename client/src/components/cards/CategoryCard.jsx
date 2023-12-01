import React, {useEffect, useState} from 'react';
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import {Stack} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import {PICTURE_NOT_AVAILABLE_SRC} from "../../constants/defaults";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import CategoryCreateUpdateModal from "../modals/CategoryCreateUpdateModal";
import ErrorModal from "../modals/ErrorModal";
import QuestionModal from "../modals/QuestionModal";

const CategoryCard = inject("authStore", "categoriesStore")(observer(
    ({
         authStore,
         categoriesStore,
         category,
         ...props
     }) => {


        const [pictureSrc, setPictureSrc] = useState(PICTURE_NOT_AVAILABLE_SRC);
        const [errorModalVisible, setErrorModalVisible] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
        const [editModalVisible, setEditModalVisible] = useState(false);
        const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: ""});
        const [questionModalVisible, setQuestionModalVisible] = useState(false);


        const navigate = useNavigateCustom();

        const {id, name, picture_url: pictureUrl} = category;

        useEffect(
            _ => {
                if (pictureUrl)
                    setPictureSrc(pictureUrl);
            },
            [pictureUrl]
        )

        const showError = (message) => {
            setErrorModalVisible(true);
            setErrorMessage(message);
        }

        const handleCategoryDelete = () => {
            setQuestionModalVisible(false);
            categoriesStore.deleteCategory(id).catch(error => {
                const response = error.response;
                if (response?.status === 403)
                    showError(response.data.detail)
            })
        }

        const handleCategoryEdit = (data) => {
            setEditModalVisible(false);
            categoriesStore.updateCategory(data.id, data.name, data.pictureUrl);
        }


        const handleImageError = () =>
            setPictureSrc(PICTURE_NOT_AVAILABLE_SRC);


        const handleStoryChoose = () => {
            if (!questionModalVisible && !editModalVisible && !errorModalVisible)
                navigate("/category/" + id)
        }

        const handleEditButtonClick = (event) => {
            event.stopPropagation();
            setEditModalVisible(true);
            setDefaultEditModalData({
                name: category.name,
                pictureUrl: category.picture_url,
                id: category.id
            });

        }

        const handleDeleteButtonClick = (event) => {
            event.stopPropagation();
            setQuestionModalVisible(true);
        }

        return (
            <div className="card category-card" style={{cursor: "pointer"}} onClick={handleStoryChoose}>
                <img src={pictureSrc}
                     className="card-img-top" alt={name} onErrorCapture={handleImageError}/>
                <div className="card-body card-img-overlay d-flex flex-column">
                    <h5 className="card-title category-card-title">{name}</h5>

                    {
                        authStore.isAuthorized && authStore.currentUser?.is_superuser ?
                            <Stack className="ms-auto mt-auto" direction="horizontal">
                                <EditButton onClick={handleEditButtonClick}/>
                                <DeleteButton onClick={handleDeleteButtonClick}/>
                            </Stack> : <div/>
                    }
                </div>
                <CategoryCreateUpdateModal
                    defaultData={defaultEditModalData}
                    show={editModalVisible}
                    onSubmit={handleCategoryEdit}
                    onClose={() => setEditModalVisible(false)}
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
                    onContinue={handleCategoryDelete}
                />
            </div>
        );
    }
));

export default CategoryCard;