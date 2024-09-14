'use client'

import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import Select from 'react-select';


const CreateTemplate = () => {

    const [categoryData, setCategoryData] = useState([
        {
            id: "AUTHENTICATION",
            name: "AUTHENTICATION"
        },
        {
            id: "MARKETING",
            name: "MARKETING"
        },
        {
            id: "UTILITY",
            name: "UTILITY"
        }
    ]);
    const [headerData, setheaderData] = useState([
        {
            id: "1",
            name: "None"
        },
        {
            id: "2",
            name: "Text"
        },
        {
            id: "3",
            name: "File"
        }
    ]);
    const handleFormSubmit = () => {

    }

    const handleInputChange = () => {

    }
    const toggleOpen = () => {

    }

    const [formData, setFormData] = useState({
    });

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-8'>
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={handleFormSubmit}>
                                <MDBInput className='mb-4' type='text' name='name' value={formData.name} required label='Name' onChange={handleInputChange} />
                                <Select
                                    className="mb-4"
                                    options={categoryData.map(category => ({ value: category.id, label: category.name }))}
                                    isSearchable
                                    placeholder="Select Category"
                                    value={formData.category}
                                    required
                                />
                                <Select
                                    className="mb-4"
                                    options={headerData.map(header => ({ value: header.id, label: header.name }))}
                                    isSearchable
                                    placeholder="Header (Optional)"
                                    value={formData.category}
                                    required
                                />
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-4'></div>
                                        <div className='col-md-4'></div>
                                        <div className='col-md-4'></div>
                                    </div>
                                </div>
                                <MDBTextArea className='mb-4' type='text' name='body' value={formData.message} required label='Message' onChange={handleInputChange} />
                                <MDBInput className='mb-4' type='text' name='footer' value={formData.footer} required label='Footer (Optional)' onChange={handleInputChange} />
                                <MDBInput className='mb-4' type='text' name='LANGUAGE' value={formData.language} required label='Enter Language' onChange={handleInputChange} />
                                <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                                    <MDBBtn type='submit'>
                                        Save
                                    </MDBBtn>
                                    <MDBBtn color='secondary' type="button" onClick={toggleOpen}>
                                        Close
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    );
}

export default CreateTemplate;
