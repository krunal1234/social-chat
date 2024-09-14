'use client'
import { useEffect, useState } from 'react';
import { 
  MDBTable, 
  MDBTableHead, 
  MDBTableBody, 
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Link from 'next/link';

const Campaigns = () => {
    const [campaignData, setcampaignData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/campaigns');
            // Assuming the response.data is an array of campaign objects
            if(response.data.data.length > 0){
                setcampaignData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="m-2">
        <div className="text-end">
            <Link href="/app/campaigns/whatsapp/createcampaign" className="btn btn-primary my-3">Create Campaign</Link>
          </div>
            <div className="card">
                <div className="card-body"> 
                    <MDBTable>
                        <MDBTableHead>
                          <tr>
                            <th scope='col'>Campaigns name</th>
                            <th scope='col'>Created date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Contacts</th>
                            <th scope='col'>Sent</th>
                            <th scope='col'>Failed</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {Array.isArray(campaignData) && campaignData.length === 0 ? (
                          <tr>
                            <td colSpan="6" align="center">No data available</td>
                          </tr>
                        ) : (
                          campaignData.map((contact, index) => (
                            <tr key={index}>
                              <td>{contact.CampaignName}</td>
                              <td>{formatDateTime(contact.created_at)}</td>
                              <td>{contact.Status}</td>
                              <td>{contact.RecipientsIds.length}</td>
                              <td>{contact.TotalSent}</td>
                              <td>{contact.TotalFail}</td>
                            </tr>
                          ))
                        )}
                        </MDBTableBody>
                      </MDBTable>
                </div>
            </div>
        </div>
    )
}



export default Campaigns;