'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import Link from 'next/link';
import TemplateCard from '../card/page';

const Template = () => {
  const [templateData, setTemplateData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/socialapi/whatsapp');
debugger;
      if (response.data.data.length > 0) {
        const templates = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/fb/getTemplate/',
        {
          params : {
            business_id : response.data.data[0].business_id,
            accessToken : response.data.data[0].access_token
          }
        });
        setTemplateData(templates.data.data.message_templates.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  
    return (
      <div className="m-2">
        <div className="container-fluid">
        <div className="text-end mb-3">
          <Link href="/template/create-template"><MDBBtn>Create Template</MDBBtn></Link>
        </div>
          <div className='row mb-3'>
            <div className='col-4'><div className='p-3 green-card card'><b>APPROVED Template</b></div></div>
            <div className='col-4'><div className='p-3 red-card card'><b>Rejected Template</b></div></div>
            <div className='col-4'><div className='p-3 yellow-card card'><b>PENDING Template</b></div></div>
          </div>
          <div className="row">
            {templateData.length === 0 ? (
              <div className='container-fluid'>
                <div className="card">
                  <div className="card-body">
                    <div colSpan="6" align="center">
                      No Template Available
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              templateData.map((template) => (
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4" key={template.id}>
                  <div className={template.status === "APPROVED" ? 'green-card card h-100' : template.status === "REJECTED" ? 'red-card card h-100' : template.status === "PENDING" ? 'yellow-card card h-100' : null}>
                    <div className="card-body"> 
                      <div><b>Template Name</b></div>
                      <div className="mb-3 pb-2  border-bottom">{template.name}</div>
                      <TemplateCard template={template} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );

};

export default Template;
