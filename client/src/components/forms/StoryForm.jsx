import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {validateStory} from "../../utils/validators/stories";
import {validatePictureUrl, validateName} from "../../utils/validators/common";

const StoryForm = ({formData, onFormDataChange, onSetValidity, onSubmit, ...props}) => {
    const {name, story, pictureUrl} = formData;
    const [errors, setErrors] = useState({
        name: "",
        story: "",
        pictureUrl: ""
    });

    useEffect(
        () => {
            validate();
        },
        [formData]
    )

    const handleNameChange = (e) =>
        onFormDataChange({
            ...formData,
            name: e.target.value
        })

    const handleStoryChange = (e) =>
        onFormDataChange({
            ...formData,
            story: e.target.value
        })

    const handleUrlChange = (e) =>
        onFormDataChange({
            ...formData,
            pictureUrl: e.target.value
        })


    const validate = () => {
        let newErrors = {
            name: "",
            story: "",
            pictureUrl: ""
        }
        if (!validateName(name)) {
            if (!name) newErrors.name = "Name can't be empty";
            else newErrors.name = "Maximum name length is 50 characters"
        }


        if (!validatePictureUrl(pictureUrl))
            newErrors.pictureUrl = "URL is not valid";

        if (!validateStory(story))
            newErrors.story = "Story can't be empty";


        onSetValidity(!newErrors.story && !newErrors.name && !newErrors.pictureUrl);
        setErrors(newErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit)
            onSubmit();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    isInvalid={!!errors.name}
                    isValid={!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPictureUrl">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                    type="url"
                    placeholder="URL"
                    name="url"
                    value={pictureUrl}
                    onChange={handleUrlChange}
                    isInvalid={!!errors.pictureUrl}
                    isValid={!errors.pictureUrl}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.pictureUrl}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formStory">
                <Form.Label>Story</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="15"
                    type="text"
                    placeholder="Text"
                    name="story"
                    value={story}
                    isInvalid={!!errors.story}
                    isValid={!errors.story}
                    onChange={handleStoryChange}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.story}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

export default StoryForm;