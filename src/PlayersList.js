//Import react and PureComponent since it will be a class component
import React, { PureComponent } from 'react';
//import the Query component from react-apollo
import { Query } from 'react-apollo';
//import gql from graphql-tag which will be used for defining queries.
import gql from 'graphql-tag';

//Define your query which will return a position, team, name, jerseyNumber, and wonSuperBowl.
const query = gql`
    query {
        players {
            position
            name
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;

class PlayersList extends PureComponent {
    render() {
        return (
        <div className="container">
            <h1>Top 25 NFL Players</h1>
            <div className="players-container">
                {/* Pass your created query to your query prop of your Query component*/}
                <Query query={query}>
                    {/*
                        The Query comopnent takes a callback as props.children 
                        which takes a response and error
                    */}
                    {(response, error) => {
                        //If it is an error it will return a element.
                        if(error) {
                            console.log('Get Players Error---------', error);
                            return <h6>{JSON.stringify(error)}</h6>
                        }
                        //If there is a response return a list of elements.
                        if(response && response.data && response.data.players) {
                            console.log('response--------------', response.data);
                            return response.data.players.map(({position, name, team, jerseyNumber, wonSuperBowl}, i) => (
                                <div className='player-container' key={i}>
                                    <p className='player-text'>Position: {position}</p>
                                    <p className='player-text'>Name: {name}</p>
                                    <p className='player-text'>Team: {team}</p>
                                    <p className='player-text'>Jersey Number: {jerseyNumber}</p>
                                    <p className='player-text' style={{color: wonSuperBowl ? 'green' : 'red'}}>
                                        Won SuperBowl: 
                                    </p>
                                    <p className='player-text' style={{color: wonSuperBowl ? 'green' : 'red'}}>
                                        {wonSuperBowl ? 'YES' : 'NO'}
                                    </p>
                                </div>
                            ));
                        }
                        //When it's retrieving data will display a div with a loading... text.
                        return <div>Loading.....</div>
                    }}
                </Query>
            </div>
        </div>  
        );
    }
}
//Export the component
export default PlayersList;