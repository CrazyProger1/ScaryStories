import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";

const StoryAddingForm = ({formData, onFormDataChange, onSetValidity, onSubmit, ...props}) => {
    const {name, story} = formData;
    const [errors, setErrors] = useState({
        name: "",
        story: ""
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


    const validate = () => {
        onSetValidity(!errors.story && !errors.name)
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

            <Form.Group controlId="formStory">
                <Form.Label>Story</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="15"
                    type="text"
                    placeholder="Text"
                    name="story"
                    value={story}
                    onChange={handleStoryChange}
                />
            </Form.Group>
        </Form>
    );
};

export default StoryAddingForm;