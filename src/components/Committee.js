import React from 'react';
import axios from 'axios';
import { Row, Col, DropdownButton, Dropdown, Card } from 'react-bootstrap'
import { formatMoney } from './Utils.js';
import ShowError from './ShowError';
import '../App.css';

const comm_options = ["House Admin", "Agriculture", "Appropriations", "Armed Services", "Budget", "Education and Labor",
                      "Energy and Commerce", "Financial Services", "Oversight & Govt Reform", "Homeland Security",
					  "Foreign Affairs", "Permanent Select on Intelligence", "Judiciary", " US Natl Security with People's Republic of China",
					  "Natural Resources", "Rules", "Science", "Small Business", "Standards of Offical Conduct",
					  "Transportation & Infrastructure", "Veteran's Affairs", "Ways & Means", "Join Economic", "Join Library of Congress",
					  "Joint Printing", "Joint Taxation", "Special Aging", "Agriculture, Nutrition & Forestry", "Appropriations",
					  "Armed Services", "Banking, Housing & Urban Affairs", "Budget", "Commerce, Science & Transportation",
					  "Energy & Natural Resources", "Environment & Public Works", "Select Ethics", "Finance", "Foreign Relations",
					  "Homeland Security & Govt Affairs", "Indian Affairs", "Select Intelligence", "Judiciary", "Health, Education, Labor & Pensions",
					  "Rules & Administration", "Small Bus & Entrepreneurship", "Veteran's Affairs"];
const comm_codes = ["HADM", "HAGR", "HAPP", "HARM", "HBUD", "HEDU",
                    "HENE", "HFIN", "HGOV", "HHSC",
					"HINT", "HITL", "HJUD", "HPRC",
                    "HRES", "HRUL", "HSCI", "HSMA", "HSTA",
					"HTRA", "HVET", "HWAY", "JECO", "JLIB",
					"JPRI", "JTAX", "SAGI", "SAGR", "SAPP",
					"SARM", "SBAN", "SBUD", "SCOM",
					"SENE", "SENV", "SETH", "SFIN", "SFOR",
 					"SGOV", "SIND", "SITL", "SJUD", "SLAB",
					"SRUL", "SSMA", "SVET"];

const indus_options = ["Crop Production & Basic Processing", "Tobacco", "Dairy", "Poultry & Eggs", "Livestock", "Agricultural Services/Products",
                       "Forestry & Forest Products", "Misc Agriculture", "General Contractors", "Home Builders", "Special Trade Contractors",
					   "Construction Services", "Building Materials & Equipment", "Misc Communcation/Electronics","Printing & Publishing",
					   "TV/Movies/Music", "Telephone Utilities", "Telecom Services", "Electronic Mfg & Equip",
					   "Internet", "Defense Aerospace", "Defense Electronics", "Misc Defense", "Oil & Gas", "Mining", "Misc Energy",
					   "Electric Utilities", "Env Svcs/Equipment", "Waste Mgmt", "Fisheries & Wildlife",
					   "Commercial Banks", "Savings & Loans", "Credit Unions", "Finance/Credit Companies", "Securities & Investment",
					   "Insurance", "Real Estate", "Accountants", "Misc Finance",
					   "Business Assoc", "Food Processing & Sales", "Food & Beverage", "Beer, Wine & Liquor",
					   "Retail Sales", "Misc Svcs", "Business Svcs", "Recreation/ Live Entertainment",
					   "Casinos/Gambling", "Marijuana", "Health Professionals", "Hospitals/Nursing Homes", "Health Svcs/HMOs",
					   "Pharam/Health Products", "Education", "Other", "Republican/Conservative", "Democratic/Liberal",
					   "Leadership PACs", "Foreign & Defense Policy", "Pro-Israel", "Women's Issues", "Human Rights",
					   "Misc Issues", "Gun Control", "Gun Rights", "Abortion Polity/Anti-Abortion", "Abortion Policy/Pro-Abortion Rights",
					   "Lawyers/Law Firms", "Lobbyists", "Building Trade Unions", "Industrial Unions", "Misc Unions" ];
const indus_codes = ["A01", "A02", "A04", "A05", "A06", "A07",
                     "A10", "A11", "C01", "C02", "C03",
 					 "C04", "C05", "B00", "B01",
					 "B02", "B08", "B09", "B12",
					 "B13", "D01", "D02", "D03", "E01", "E04", "E07",
					 "E08", "E09", "E10", "E11", 
					 "F03", "F04", "F05", "F06", "F07",
					 "F09", "F10", "F11", "F13",
					 "N00", "A09", "N01", "N02",
					 "N03", "N04", "N05", "N06",
					 "N07", "N09", "H01", "H02", "H03",
					 "H04", "W04", "W07", "Q01", "Q02",
					 "Q03", "Q04", "Q05", "Q08", "Q09",
					 "Q10", "Q12", "Q13", "Q14", "Q15",
					 "K01", "K02", "P01", "P02", "P05"];
					 
const API_URL = 'https://www.opensecrets.org/api/?method=congCmteIndus&congno=116&output=json&indus=&cmte=&apikey=86908699e797033be391e97022f5d9d8';
	
class Committee extends React.Component {
  constructor(props) {
	  super(props);
	  
  }
  
  state = {
	selectedCommOption: comm_options[0],
    selectedCommIndex: 0,	
	selectedCommCode: 'HADM',
	selectedIndusOption: indus_options[0],
    selectedIndusIndex: 0,	
	selectedIndusCode: 'A01',
	
	committees: { 	
	  response: {		  
		  committee: {
		  
		     member: []
          }		  
	  }	  
	},

    apiError: false	
  }
  
  handleSelectComm = (evtKey) => {
	var idx = Number(evtKey);	
	
	this.setState({ selectedCommOption: comm_options[idx] });
	this.setState({ selectedCommIndex: idx });
	this.setState({ selectedCommCode: comm_codes[idx] });
	
	//alert(idx);
  }

  handleSelectIndus = (eventKey) => {
	
	var idx = Number(eventKey);
	
	this.setState({ selectedIndusOption: indus_options[idx] });
	this.setState({ selectedIndusIndex: idx });
	this.setState({ selectedIndusCode: indus_codes[idx] });
	
	//alert(idx);
  }

  callApi = () => {	
  
	var tmpUrl = `${API_URL}`;
    var tmpUrl2 = tmpUrl.replace(/&indus=/, "&indus=" + this.state.selectedIndusCode);	
	const url = tmpUrl2.replace(/&cmte=/, "&cmte=" + this.state.selectedCommCode);	
	
     axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ committees: data })
      console.log(this.state.committees)
     })
    .catch(err => {
	  this.setState({committees: {}});
	  console.log(err);
	  this.setState({apiError: true})	
	})	  
  }

  render() {
	
    return (
	<>
	{this.state.apiError && <ShowError errmsg="Try different Committee & Industry" showModal="true" /> } 
	
	<div>
	  <div className="container">
        <div className="col-xs-8">	  
	      <Card bg="light" style={{width: "50rem"}}>
		    <Card.Body>Congressional Committees deal with a specific Industry, so Committee members receive money
             		   from Businesses and Organizations that belong to that Industry.
			</Card.Body>		  				
	      </Card>   

           <Row className="row row-margin-20">
		    <Col className="col-10">
              <h1>Total Received by Committee Members from Industry</h1>
			</Col>
		  </Row>		  
		  
	      <div className="row row-margin-10">
	        <div className="col-4">
			  <h4>Committee</h4>
	          <DropdownButton
	            title={this.state.selectedCommOption}		 
		        id="committee-info"
		        onSelect={this.handleSelectComm.bind(this)}
	          >
	            {comm_options.map((opt, i) => (
	              <Dropdown.Item key={i} eventKey={i}>
			        {opt}  
		          </Dropdown.Item>
	            ))}
	          </DropdownButton> 
            </div>	   
	        	      
	        <div className="col-2">
			  <h4>Industry</h4>
	          <DropdownButton
	            title={this.state.selectedIndusOption}
		        id="industry-info"
		        onSelect={this.handleSelectIndus.bind(this)}
	          >
	            {indus_options.map((ind, j) => (
	              <Dropdown.Item key={j} eventKey={j}>
			        {ind}  
		          </Dropdown.Item>
	            ))}
	          </DropdownButton>
	        </div>
			
          </div>	   
	      <div className="row row-margin-30">
		    <div className="col">
	          <button onClick={this.callApi}>Submit</button>
			</div>
          </div>
	 
	      <div className="row row-margin-30">		  
	      <div>
          { this.state.committees !== undefined &&
		    this.state.committees.response.committee.member.length > 0 &&            	  
			this.state.committees.response.committee.member.map((cmte) => (
			  <Card>
			    <Card.Body>
			      <Card.Title><h5>{cmte["@attributes"].member_name}</h5></Card.Title>
				  <Card.Text>
				    <h6>Party:{cmte["@attributes"].party}</h6>
					<h6>State:{cmte["@attributes"].state}</h6>
				    
					<h6>Total from PAC's: {formatMoney(cmte["@attributes"].pacs)}</h6>
					<h6>Total from Individuals: {formatMoney(cmte["@attributes"].indivs)}</h6>
					<h6>Total Receipts: {formatMoney(cmte["@attributes"].total)}</h6>
					   
				  </Card.Text>	 
				    
			    </Card.Body>
			  </Card>				
		   ))}
          </div>
          </div>		  
	    </div> 
      </div>
    </div>
    </>	
    );
  }
}


export default Committee;
