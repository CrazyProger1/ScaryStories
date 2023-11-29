import React, {useState} from 'react';
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import {Stack} from "react-bootstrap";
import {inject, observer} from "mobx-react";

const CategoryCard = inject("authStore", "categoriesStore")(observer(({
                                                                          authStore,
                                                                          categoriesStore,
                                                                          category,
                                                                          onChoose,
                                                                          ...props
                                                                      }) => {
        const {id, name, picture_url: pictureUrl} = category;
        const [picSrc, setPicSrc] = useState(pictureUrl);


        const handleImageError = () =>
            setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/picture.jpg');

        const handleEditButtonClick = (event) => {
            event.stopPropagation();
        }

        const handleDeleteButtonClick = (event) => {
            event.stopPropagation();
            categoriesStore.deleteCategory(id);
        }

        return (
            <div className="col-md-4 mb-4" onClick={() => onChoose(category)}>
                <div className="card category-card">
                    <img src={picSrc}
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
                </div>
            </div>
        );
    }
));

export default CategoryCard;