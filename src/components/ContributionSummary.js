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

const API_URL = 'http://www.opensecrets.org/api/?method=candSummary&cid=&cycle=2020&output=json&apikey=86908699e797033be391e97022f5d9d8';

class ContributionSummary extends React.Component {
   constructor(props) {
	super(props);
	
  }
	
  state = {
    contribution: { 	
	  response: {		  
		  summary: {		   
		  
		  }
	  }	  
	}    	
  }  
  
  getParty = (value) => {
	
    switch (value) {
      case 'D':
	    return "Democrat";
		
	  case 'R':
	    return "Republican";
		
	  case '3':
	    return "Third Party";
		
	  case 'L':
	    return "Libertarian";
		
	  default:
	    return "Other";
    }		
  }
  
   getChamber = (value) => {
	
    switch (value) {
      case 'S':
	    return "Senate";
		
	  case 'H':
	    return "House of Representatives";  
		
	  default:
	    return "Other";
    }		
  }
  
  componentDidMount() {
    this.callApi();  
  }
  
  callApi = () => {		
	var tmpUrl = `${API_URL}`;
    const url = tmpUrl.replace(/&cid=/, "&cid=" + this.props.location.state.cid);	
	
     axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contribution: data })
	  console.log(this.props.location.state.cid)
      console.log(this.state.contribution)
     }) 
  }  
  
  render() {
	  
     return ( 
	 
        <div>	
	      <div className="container">
            <div className="col-xs-8">
			 
             <Row className="row-margin-30">	
               <Col md={{ span: 8, offset: 1}}>		
                <Card bg="light" style={{width: "50rem"}}>
		          <Card.Body>Member/candidate Fundraising amounts, including amount raised, spent, and remaining.
       				         
                  </Card.Body>		  				
	            </Card>
                <Row className="row-margin-10">				
		         <h1>2020 Fundraising Summary </h1>
				</Row>
                 <div>	
		           { Object.keys(this.state.contribution.response.summary).length > 0 ?	
				     <Row className="row-margin-10">
		  	         <Card>
				       <Card.Body>
				         <Card.Title><h5>{this.state.contribution.response.summary["@attributes"].cand_name}</h5></Card.Title>
						   <table class="w-80">		 
		                    <tbody>
                             <tr>
                               <td>							 
						         <h6>{this.getParty(this.state.contribution.response.summary["@attributes"].party)}</h6>
						         <h6>{this.getChamber(this.state.contribution.response.summary["@attributes"].chamber)}</h6>
						       </td>
							   <td>							   
						         <h6>First Elected: {this.state.contribution.response.summary["@attributes"].first_elected}</h6>
						         <h6>Next Election: {this.state.contribution.response.summary["@attributes"].next_election}</h6>
						       </td>
							 </tr>
						   <br />
						   <h5>Totals Reported by Candidate</h5>						   
						   <h6>Receipts: {formatMoney(this.state.contribution.response.summary["@attributes"].total)}</h6>
						   <h6>Spent: {formatMoney(this.state.contribution.response.summary["@attributes"].spent)}</h6>
						   <h6>Cash On Hand:{formatMoney(this.state.contribution.response.summary["@attributes"].cash_on_hand)}</h6>
						   <h6>Debt: {formatMoney(this.state.contribution.response.summary["@attributes"].debt)}</h6>
						 </tbody>
						 </table>
				       </Card.Body>
					</Card>	  
					</Row>
			       : " "} 		 	
             	</div>
			   </Col>
             </Row>
			 
		    </div>
		  </div>
		</div>
	);
  }
}


export default withRouter(ContributionSummary);
