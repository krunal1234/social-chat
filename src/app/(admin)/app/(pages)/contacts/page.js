'use client'

import axios from 'axios';
import { Country }  from 'country-state-city';
import { 
  MDBTable, 
  MDBInput,
  MDBTableHead, 
  MDBTableBody, 
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBModalBody,
  MDBCard,
  MDBCardBody} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

const Contacts = () => {

  const [basicActive, setBasicActive] = useState('tab1');
  const [formData, setFormData] = useState({
    accountId: "",
    contactId: "",
    fullname: '',
    country: '',
    mobilenumber: '',
    email: '',
    status: 1,
    IsActive: 1,
    IsDeleted: 0
  });
  const [groupFormData, setGroupFormData] = useState({
    groupId: "",
    groupName: '',
    selectedContacts: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };


  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const [contactData, setcontactData] = useState([]);
  const [groupData, setgroupData] = useState([]);
  const [groupModal, setGroupModal] = useState(false);
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = (contact) => {
    setBasicModal(!basicModal)
    if (contact && contact.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactId: contact.id,
        fullname: contact.fullname,
        mobilenumber: contact.mobilenumber,
        email: contact.email,
        country: contact.country,
      }));
    } else{
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactId: "",
        fullname: "",
        mobilenumber: "",
        email: "",
        country: "",
      }));
    }
};
  const toggleGroupModal = (group) => {
    if (group && group.id) {
      setGroupFormData((prevGroupData) => ({
        ...prevGroupData,
        groupId: group.id,
        groupName: group.groupName,
        selectedContacts: group.selectedContacts
      }));
    }
    setGroupModal(!groupModal);

  };
  const closeModal = () => {
    setBasicModal(false);
  };
  
  const closeGroupModal = () => {
    setGroupModal(false);
  };
  const handleGroupFormSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic, e.g., API call
    try {
      if(groupFormData.groupId){
        const response = await axios.patch(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/groups' , {
          groupId: groupFormData.groupId,
          groupName: groupFormData.groupName,
          selectedContacts: groupFormData.selectedContacts
        });
        if(response.data.success){
          toast(response.data.message);
          fetchData();
        }else{
          toast(response.data.message)
        }
      }else{
        const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/groups', groupFormData);
        if(response.data.success){
          toast(response.data.message);
          fetchData();
        }else{
          toast(response.data.message)
        }
      }
      closeGroupModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleContactCheckboxChange = (contact, isChecked) => {
    if (isChecked) {
      // Add the contact to the selectedContacts state
      setGroupFormData(prevGroupData => ({
        ...prevGroupData,
        selectedContacts: [...prevGroupData.selectedContacts,{ value: contact.id, label: contact.fullname }]
      }));
    } else {
      // Remove the contact from the selectedContacts state
      setGroupFormData(prevGroupData => ({
        ...prevGroupData,
        selectedContacts: prevGroupData.selectedContacts.filter(selectedContact => 
          selectedContact.value !== contact.id
          )
      }));
    }
  };
  
   const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form submission logic, e.g., API call
    try {
      if(formData.contactId){
        const response = await axios.patch(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/contacts/', {
          fullname: formData.fullname,
          country: formData.country,
          mobilenumber: formData.mobilenumber,
          email: formData.email,
        });
        if(response.data.success){
          toast(response.data.message);
        }else{
          toast(response.data.message)
        }
        fetchData();
      }else{
        const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/contacts', formData);
        if(response.data.success){
         fetchData();
        }else{
          toast(response.data.message);
        }
      }
      closeModal();
      // Update state or perform any other necessary actions
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const deleteRecord = async (contactId) => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `/contacts`, {
        data : { "id" : contactId }
      });
      toast('Contact deleted successfully');
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const deleteGroupRecord = async (groupId) => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `/groups/`, {
        data : { "id" : groupId }
      });
      toast('Group deleted successfully');
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    phonecode: country.phonecode,
    value: country.isoCode,
    label: country.name,
  }));

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/contacts');
      if(response.data.data.length > 0){
        setcontactData(response.data.data);
      }
      const groupresponse = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/groups');
      if(groupresponse.data.data.length > 0){
        setgroupData(groupresponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/contacts');
        if(response.data.data.length > 0){
          setcontactData(response.data.data);
        }
        const groupresponse = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/groups');
        if(groupresponse.data.data.length > 0){
          setgroupData(groupresponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();

  }, [setcontactData, setgroupData]);

  return (
    <div className="container-fluid mt-3">
      <div className="text-end">
        <MDBBtn onClick={toggleOpen} className='ms-3'>Create Contact</MDBBtn>
        <MDBBtn onClick={toggleGroupModal} className='ms-3'>Create Group</MDBBtn>
      </div>
      
      {/* Modal for Create Contact */}
      <MDBModal open={basicModal} tabIndex='-1' toggle="false">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Contact</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => toggleOpen()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'none', border: '0' }}>
                  <MDBInput className='mb-4' type='hidden' name='accountId' value={formData.accountId} required onChange={handleInputChange} />
                  <MDBInput className='mb-4' type='hidden' name='contactId' value={formData.contactId} required onChange={handleInputChange} />
                </div>
                <MDBInput className='mb-4' type='text' name='fullname' value={formData.fullname} required label='Full Name' onChange={handleInputChange} />
                <Select
                  className='mb-4'
                  options={countryOptions}
                  isSearchable
                  label='Select Country'
                  name='country'
                  required
                  value={formData.country}
                  onChange={handleCountryChange}
                />
                <MDBInput className='mb-4' type='text' name='mobilenumber' value={formData.mobilenumber} required label='Mobile Number' onChange={handleInputChange} />
                <MDBInput className='mb-4' type='email' name='email' value={formData.email} label='Email' required onChange={handleInputChange} />
                <div className="d-flex justify-content-between">
                  <MDBBtn type='submit'>
                    Save
                  </MDBBtn>
                  <MDBBtn color='secondary' type="button" onClick={toggleOpen}>
                    Close
                  </MDBBtn>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  
      {/* Modal for Create Group */}
      <MDBModal open={groupModal} tabIndex='-1' toggle="false">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Group</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleGroupModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleGroupFormSubmit}>
                <MDBInput className='mb-4' type='text' name='groupName' value={groupFormData.groupName} required label='Group Name' onChange={(e) => setGroupFormData({ ...groupFormData, groupName: e.target.value })} />
                <Select
                  className='mb-4'
                  options={contactData.map(contact => ({ value: contact.id, label: contact.fullname }))}
                  isSearchable
                  isMulti
                  placeholder="Select Contacts"
                  required
                  value={groupFormData.selectedContacts}
                  onChange={(selectedOptions) => setGroupFormData({ ...groupFormData, selectedContacts: selectedOptions })}
                />
                <div className="d-flex justify-content-between">
                  <MDBBtn type='submit'>
                    Create Group
                  </MDBBtn>
                  <MDBBtn color='secondary' type="button" onClick={toggleGroupModal}>
                    Close
                  </MDBBtn>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
      <MDBCard className="card mt-3">
        <MDBCardBody className="card-body">
          <MDBTabs className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                Contacts
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                Groups
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          <MDBTabsContent>
            <MDBTabsPane open={basicActive === 'tab1'}>
              <div className="table-responsive">
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'></th>
                      <th scope='col'>#</th>
                      <th scope='col'>Full Name</th>
                      <th scope='col'>Country</th>
                      <th scope='col'>Mobile Number</th>
                      <th scope='col'>Email</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {Array.isArray(contactData) && contactData.length === 0 ? (
                      <tr>
                        <td colSpan="7" align="center">No data available</td>
                      </tr>
                    ) : (
                      contactData.map((contact, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" onChange={(e) => handleContactCheckboxChange(contact, e.target.checked)} />
                          </td>
                          <th scope='row'>{index + 1}</th>
                          <td>{contact.fullname}</td>
                          <td>{contact.country.label}</td>
                          <td>{contact.mobilenumber}</td>
                          <td>{contact.email}</td>
                          <td>
                            <MDBDropdown>
                              <MDBDropdownToggle>Action</MDBDropdownToggle>
                              <MDBDropdownMenu>
                                <MDBDropdownItem className="px-3 py-2" onClick={() => deleteRecord(contact.id)}>Delete</MDBDropdownItem>
                                <MDBDropdownItem className="px-3 py-2" onClick={() => toggleOpen(contact)}>Edit</MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                          </td>
                        </tr>
                      ))
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBTabsPane>
            <MDBTabsPane open={basicActive === 'tab2'}>
              <div className="table-responsive">
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Group Name</th>
                      <th scope='col'>Contacts</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {Array.isArray(groupData) && groupData.length === 0 ? (
                      <tr>
                        <td colSpan="4" align="center">No data available</td>
                      </tr>
                    ) : (
                      groupData.map((group, index) => (
                        <tr key={index}>
                          <th scope='row'>{index + 1}</th>
                          <td>{group.groupName}</td>
                          <td>{group.selectedContacts.length}</td>
                          <td>
                            <MDBDropdown>
                              <MDBDropdownToggle>Action</MDBDropdownToggle>
                              <MDBDropdownMenu>
                                <MDBDropdownItem className="px-3 py-2" onClick={() => deleteGroupRecord(group.id)}>Delete</MDBDropdownItem>
                                <MDBDropdownItem className="px-3 py-2" onClick={() => toggleGroupModal(group)}>Edit</MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                          </td>
                        </tr>
                      ))
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}


export default Contacts;
