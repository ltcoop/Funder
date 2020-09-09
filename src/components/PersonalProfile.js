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

import '../App.css';

const API_URL = 'http://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=&output=json&apikey=86908699e797033be391e97022f5d9d8';


class PersonalProfile extends React.Component {
  constructor(props) {
	super(props);
	
  }
	
  state = {
    profiles: { 	
	  response: {		  
		  member_profile: {
		  
		     assets: {
			     asset: []
		     },
			 
		     transactions: {
			     transaction: []
		     },
		  
		     positions: {
			     position: []
		     }
		  
		  }
	  }	  
	}    	
  }  
  
  formatter = (value) =>
    new Intl.NumberFormat('en-US', {
	style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2	
  }).format(value);
  
  componentDidMount() {
    this.callApi();  
  }
  

  callApi = () => {		
	var tmpUrl = `${API_URL}`;
    const url = tmpUrl.replace(/&cid=/, "&cid=" + this.props.cid);	
	
     axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ profiles: data })
      console.log(this.state.profiles)
     }) 
  }  
  
  render() {	  
  
	  return (  
	   <div className="container">
        <div className="col-xs-8">	
        <div>
        <Row className="row-margin-30">	
         <Col md={{ span: 8, offset: 2}}>		
		{ this.props.cid !== 0 ? <> <h1>2016 Reported Personal Finances</h1> </> : null }
		 </Col>
		 <Col md={{ span: 8, offset: 3}}>		
		{ this.props.cid !== 0 ? <> <h1>Legislator {this.props.name} </h1> </> : null }
		 </Col> 
		</Row>  
          <div className="row row-margin-20">	
		  <div>
		  { this.state.profiles.response.member_profile.assets !== undefined && 
		    this.state.profiles.response.member_profile.assets.asset.length > 0 ? <h3>Reported Assets</h3> : ""	 }
			  { this.state.profiles.response.member_profile.assets !== undefined &&			  
			     this.state.profiles.response.member_profile.assets.asset.map((asset) => (
				<Card>
				  <Card.Body>
				   <Card.Title><h5>{asset["@attributes"].name}</h5></Card.Title>
				   <Card.Text>
				    <h6>Low value: {this.formatter(asset["@attributes"].holdings_low)}</h6>
					<h6>High value: {this.formatter(asset["@attributes"].holdings_high)}</h6>
				   </Card.Text>	 
				    
				  </Card.Body>
			    </Card>
			))}
		   
          </div>  		 	
		  </div>
		  <div className="row row-margin-20">
		  <div>
		  { this.state.profiles.response.member_profile.transactions !== undefined &&
		    this.state.profiles.response.member_profile.transactions.transaction.length > 0 ? <h3>Financial Transactions</h3> : "" }
			{ this.state.profiles.response.member_profile.transactions !== undefined &&			   
			    this.state.profiles.response.member_profile.transactions.transaction.map((trans) => (
				<div className="card">
				  <div className="card-body">
				   <h5 className="card-title">{trans["@attributes"].asset_name}</h5>
				   <h6 className="card-subtitle mb-2 text-muted">
				   {trans["@attributes"].tx_action} <nbsp /> 
				   {trans["@attributes"].tx_date} 
				  </h6>
				  <h6>Low value: {this.formatter(trans["@attributes"].value_low)}</h6>
				  <h6>High value: {this.formatter(trans["@attributes"].value_high)}</h6>
				 </div>
			  </div>			  
			))}       
		  </div>		
		  </div>
		 <div className="row row-margin-20"> 
		 <div>
		    { this.state.profiles.response.member_profile.positions !== undefined &&
			this.state.profiles.response.member_profile.positions.position.length > 0 ? <h3>Positions Held by Member</h3> : "" }		 
			{ this.state.profiles.response.member_profile.positions !== undefined &&			  
			    this.state.profiles.response.member_profile.positions.position.map((posn) => (
				<div className="card">
				  <div className="card-body">
				   <h5 className="card-title">{posn["@attributes"].organization}</h5>
				   <h6 className="card-subtitle mb-2 text-muted">
				     {posn["@attributes"].title}				   
				  </h6>
				 </div>
			  </div>			  
			))}       
		  </div>
		</div>	   
		</div>
		</div>
		</div>
	  );
  }  
}


export default withRouter(PersonalProfile);
