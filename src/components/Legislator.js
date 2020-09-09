import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
	Link,
    Route,
    useParams,
} from "react-router-dom";
import LegislatorProfile from './LegislatorProfile';
import Committee from './Committee';
import ShowError from './ShowError';

import '../App.css';

const API_URL = 'http://www.opensecrets.org/api/?method=getLegislators&id=&output=json&apikey=86908699e797033be391e97022f5d9d8';


class Legislator extends React.Component {
  constructor() {
	super();
	this.handleInputChange = this.handleInputChange.bind(this);	
  }
	
  state = {
    legislators: { 	
	  response: {		  
		  legislator: []
	  }
	},
	
	name: '',
	
	cid: '',
	
	year: '',
	
	stateAbrev: '',
	
	apiError: false
  }   
  
  handleInputChange = event => {
	  this.setState({stateAbrev: event.target.value });
  }
  
  componentDidMount() {
   
      
   
  }  
  
  
  
  callApi = event => {
	event.preventDefault();
	
	var tmpUrl = `${API_URL}`;
    const url = tmpUrl.replace(/&id=/, "&id=" + this.state.stateAbrev);
	
	
     axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ legislators: data })
      console.log(this.state.legislators)
     })
	.catch(err => {
	  this.setState({legislators: {}});
	  this.setState({apiError: true})
	})
  }
  
  render() {	  
	  
	  return (  
       <>	  
        {this.state.apiError && <ShowError errmsg="Enter 2 characters for STATE" showModal="true" /> } 

        <div className="container">
          <div className="col-xs-8">	
		    <Card bg="light" style={{width: "50rem"}}>
		    <Card.Body>Search for a Legislator to see their Financial Profile:
			           their Personal Finances, Fundraising Totals and
					   Fundraising from Organizations.
			</Card.Body>		  				
	        </Card>  
		    <div className="row row-margin-30">
			  <div className="col-3">
		        <label>State (Abbreviation)</label>
			  </div>
		   </div>
		   <div className="row">
			  <div className="col-3">
		        <input type="text"
		          name="stateAbrev"
				  placeholder="like AZ or CA"
			      value={this.state.stateAbrev}
		          onChange={this.handleInputChange} />
			  </div>
			</div>
			<div className="row row-margin-30">
		      <div className="col-3">
	            <button onClick={this.callApi}>Submit</button>
		      </div>
	       </div>
		   <br />
		   <table class="blueTable w-50">
		 
		     <thead>
		      { this.state.legislators.response !== undefined && this.state.legislators.response.legislator.length > 0 ?  
			    <tr>
	 		      <th>Legislator</th>
			      <th>Party</th> 
			      <th>Financial Profile</th>
			    </tr>
			  : <tr> </tr> }
		     </thead>
		 
		     <tbody>
			  { this.state.legislators.response != undefined && this.state.legislators.response.legislator.length > 0 &&
			    this.state.legislators.response.legislator.map( (legis, index) => {
			      return (
				    <tr key={ index }>              
				      <td className="w-30">{ legis.["@attributes"].firstlast }</td>
				      <td>{ legis.["@attributes"].party }</td>  
				      <td className="w-25">
				        <Link to={{
					      pathname: '/LegislatorProfile',
					      state: {						  
					        cid:  legis.["@attributes"].cid,	
                            name: legis.["@attributes"].firstlast,		
                            year: legis.["@attributes"].data_year							
					      }
				        }}>Profile</Link>
				      </td>
				    </tr>
			     )
			  })}
		     </tbody>
		   </table>		
	    </div>
     </div> 
    </> 
	);
  }
}


export default Legislator;
