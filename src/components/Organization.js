import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
	Link,
    Route,
    useParams,
	withRouter
} from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap'
import OrganizationProfile from './OrganizationProfile';
import ShowError from './ShowError';
import '../App.css';

const myKey = '86908699e797033be391e97022f5d9d8'

const API_URL = 'https://www.opensecrets.org/api/?method=getOrgs&org=&output=json&apikey=' + myKey;

class Organization extends React.Component {
  constructor() {
	super();
    this.handleInputChange = this.handleInputChange.bind(this);	
  }

  state = {
    orgs: { 	
	  response: {		  
		  organization: []		  
	  }
	},
	
	orgInput: '',
	
	apiError: false,
	
	showHideOrgParent: true,
	showHideOrgProfile: false
  }
  
  showComponent(showComp) {
	  
	  this.setState({showHideOrgParent: showComp === "showHideOrgParent" ? true : false });
	  
	  this.setState({showHideOrgProfile: showComp === "showHideOrgProfile" ? true : false });  
	  
  }
  
  
  handleInputChange = event => {
	  //this.setState({orgs: {}});
	  this.setState({orgInput: event.target.value });
  }
  	
  
  callApi = event => {
	event.preventDefault();
	
	var tmpUrl = `${API_URL}`;
    const url = tmpUrl.replace(/&org=/, "&org=" + this.state.orgInput);
	
	
    axios.get(url).then(response => response.data)
    .then((data) => {	  
      this.setState({ orgs: data })	  
      console.log(this.state.orgs)
     })
	.catch(err => {
	  this.setState({orgs: {}});
	  console.log(err);
	  this.setState({apiError: true})
	})
  }
  
  render() {
	
	
	
    return (
	
    <>
	{this.state.apiError && <ShowError errmsg="Enter Business or Organization name ie) Apple " showModal="true" /> } 
     
     
	<Router>
	{ this.state.showHideOrgParent ?
      <div className="container">
        <div className="col-xs-10">
		  <Card bg="light" style={{width: "50rem"}}>
		    <Card.Body>Search for a Business or Organization to see how
			           their Fundraising money is allocated. 
			</Card.Body>		  				
	      </Card>  
		
		  <Row className="row row-margin-20">
		    <Col className="col-10">
              <h1>Total Fundraising for Business or Organization</h1>
			</Col>
		  </Row>
		  
		 <Row className="row row-margin-20">
		   <Col>
		     <label>Business or Organization Name</label>
		   </Col>
		 </Row>
		 
		 <Row>
		   <Col>
		     <input type="text"
		        name="orgInput"
				placeholder="partial or full name"
			    value={this.state.orgInput}
		        onChange={this.handleInputChange} />
		   </Col>
		 </Row>
		 <br />
		 <Row>
		   <Col>
	         <button onClick={this.callApi}>Submit</button>
		   </Col>
		 </Row>
		   <br />
	    
		<br />
        { this.state.orgs.response !== undefined &&
          this.state.orgs.response.organization.length > 0 ?
		  
  		  this.state.orgs.response.organization.map((org) => (
          <div className="card">
           <div className="card-body">
               <h5 className="card-title">{org["@attributes"].orgname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">			  
			   <Link to={{
					  pathname: '/OrganizationProfile',
					  state: {						  
					    orgid:  org["@attributes"].orgid,
						test: "Hello"
					  }
				  }}><span onClick={ () => this.showComponent("showHideOrgProfile")}>Fundraising Profile</span></Link>
              </h6>
            </div>
          </div>
        ))
         :		
		  this.state.orgs.response !== undefined &&
		  !Array.isArray(this.state.orgs.response.organization) &&		  
		  
          <div className="card">
           <div className="card-body">
               <h5 className="card-title">{this.state.orgs.response.organization["@attributes"].orgname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
			  
              </h6>
            </div>
          </div>
        
          
		  
		}       
        </div>
       </div>
	   :
	   <Switch>
			<Route path="/OrganizationProfile">
				<OrganizationProfile />
			</Route>
	</Switch> }
	</Router> 
	</> 
    );
	
  }
}


export default withRouter(Organization);
