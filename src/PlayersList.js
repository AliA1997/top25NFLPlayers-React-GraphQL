//Import react and PureComponent since it will be a class component
import React, { PureComponent } from 'react';
//import the Query component from react-apollo
import { Query } from 'react-apollo';
//import gql from graphql-tag which will be used for defining queries.
import gql from 'graphql-tag';

//Define your query which will return a position, team, name, jerseyNumber, and wonSuperBowl.
//ALter your query to also retrieve the id so when a item is click it will navigate to that specified route.
const query = gql`
    query {
        players {
            id
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
                {/*Set your fetchPolicy to network and cache to retrieve data via api call, but updates the cache with real time data
                    and the only time data is retrieve from cache is when the data is the same. */}
                <Query query={query} fetchPolicy="cache-and-network">
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
                            return response.data.players.map(({id, position, name, team, jerseyNumber, wonSuperBowl}) => (
                                <div className='player-container' onClick={() => this.props.history.push(`/players/${id}`)} key={id}>
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