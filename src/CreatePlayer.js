import React, { PureComponent } from 'react';
//import your Mutation component for performing queries.
import { Mutation } from 'react-apollo';
// import gql from graphql-tag to define your graphql schema
import gql from 'graphql-tag';
//import your CreatePlayer css file for styling.
import './CreatePlayer.css';

const createPlayerMutation = gql`
    mutation CreatePlayer($name: String!, $position: String!, $team: String!, $jerseyNumber: Int!, $wonSuperBowl: Boolean!) {
        createPlayer(name: $name, position: $position, team: $team, jerseyNumber: $jerseyNumber, wonSuperBowl: $wonSuperBowl) {
            name
            position
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;


export default class CreatePlayer extends PureComponent {
    constructor() {
        super();
        this.state = {
            currentName: '',
            currentPosition: '',
            currentTeam: '',
            currentJerseyNumber: '',
            currentWonSuperBowl: false
        }
    }

    //Define the function responsible for creating a player.
    createPlayerFunc(func) {
        //Destruct state to assign to properties of the newPlayer object.
        const { currentName, currentPosition, currentTeam, currentJerseyNumber, currentWonSuperBowl } = this.state;
        //Assign a object that will be used to create a player.
        const newPlayer = {
            name: currentName,
            position: currentPosition,
            team: currentTeam,
            jerseyNumber: +currentJerseyNumber,
            wonSuperBowl: currentWonSuperBowl
        };


        //Now pass your newPlayer object as arguments to your mutation via the variables argument.
        func({ variables: newPlayer });

        //Redirect to homepage after newPlayer was created.
        this.props.history.push('/');
        //Or redirect to the player's list after a newPlayer was created.
        //this.props.history.push('/players')
    }

    render() {
        return (
            <div className='container'>
                <h2>Create Player</h2>
                <Mutation
                mutation={createPlayerMutation}>
                    {(createPlayer, {error}) => {
                        console.log("createPlayer----------", createPlayer);
                        if(error) {
                            console.log('error--------', error);
                        }
                        //When we hit our graphql server it will return our mutation as a function and we will pass it to the function of the component.
                        //When you submit the form have it so it will add a new player.
                        return (
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    return this.createPlayerFunc(createPlayer)
                                }}
                            >  
                                <label>Name:</label>
                                <input onChange={e => this.setState({currentName: e.target.value})} 
                                    value={this.state.currentName}/>
                                <label>Position:</label>
                                <input onChange={e => this.setState({currentPosition: e.target.value})} 
                                    value={this.state.position}/>
                                <label>Team: </label>
                                <input onChange={e => this.setState({currentTeam: e.target.value})} 
                                    value={this.state.currentTeam}/>
                                <label>Jersey Number:</label>
                                <input onChange={e => this.setState({currentJerseyNumber: e.target.value})} 
                                    value={this.state.jerseyNumber}/>
                                <label>Won Super Bowl:</label>
                                <div className="yes-no-buttons-div">
                                    <button onClick={e => {
                                        e.preventDefault();
                                        this.setState({currentWonSuperBowl: true})
                                    }} className="yes-button" style={{background: this.state.currentWonSuperBowl ? 'green' : 'transparent'}}>
                                        Yes
                                    </button>

                                    <button onClick={e => {
                                        e.preventDefault();
                                        this.setState({currentWonSuperBowl: false})
                                    }} className="no-button" style={{background: !this.state.currentWonSuperBowl ? 'red' : 'transparent'}}>
                                        No
                                    </button>
                                </div>
                                <button type="submit" className="submit-button">Create Player</button>
                            </form>
                        );
                        }
                    }

                </Mutation>
            </div>
        );
    }
}