//import react since your are importing components that use React
import React from 'react';
//import the Switch, and Route component for defining routes.
//Switch goes to the first route.
import { Switch, Route } from 'react-router-dom';
//import the component needed for your routes
import Home from './Home';
import PlayersList from './PlayersList';
import CreatePlayer from './CreatePlayer';

//Just export your routes as a default export so there is no need to name it.
export default (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/players" component={PlayersList}/>
                <Route path='/create_player' component={CreatePlayer}/>
            </Switch>
);