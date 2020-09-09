import React from 'react';
import MyNavbar from './components/MyNavbar';
import Legislator from './components/Legislator';
import LegislatorProfile from './components/LegislatorProfile';
import Committee from './components/Committee';
import Organization from './components/Organization';
import Expenditure from './components/Expenditure';
import './App.css';

class App extends React.Component {
 constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
   
    event.preventDefault();
  }
  
  componentDidMount() {
   
   document.title = "Funder";   
   
  }  
  
  render() {
    return (
	<>
     <MyNavbar />
	 	 
    </>
    );
  }
}

export default App;
