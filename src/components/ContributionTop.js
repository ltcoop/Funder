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

const API_URL = 'https://www.opensecrets.org/api/?method=candContrib&cid=&output=json&cycle=2020&apikey=86908699e797033be391e97022f5d9d8';

class ContributionTop extends React.Component {
  constructor(props) {
	super(props);
	
  }
	
  state = {
    top: { 	
	  response: {		  
		contributors: {            	
			contributor: []	  
		}
	  }	  
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
      this.setState({ top: data })
      console.log(this.state.top)
     }) 
  }  
    
  render() {	  
  
	  return (  
	   <div className="container">
        <div className="col-xs-8">
		  <Row className="row-margin-20">	
            <Card bg="light" style={{width: "50rem"}}>
		      <Card.Body>Top Monetary Contributions from an Organization given to a Legislator
              </Card.Body>		  				
	        </Card>		
	      </Row>			
          <div>
            <Row className="row-margin-30">	
              <Col md={{ span: 8, offset: 2}}>		
		       { this.props.cid !== 0 ? <> <h1>2020 Top Contributors for</h1> </> : null }		      		
		       { this.props.cid !== 0 ? <> <h1>Legislator {this.props.location.state.name} </h1> </> : null }
		      </Col> 
		    </Row>  
			
            <div className="row row-margin-20">	
			  <div>
			  { this.state.top.response.contributors["@attributes"] !== undefined &&
				   <h6>Note:{this.state.top.response.contributors["@attributes"].notice}</h6>
			  }
			 </div>
		      <div>
		       { this.state.top.response.contributors !== undefined &&		     			  
			     this.state.top.response.contributors.contributor.map((contrib) => (				 
			     <Card>
			       <Card.Body>
			         <Card.Title><h5>{contrib["@attributes"].org_name}</h5></Card.Title>
				     <Card.Text>
				       <h6>Total from All Sources: {formatMoney(contrib["@attributes"].total)}</h6>
					   <h6>Total from PAC's: {formatMoney(contrib["@attributes"].pacs)}</h6>
					   <h6>Total from Individuals: {formatMoney(contrib["@attributes"].indivs)}</h6>
					   
				     </Card.Text>	 
				    
			       </Card.Body>
			     </Card>
		       ))}		   
              </div>  		 	
		    </div>		  
		  </div>
		 </div>
		</div>
	  );
  }  
}


export default withRouter(ContributionTop);
