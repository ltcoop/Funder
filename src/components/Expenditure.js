import React from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap'
import { formatMoney } from './Utils.js';
import '../App.css';

const API_URL = 'http://www.opensecrets.org/api/?method=independentExpend&output=json&apikey=86908699e797033be391e97022f5d9d8';

class Expenditure extends React.Component {
  constructor() {
	super();		
  }
	
  state = {
    expenditure: { 	
	  response: {		  
		  indexp: []
	  }
	}
  }
  
 componentDidMount() {	
    const url = `${API_URL}`;	
	
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ expenditure: data })
      console.log(this.state.expenditure)
     }) 	 
 }
 
  render() {
	
    return (
     <div>
	   <div className="container">
         <div className="col-xs-8">	
		  <Row className="row-margin-20">	
		    <Col md={{ span: 8, offset: 1}}>	
            <Card bg="light" style={{width: "50rem"}}>
		      <Card.Body>Top 50 Independant Expenditures Received by a PAC.
                         The money is used to either Support or Oppose a candidate.			  
              </Card.Body>		  				
	        </Card>		
		   </Col>
	      </Row>

          <Row className="row row-margin-20">		    
			<Col md={{ span: 8, offset: 3}}>	
              <h1>Last 50 Daily Expenditures </h1>
			</Col>
		  </Row>	
		  
		  <Row className="row-margin-20">
	      {this.state.expenditure.response.indexp.map((expenditure) => (
		    <Card>
			  <Card.Body>
			    <Card.Header><h5>{expenditure["@attributes"].pacshort}</h5></Card.Header>
			    <Card.Title><h6>Amount: {formatMoney(expenditure["@attributes"].amount)}</h6>
				            <h6>Payee: {expenditure["@attributes"].payee}</h6>	</Card.Title>
				<Card.Text>
				  			  
				  <h6>{expenditure["@attributes"].suppopp} Candidate {expenditure["@attributes"].candname}</h6>
				  <h6>District/Position: {expenditure["@attributes"].district}</h6>				  
				  <h6>Expenditure date: {expenditure["@attributes"].date}</h6>
					   
				</Card.Text>	 
				    
			  </Card.Body>
			</Card>          
          ))}
          </Row>		  
         </div>
       </div>	  
	 </div>
    );
  }
}


export default Expenditure;
