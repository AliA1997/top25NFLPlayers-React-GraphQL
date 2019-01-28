//Import React, and PureComponent from react 
import React, { PureComponent } from 'react';
//import your football image.
import footballImage from './football.png';

//Define your Home Component
class Home extends PureComponent {
    render() {
        return (
            <div className="container">
                <img src={footballImage} className='football-logo' />
                <h1 className='header text'>Top 25 NFL Players</h1>
            </div>
        );
    }
}

export default Home;
