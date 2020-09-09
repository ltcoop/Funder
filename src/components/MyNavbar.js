import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Legislator from './Legislator';
import LegislatorProfile from './LegislatorProfile';
import OrganizationProfile from './OrganizationProfile';
import Committee from './Committee';
import Organization from './Organization';
import Expenditure from './Expenditure';

class MyNavbar extends React.Component{


  render(){
    return(
	  <div>
	    <div className="row">
		  <div className="col-md-12">
			<Router>
			  <Navbar bg="info" variant="dark" expand="lg" sticky="top">
				<Navbar.Brand href="/">Funder</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				  <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
					<Nav.Link href="/">Legislators</Nav.Link>					
					<Nav.Link href="/Committee">Total by Committee</Nav.Link>
					<Nav.Link href="/Organization">Total by Organization</Nav.Link>									
					<Nav.Link href="/Expenditure">Last 50 Daily Expenditures</Nav.Link>	
					</Nav>					
				  </Navbar.Collapse>
				</Navbar>
				<br />
				<Switch>
				    <Route exact path="/">
				        <Legislator />
					</Route>				   		   
					<Route path="/Committee">
						<Committee />
					</Route>
					<Route path="/Organization">
						<Organization />
					</Route>
					<Route path="/Expenditure">
						<Expenditure />
					</Route>
					<Route path="/LegislatorProfile">
						<LegislatorProfile />
					</Route>
					<Route path="/OrganizationProfile">
						<OrganizationProfile />
					</Route>
				</Switch>
			 </Router>
		  </div>
	    </div>
	  </div>
	)  
  }
}

export default MyNavbar;