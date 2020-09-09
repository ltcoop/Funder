import React from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
	Link,
    Route,
    useParams,
	withRouter
} from "react-router-dom";
import { formatMoney } from './Utils.js';
import '../App.css';

const API_URL = 'http://www.opensecrets.org/api/?method=orgSummary&id=&output=json&apikey=86908699e797033be391e97022f5d9d8';

class OrganizationProfile extends React.Component {
  constructor(props) {
	super(props);	
	
  }  
  
  state = {
   org: {
	   response: {
		   organization: { }
	   }
   }	   
  }  
 
   componentDidMount() {
    this.callApi();  
  } 
  
  callApi = event => {
	//event.preventDefault();
	//alert(this.props.location.state.orgid);
	var tmpUrl = `${API_URL}`;
    const url = tmpUrl.replace(/&id=/, "&id=" + this.props.location.state.orgid);
	
	
     axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ org: data })
      console.log(this.state.org)
     })
  }
  
  render() { 
     
    return ( 
      
	   <div>	
	      <div className="container">
            <div className="col-xs-9">
			 
             <Row className="row-margin-10">
			 
               <Col md={{ span: 8, offset: 1}}>		
                <Card bg="light" style={{width: "50rem"}}>
		          <Card.Body>Shows Incoming Money raised and Outgoing Money spent by Business/Organization
				  through Fundraising 				  
                  </Card.Body>		  				
	            </Card>
			   </Col>
			 </Row>	
                <Row className="row-margin-10">		
                 <Col md={{ span: 8, offset: 1}}>					
		           <h1>2020 Business/Organization Fundraising Summary </h1>
				 </Col>
			    </Row>
				
                 <div>	
		           { Object.keys(this.state.org.response.organization).length > 0 ?	
				     <Row className="row-margin-10">
					 <Col md={{ span: 8, offset: 1}}>	
		  	         <Card>
					   <Card.Header>
					     <h5>{this.state.org.response.organization["@attributes"].orgname}</h5>
					     <h6># of Members Invested in Business/Organization: {this.state.org.response.organization["@attributes"].mems_invested}</h6>
					   </Card.Header>
				       <Card.Body>
				         <Card.Title></Card.Title>
						   <table class="w-120">	
                            <thead>
                              <tr>
							    <th>Total Incoming Money</th>
								<th>Total Outgoing Money</th>								
							  </tr>
                            </thead>						  
		                    <tbody>
							 <td width="40%">
                               <br />							 
                               <tr>                                 							 
						           
						           <h6>From PAC's: {formatMoney(this.state.org.response.organization["@attributes"].pacs)}</h6>
								   <h6>From 527's: {formatMoney(this.state.org.response.organization["@attributes"].tot527)}</h6>
								   <h6>From Individuals: {formatMoney(this.state.org.response.organization["@attributes"].indivs)}</h6>
								   <h6>Soft Money: {formatMoney(this.state.org.response.organization["@attributes"].soft)}</h6>
						           					         
							  </tr>
							  						      
                             </td>							
						     
						     <td width="33%">						       
						       <tr>
						           <br />
						           <h6>To PAC's: {formatMoney(this.state.org.response.organization["@attributes"].gave_to_pac)}</h6>
							       <h6>To 527's: {formatMoney(this.state.org.response.organization["@attributes"].gave_to_527)}</h6>
							       <h6>To Party: {formatMoney(this.state.org.response.organization["@attributes"].gave_to_party)}</h6>
							       <h6>To Candidate: {formatMoney(this.state.org.response.organization["@attributes"].gave_to_cand)}</h6>								 
							   </tr>
                             </td>
                             <td>
                               <tr>							 
						           <h6>To Democrats: {formatMoney(this.state.org.response.organization["@attributes"].dems)}</h6>
						           <h6>To Republicans: {formatMoney(this.state.org.response.organization["@attributes"].repubs)}</h6>
                                 
						       </tr>	       
						     </td>                             						  
						 </tbody>
						 </table>
				       </Card.Body>
					   <Card.Footer>
					     <h6>Total Contributions: {formatMoney(this.state.org.response.organization["@attributes"].total)}</h6>
								   
					   </Card.Footer>
					</Card>	  
					</Col>
					</Row>
			       : " "} 		 	
             	</div>
				{/*
			   </Col>
				</Row> */}
			 
		    </div>
		  </div>
		</div>       
	 );
  }  
}


export default withRouter(OrganizationProfile);
