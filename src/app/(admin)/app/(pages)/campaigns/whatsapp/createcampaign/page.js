'use client'
import {useState, useEffect} from 'react';
import {
  MDBInput,
  MDBRadio,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { ArrowLeft2 ,VideoCircle,Call } from 'iconsax-react';
import axios from 'axios';
import Select from 'react-select';
import TemplateCard from '../../../templates/card/page';
import Image from 'next/image';
import { createClient } from '../../../../../../../../utils/supabase/client';
import { toast } from 'react-toastify';
import { Router } from 'next/router';

const CreateCampaign = () => {
	let counterCases = 0;
	const [templateData, setTemplateData] = useState([]);
	const [selectedRadio, setSelectedRadio] = useState('flexRadioDefault2'); 
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(true);
	const [groupData, setgroupData] = useState([]);
	const [ContactData, setContactData] = useState([]);
	const [apicredential, setapicredential] = useState({
			business_id: "",
			access_token: "",
			phonenumberid: "",
	});
  	const [formData, setFormData] = useState({
		accessToken: "",
		fbappid: "",
		phonenumberid: "",
		CampaignName: "",
		CampaignOwnerName: "",
		FromNumber: "",
		Recipients: null,
		GroupRecipients : null,
		CampaignTemplateId:"",
		templateType: "",
		variableHeaderDynamicValue: "",
		Message: "",
		variableBodyDynamicValue: [],
		variableFileDynamicValue: [{
			fileId: "",
			filePath: ""
		}],
		variableButtonDynamicValue: {
			buttonUrlValue : "",
			buttonUrlOrigin: ""
		},
		variableFooterDynamicValue: "",
	});
	const [step1FormData, setStep1FormData] = useState({
		CampaignName: "",
		CampaignOwnerName: "",
		FromNumber: "",
	});
	const [step2FormData, setStep2FormData] = useState({
		buttonUrlValue: ""
	});
	const handleRadioChange = (e) => {
		setSelectedRadio(e.target.id);
		if(e.target.id === "flexRadioDefault3"){
			setFormData(prevFormData => ({
				...prevFormData,
				Recipients: null
			}));
		}else{
			setFormData((prevFormData) => {
				return {
					...prevFormData,
					Recipients : formData.Recipients 
				}
			});
		}
	};
	const handleCardClick = (templateId) => {
	setFormData({
		...formData,
		CampaignTemplateId: templateId,
	});
	};
	const handleInputFileChange = async (event) => {
		const avatarFile = event.target.files[0];
    
		if (!avatarFile) {
			console.error('No file selected');
			return;
		}
		// Example user ID (you would typically get this from your authentication system)
		const user = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/user');
		const userId = user.data.data[0].id;
		
		// Generate a unique file ID based on the current timestamp
		const timestamp = Date.now();
		const fileId = `${timestamp}-${avatarFile.name}`;
		
		// Construct the file path
		const filePath = `public/users/${userId}/${fileId}`;
		
		try {
			const supabase = createClient();
			const { data, error } = await supabase
				.storage
				.from('campaignFile')
				.upload(filePath, avatarFile, {
					cacheControl: '3600',
					upsert: false
				});
			
			if (error) {
				throw error;
			}

			setFormData((prevFormData) => {
				return {
					...prevFormData,
					variableFileDynamicValue: {
						fileId: data.id,
						filePath: data.fullPath
					},
				};
			});
			
			console.log('Upload successful:', data);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};
	const handleInputChange = (e, number) => {
		const { name, value } = e.target;
	

		// Update step 1 form data
		if (currentStep === 1) {
			setStep1FormData({
				...step1FormData,
				[name]: value,
			});

			setFormData({
				...formData,
				[name]: value,
			});
		}
	
		
	// Update variableBodyDynamicValue for dynamic dropdowns in BODY component
	if (currentStep === 2) {
		
		if(number){
			setFormData((prevFormData) => {
				const updatedVariableBodyDynamicValue = {
					...prevFormData.variableBodyDynamicValue,
					[number]: value,
				};

				return {
					...prevFormData,
					variableBodyDynamicValue: updatedVariableBodyDynamicValue,
				};
			});
		}

		setStep2FormData({
			...step2FormData,
			[name]: value,
		});

		setFormData((prevFormData) => {
			const updatedvariableButtonDynamicValue = {
				...prevFormData.variableButtonDynamicValue,
				[name]: value,
			};

			return {
				...prevFormData,
				variableButtonDynamicValue: updatedvariableButtonDynamicValue,
			};
		});
		
		let defaultURL;
		for (let component of templateSelected.components) {
			if(component.type === "BUTTONS"){
				for (let button of component.buttons) {
					if(button.type === "URL"){
						defaultURL = button.url.replace(/\{\{\d+\}\}/g, "");
					}
				}
			}
		}
		if(defaultURL){
			setFormData((prevFormData) => {
				const updatedvariableButtonDynamicValue = {
					...prevFormData.variableButtonDynamicValue,
					"buttonUrlOrigin": defaultURL,
				};
		
				return {
					...prevFormData,
					variableButtonDynamicValue: updatedvariableButtonDynamicValue,
				};
			});
		}
	}
	};
	const handlePrevStep = () => {
		setCurrentStep(currentStep - 1);
	};
	const isStepValid = (step) => {
	  switch (step) {
	    case 1:
	      const step1RequiredFields = ['CampaignName', 'CampaignTemplateId', 'CampaignOwnerName', 'FromNumber', 'Recipients'];
	      for (const field of step1RequiredFields) {
	        if (!formData[field]) {
	          // Field is empty, return false
	          return false;
	        }
	      }
	      return true;

		  case 2:
				
				let pattern = /\{\{\d+\}\}/;

				setFormData((prevFormData) => {
					return {
						...prevFormData,
						templateType: templateSelected.components[0].format,
					  };
				});

				// Check if any property value matches the pattern
				for (let component of templateSelected.components) {
					if(component.type === "HEADER"){
						if (formData.variableFileDynamicValue) {
							return templateSelected && templateSelected.components &&
								formData.variableFileDynamicValue &&
								Object.values(formData.variableFileDynamicValue).every(value => value.trim() !== '');
						} else{
							if(component.format === "TEXT"){
								return templateSelected && templateSelected.components
							}else{
								return templateSelected && templateSelected.components &&
								formData.variableFileDynamicValue
							}
						}
					}
					if(component.type === "BODY"){
						if (component.text && pattern.test(component.text)) {
							if (formData.variableBodyDynamicValue) {
								return templateSelected && templateSelected.components &&
									formData.variableBodyDynamicValue &&
									Object.values(formData.variableBodyDynamicValue).every(value => value.trim() !== '');
							} else{
								return templateSelected && templateSelected.components &&
									( formData.variableBodyDynamicValue || formData.variableFileDynamicValue )
							}
						}
					}
					if(component.type === "BUTTONS"){
						let hasExample = false;
						component.buttons.forEach((button) => {
							if(button.example){
								hasExample = true;	
							}
						})
						if(hasExample){
							return templateSelected && templateSelected.components &&
								formData.variableButtonDynamicValue &&
								Object.values(formData.variableButtonDynamicValue).every(value => value.trim() !== '');
						}
					}
				}

				return true

	    // Add more cases for additional steps if needed

	    default:
	      return true;
	  }
	};
	const handleNextStep = () => {
		if (!isStepValid(currentStep)) {
			// If the current step is not valid, show an alert and do not proceed
			toast.warn(`Please fill in all required fields in Step ${currentStep}.`);
			return;
		}

		// Move to the next step only if the current step is valid
		setCurrentStep(currentStep + 1);
	};
	const templateSelected = templateData.find(
		(template) => template.id === formData.CampaignTemplateId
	);
	const handleSubmit = async () => {
		// Handle form submission logic here
		console.log('Form submitted:', formData);
		const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/fb/sendCampaignMessage/', formData);
		if(response.data.data && response.data.response == 1){
			toast(response.data.message);
			setTimeout(function(){
				Router.push(`/app/campaigns/whatsapp`, "success");
			},2000);
		}else{
			toast.warn(response.data.message);
		}
		console.log('Form submitted successfully:', response.data);
	};
	const setSelectedGroups = (e) => {
		let selectedGroups = e;
		// Extract IDs of selected contacts from groupData
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				Recipients: selectedGroups
			}
		});
		if(selectedGroups && selectedGroups.length > 0){
			const selectedGroupData = groupData.filter(group => group.id === selectedGroups[0].id);
			const selectedContactIds = selectedGroupData.flatMap(
				group => group.selectedContacts.map(contact => contact.value)
			);
		
			// Filter recipientsData to find contacts with matching IDs
			const uniqueContacts = ContactData.filter(contact => selectedContactIds.includes(contact.id));
		
			// Set Recipients in formData with unique contacts
			setFormData(prevFormData => ({
			...prevFormData,
			Recipients: uniqueContacts
			}));
		}else{
			setFormData(prevFormData => ({
				...prevFormData,
				Recipients: null
			}));
		}
	};
	const getContact = async () => {
		const responsecontact = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/contacts');
		// Assuming the response.data is an array of contact objects
		let recipientsData;
		if (responsecontact.data.data.length > 0	) {
			recipientsData = responsecontact.data.data || null; // Set to an empty array if it's null or undefined
			setContactData(recipientsData);
		}
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				Recipients: recipientsData 
			}
		});
	}
	useEffect(() => {
	    // Call fetchData() only when the component mounts
	    const fetchData = async () => {
		    try {
	        setLoading(true);
		      const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/socialapi/whatsapp');
		      let templates;
			  let fbProfile;
		      if (response.data.data.length > 0) {
		        templates = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/fb/getTemplate/',
				{
					params : {
						business_id : response.data.data[0].business_id,
						accessToken : response.data.data[0].access_token
					}
				});

				fbProfile = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/fb/getProfile/',
					{
						params : {
							phoneid : response.data.data[0].phone_id,
							accessToken : response.data.data[0].access_token
						}
					});
		      }
		      getContact();
				if (response.data.data.length > 0) {
		      	setFormData({ accessToken: response.data.data[0].access_token, business_id: response.data.data[0].business_id, phonenumberid: response.data.data[0].phone_id , FromNumber : response.data.data[0].phone, CampaignOwnerName: fbProfile.data.data.verified_name });
		      }
			if(templates.data.data && templates.data.data.message_templates && templates.data.data.message_templates.data.length > 0){
	        	setTemplateData(templates.data.data.message_templates.data);
			}
			const groupresponse = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/groups');
			if(groupresponse.data.data.length > 0){
				setgroupData(groupresponse.data.data);
				console.log(JSON.stringify(groupresponse.data.data));
			}	
	        setapicredential({ business_id : response.data.data[0].business_id, access_token: response.data.data[0].access_token, phonenumberid: response.data.data[0].phone_id});
	        setLoading(false);
		    } catch (error) {
		      console.error('Error fetching data:', error);
		    }
	  };
	  fetchData();
	}, []);

	if (loading) {
		return <main className="p-6 h-screen flex-wrap flex items-center justify-center"><Image alt='loading' src='/loading.gif' width={40} height={40}/></main>
	  }

   	return (
	<div style={{ marginBottom : "80px"}}>
		{
			loading ? (
				<main className="p-6 h-screen flex-wrap flex items-center justify-center"><Image alt='loading' src='/loading.gif' width={40} height={40}/></main>
			) : (
			<div>
				{currentStep === 1 && (
					<div>
						<div className="container-fluid mt-3">
							<MDBCard className="mb-3">
							<MDBCardBody>
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-4">
										<MDBInput className="mb-4" type="text" style={{ backgroundColor : "#FFF"}} name='CampaignName' label='Camapign Name' value={step1FormData.CampaignName} onChange={handleInputChange} />
									</div>
									<div className="col-md-4">
										<MDBInput className="mb-4" type="text" style={{ backgroundColor : "#FFF"}} name='CampaignOwnerName' label='Camapign Owner Name' value={formData.CampaignOwnerName} onChange={handleInputChange} />
									</div>
									<div className="col-md-4">
										<MDBInput className="mb-4" disabled value={formData.FromNumber} type="text" style={{ backgroundColor : "#FFF"}} name='FromNumber' label='From Number' onChange={handleInputChange} />
									</div>
									<div className="col-md-4">
										<MDBRadio name='flexRadioDefault' id='flexRadioDefault2' label='All Contacts' checked={selectedRadio === 'flexRadioDefault2'} onChange={handleRadioChange} />
										<MDBRadio name='flexRadioDefault' id='flexRadioDefault3' label='Select Group' checked={selectedRadio === 'flexRadioDefault3'} onChange={handleRadioChange}/>
										{selectedRadio === 'flexRadioDefault3' && (
											<Select
												className="my-2"
												options={groupData.map((group) => ({ id: group.id, label: group.groupName }))}
												isSearchable
												isMulti
												placeholder="Select Contacts"
												value={formData.GroupRecipients}
												onChange={setSelectedGroups}
												required
											/>
										)}
									</div>
								</div>
							</div>
							</MDBCardBody>
							</MDBCard>
						</div>
						<div>
							<div className="container-fluid">
								<div className="row">
									{templateData.length === 0 ? (
										<div className="container-fluid mt-3">
											<MDBCard>
												<MDBCardBody>
														<div colSpan="6" align="center">
															No Template Available
														</div>
												</MDBCardBody>
											</MDBCard>
										</div>
									) : (
										templateData.filter((template) => template.status === 'APPROVED').map((template) => (
											<div key={template.id} className="col-md-3 mb-4" onClick={() => handleCardClick(template.id)}>
											<MDBCard className="h-100 shadow-demo-3 shadow-4-strong">
												<MDBCardBody>
												<div className="mb-3">
													<MDBRadio name='CampaignTemplateId' id={`radio-${template.id}`} value={template.id} checked={formData.CampaignTemplateId === template.id}
													onChange={() => handleCardClick(template.id)} />
												</div>
												<div><b>Template Name</b></div>
												<div className="mb-3 pb-2  border-bottom">{template.name}</div>
												<TemplateCard template={template} />
												</MDBCardBody>
											</MDBCard>
											</div>
										))
									)}
								</div>
							</div>
						</div>
						<div className="text-center buttonStep">
							<button className="btn btn-primary mx-3" onClick={handleNextStep}>Next</button>
						</div>
					</div>
				)}

				{currentStep === 2 && (
					<div>
						<div className="container-fluid mt-3">
							<div className="row">
								<div className="col-md-6">
									<div className="template-card">
										<div className="components">
											{
												templateSelected.components.map((component,index) => {
													switch (component.type) {
														case 'HEADER':
															counterCases++;
														return (
															<div key={index} className="mb-4">
																{component.format === 'VIDEO' && (
																	<div><h3> {counterCases}. File Upload </h3><MDBInput className="mb-4" type="file" accept=".mp4, .avi, .mkv" style={{ backgroundColor : "#FFF"}} name='variableFileDynamicValue' onChange={handleInputFileChange} /></div>
																)}
																{component.format === 'IMAGE' && (
																	<div><h3> {counterCases}. File Upload </h3><MDBInput className="mb-4" type="file" accept=".jpg, .jpeg, .png" style={{ backgroundColor : "#FFF"}} name='variableFileDynamicValue' onChange={handleInputFileChange} /></div>
																)}
																{component.format === 'DOCUMENT' && (
																	<div><h3> {counterCases}. File Upload </h3><MDBInput className="mb-4" type="file" accept=".doc, .docx, .pdf" style={{ backgroundColor : "#FFF"}} name='variableFileDynamicValue' onChange={handleInputFileChange} /></div>
																)}
																{component.format === 'TEXT' && (
																	<div><h3> {counterCases} Heading </h3><b>{component.text}</b></div>
																)}
															</div>
														);

														case 'BODY':
															counterCases++;
														return (
															<div key={index}>
																<div><h3> {counterCases}. Body </h3></div>
															<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
															{component.text.split(/(\{\{\d+\}\})/).map((part, partIndex) => {
																const match = part.match(/\{\{(\d+)\}\}/);
																if (match) {
																	const number = match[1];
																	const value = formData.variableBodyDynamicValue?.[number] || ''; // Use optional chaining
																	return (
																	<select
																		key={partIndex}
																		className="form-select"
																		value={value}
																		name={`variableBodyDynamicValue[${number}]`}
																		onChange={(e) => handleInputChange(e, number)}
																	>
																		<option value="">Please Select</option>
																		<option value="fullname">fullname</option>
																		<option value="country">country</option>
																		<option value="Email">Email</option>
																		<option value="MobileNumber">MobileNumber</option>
																	</select>
																	);
																} else {
																	// Regular text, render as-is
																	return <span key={partIndex}>{part}</span>;
																}
																})}
															</div>
														</div>
														);

														case 'FOOTER': // Corrected the case for 'FOOTER'
														return (
															<div key={index}><p><b>{component.text}</b></p></div>
														)
														case 'BUTTONS':
															counterCases++;
														return (
															<div key={index} className="my-4">
																<div>
																	{component.buttons && component.buttons.map((button, buttonIndex) => {
																		if (button.example) {
																			switch (button.type) {
																				case 'URL':
																					return (
																						<div key={buttonIndex}>
																							<div><h3> {counterCases}. Buttons </h3></div>
																							{button.url.replace(/\{\{\d+\}\}/g, "")}<MDBInput className="mb-4" type="text" label="Enter Dynamic URL" style={{ backgroundColor: "#FFF" }} value={step2FormData.buttonUrlValue} name='buttonUrlValue' onChange={handleInputChange} />
																						</div>
																					);
																				default:
																					return null;
																			}
																		} else {
																			return null;
																		}
																	})}

															</div>
															</div>
														)
														default:
														return null;
													}
												})}
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<MDBCard style={{ backgroundImage : "url('https://app.growby.net/img/mobile-bg.png')", "overflow" : "hidden", maxWidth : "340px", "height" : "550px"}}>
									<MDBCardBody className="p-0">
									<div className="container-fluid h-100">
										<div className="row bg-white p-2 justify-content-center align-items-center">
											<div className="col-auto"><ArrowLeft2 size="24" color="#333"/> 12</div>
											<div className="col-auto"><div className="rounded-circle logoPreview">Logo</div></div> 
											<div className="col">Growby</div>
											<div className="col-auto"><VideoCircle size="24" color="#333"/></div>
											<div className="col-auto"><Call size="24" color="#333"/></div>
										</div>
										<div className="row p-2">
											<MDBCard style={{ maxWidth : "80%"}}>
												<MDBCardBody className="p-0">
													<TemplateCard template={templateSelected} />
												</MDBCardBody>
											</MDBCard>
										</div>
										</div>
									</MDBCardBody>
									</MDBCard>
								</div>
							</div>
						</div>
						<div className="text-center buttonStep">
							<button className="btn btn-primary" onClick={handlePrevStep}>Previous</button>
							<button className="btn btn-primary mx-3" onClick={handleNextStep}>Next</button>
						</div>
					</div>
				)}

				{currentStep === 3 && (
							<div>
								<div className="p-3">
									<MDBCard>
										<MDBCardBody>
											<div className="container-fluid mt-3">
												<div className="row">
													<div className="col-md-6">
														<div className="pb-5">
															<h4> Campaign Name</h4>
															<p>{formData.CampaignName}</p>
														</div>
														<div className="pb-5">
															<h4>Campaign Owner Name</h4>
															<p>{formData.CampaignOwnerName}</p>
														</div>
														<div className="pb-5">
															<h4>Form Number</h4>
															<p>{formData.FromNumber}</p>
														</div>
														<div className="pb-5">
															<h4>Recipients Numbers</h4>
															<p>{formData.Recipients.length}</p>
														</div>
													</div>
													<div className="col-md-6">
															<MDBCard style={{ backgroundImage : "url('https://app.growby.net/img/mobile-bg.png')", "overflow" : "hidden", maxWidth : "340px", "height" : "550px"}}>
																<MDBCardBody className="p-0">
																<div className="container-fluid">
																	<div className="row bg-white p-2 justify-content-center align-items-center">
																		<div className="col-auto"><ArrowLeft2 size="24" color="#333"/> 12</div>
																		<div className="col-auto"><div className="rounded-circle logoPreview">Logo</div></div> 
																		<div className="col">Growby</div>
																		<div className="col-auto"><VideoCircle size="24" color="#333"/></div>
																		<div className="col-auto"><Call size="24" color="#333"/></div>
																	</div>
																	<div className="row p-2">
																		<MDBCard style={{ maxWidth : "80%"}}>
																			<MDBCardBody className="p-0">
																				<TemplateCard template={templateSelected} />
																			</MDBCardBody>
																		</MDBCard>
																	</div>
																	</div>
																</MDBCardBody>
															</MDBCard>
														</div>
												</div>
											</div>
										</MDBCardBody>
									</MDBCard>
								</div>
								<div className="text-center buttonStep">
									<button className="btn btn-primary" onClick={handlePrevStep}>Previous</button>
									<button className="btn btn-primary mx-3" onClick={handleSubmit}>Submit</button>
								</div>
							</div>
				)}
			</div>
			)
		}
	</div>
	)
}

export default CreateCampaign;
