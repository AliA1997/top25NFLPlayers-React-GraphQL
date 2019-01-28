import React, { Component } from 'react';
//import your Navigation bar.
import Nav from './Nav';
//Import your routes for your Application.
import router from './Router';
import './App.css';

class App extends Component {
  //Define your state for opening your navigation bar.
  state = {
    openDrawer: false
  }
  //This function will toggle your navbar.
  toggleNavbar(e) {
    //Prevent the default behavior so the webpage doesn't refresh
    e.preventDefault();
    //Return your this.setState with your state set
    return this.setState({openDrawer: !this.state.openDrawer});
  }
  render() {
    return (
      <div className="App">
        {/*We will have 2 divs one for navigation and one for routes since we want our App parent to have a flex direction of row. */}
        {/*And our navigation bar to have a flex-direction of columm */}
        <div className="nav-div">
          <button className='open-drawer'
          style={{backgroundColor: this.state.openDrawer ? 'green' : '#fff'}}
          onClick={(e) => this.toggleNavbar(e)}>
            Open Drawer
          </button>
          <Nav {...this.state}/>
        </div>
        <div className='pages'>
          {router}
        </div>
      </div>
    );
  }
}

export default App;