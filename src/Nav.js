import React from 'react';
//Import link from react-router-dom to navigate to different routes.
import { Link } from 'react-router-dom';

//Define your side nav bar.
//Will destruct props upon initialization of your stateless component.
const Nav = ({openDrawer}) => (
    <div style={{display: openDrawer ? 'inline-block' : 'none'}} className='navigation-bar'>
        <Link className='link' to='/'>Home</Link>
        <Link className='link' to='/players'>Players List</Link>
        <Link className='link' to='/create_player'>Create Player</Link>
    </div>
);

//Now export your Nav component
export default Nav;