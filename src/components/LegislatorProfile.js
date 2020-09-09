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
import ContributionSummary from './ContributionSummary';
import ContributionTop from './ContributionTop';
import ContributionIndustry from './ContributionIndustry';
import PersonalProfile from './PersonalProfile';
import '../App.css';

class LegislatorProfile extends React.Component {
  constructor(props) {
	super(props);
	
	//this.incrementCompKey = this.incrementCompKey.bind(this);
	this.hidePersonalProfile = this.hidePersonalProfile.bind(this);
	//this.showComponent = this.showComponent.bind(this);
  }  
  
  state = {
    showHidePersonalProfile: true,
	showHideContributionSummary: false,
	showHideContributionTop: false,
	showHideContributionIndustry: false,
	personalProfileLink: "/PersonalProfile"
  }  
  
  showComponent(showComp) {
	  
	  this.setState({showHidePersonalProfile: showComp === "showHidePersonalProfile" ? true : false });
	  
	  this.setState({showHideContributionSummary: showComp === "showHideContributionSummary" ? true : false });
	  
	  this.setState({showHideContributionTop: showComp === "showHideContributionTop" ? true : false });
	  
	  this.setState({showHideContributionIndustry: showComp === "showHideContributionIndustry" ? true : false });
	  
	  //if (showComp === "showHidePersonalProfile") {
		//  this.setState({personalProfileLink: "#"})
	  //}
  }
  
  hidePersonalProfile()
  {
	this.setState({showHidePersonalProfile: false });  
  }
  
  
  render() {
  
      const { showHidePersonalProfile, showHideContributionSummary, showHideContributionTop, showHideContributionIndustry } = this.state;
	   
	  return (  
	    <Router>
		 <div className="container">
          <div className="col-xs-8">	
		<div className="row">
          <div className="col">		
           <Link to={{
					  pathname: this.state.personalProfileLink,
					  state: {						  
					    cid:  this.props.location.state.cid,	
                        name: this.props.location.state.name,
                        year: this.props.location.state.year						
                      }	                      				  
		            }}>
					<span onClick={ () => this.showComponent("showHidePersonalProfile")}>Personal Finances</span></Link>		
		  </div>
		  <div className="col">
		   <Link to={{
					  pathname: '/ContributionSummary',
					  state: {						  
					    cid:  this.props.location.state.cid,	
                        name: this.props.location.state.name	
                      }	                      				  
		            }}>
					<span onClick={ () => this.showComponent("showHideContributionSummary")}>Fundraising Summary</span></Link>
		  </div>
		  <div className="col">
		   <Link to={{
					  pathname: '/ContributionTop',
					  state: {						  
					    cid:  this.props.location.state.cid,	
                        name: this.props.location.state.name	
                      }	                      				  
		            }}>
					<span onClick={ () => this.showComponent("showHideContributionTop")}>Top Contributors</span></Link>
			   
		   </div>
		   
		</div>
		</div>
		</div>
		<Switch>
			<Route path="/ContributionSummary">
				<ContributionSummary />
			</Route>
			<Route path="/ContributionTop">
				<ContributionTop />
			</Route>				   
			<Route path="/ContributionIndustry">
				<ContributionIndustry />
			</Route>						
		</Switch>
		{ showHidePersonalProfile && <PersonalProfile name = {this.props.location.state.name}
              		cid = { this.props.location.state.cid } 
                    year = { this.props.location.state.year } /> }
       </Router>
	  );
  }  
}


export default withRouter(LegislatorProfile);
