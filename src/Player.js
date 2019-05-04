import React, { PureComponent } from 'react';
//import your UpdatePlayer.css and CreatePlayer.css for your Player styles.
import './CreatePlayer.css';
import './UpdatePlayer.css';
//import your QUery and Mutation component for retrieving and manipulating data via it's query and mutation arguments.
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

//Define your Schema that will be responsible for retrieving data via the route id argument.
//We will alias our query to player since it is more readable.
const getPlayerQuery = gql`
    query GetPlayer($id: String) {
        player: getPlayer(id: $id) {
            name
            position
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;


//Define a mutation schema that will be responsible for updating a player, with nullable arguments.
const updatePlayerMutation = gql`
    mutation UpdatePlayer($id: String, $name: String, $position: String, $team: String, $jerseyNumber: Int, $wonSuperBowl: Boolean) {
        updatePlayer(id: $id, name: $name, position: $position, team: $team, jerseyNumber: $jerseyNumber, wonSuperBowl: $wonSuperBowl) {
            name
            position
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;

//Define a mutation schema that will be responsible for deleting a player using an id.
const deletePlayerMutation = gql`
    mutation DeletePlayer($id: String) {
        deletePlayer(id: $id) {
            id
        }
    }
`;


export default class Player extends PureComponent {
    //Define your state that will be responsible for opening a edit form.
    constructor() {
        //Use super to initialize the parent props.
        super();
        //Define a boolean for showing your editForm, and fields to use to update your player.
        this.state = {
            showEditForm: false,
            updatedName: '',
            updatedPosition: '',
            updatedTeam: '',
            updatedJerseyNumber: '',
            updatedWonSuperBowl: false
        }
    }

    //Define your updatePlayerFunc for updating a player.
    //Make it asynchronous so your page will refresh with your new data
    async updatePlayerFunc(func) {
        //Assign a variable to your url's id.
        const id = this.props.match.params.id;
        //Define your updatedPlayer.
        //Which will hold all your state for updating a player.
        let updatedPlayer = {
            id,
            name: this.state.updatedName,
            position: this.state.updatedPosition,
            team: this.state.updatedTeam,
            jerseyNumber: this.state.updatedJerseyNumber,
            wonSuperBowl: this.state.updatedWonSuperBowl
        };

        //Now loop through your updatedPlayer keys, and delete the property that are null or an empty string, and if it is not a boolean
        //Since  false is falsey.
        for(var key in updatedPlayer) {
            if(!updatedPlayer[key] &&  typeof updatedPlayer[key] !== 'boolean') {
                delete updatedPlayer[key]
            }
        }

        //Now pass your updatePLayer as a property for your variables for your func argument.
        //And assign a optimistic resposne which will be the returnedPlayer.
        await func({ 
            variables: updatedPlayer
            })

        //Now refresh your location using your history object's go method. 
        //No need to refresh since our webpage will refresh and automatically set our state to it's initial values.
        this.props.history.go();
    }

    //Define your deletePlayerFunc for deleting a player,
    //and also have the method asynchronous so you would delete player before redirecting the user to the player's list.
    async deletePlayerFunc(func) {
        //Now assign the id of the current player from the url.
        const id = this.props.match.params.id;
        //Now pass your id to the func which would be where your mutate delete method will take a object with a variables property of your id.
        await func({ variables: { id } });
        //Then redirect your users to the player's list.
        this.props.history.push('/players');
    }

    render() {
        //Assign a variable from your route.
        const playerId = this.props.match.params.id;
        console.log('this.state.updatePlayer', this.state.returnedPlayer);
        return (
            <div className="container update-container">
                {/*Have your Mutations and your result from your getPlayerQuery nested in your Query component. */}
                {/*Pass your id to your variables of your Query */}
                <Query 
                    query={getPlayerQuery}
                    variables={{"id": playerId}}
                    fetchPolicy="cache-and-network"
                >
                    {(response, error) => {
                        if(error) {
                            //If there is an error, log an error to the console.
                            //And return html holding your error.
                            console.log('Get Players Query Error-------', error);
                            return <p>{JSON.stringify(error)}</p>
                        }
                        if(response && response.data && response.data.player) {
                           return (
                                <div>
                                    <h2>{response.data.player.name}</h2>
                                    <h4>Position: {response.data.player.position}</h4>
                                    <h4>Team: {response.data.player.team}</h4>
                                    <h4>#: {response.data.player.jerseyNumber}</h4>
                                    <h4>{response.data.player.wonSuperBowl ? 'Yes' : 'No'}</h4>
                                    <form style={{display: this.state.showEditForm ? 'block' : 'none'}}>
                                        <input value={this.state.updatedName} placeholder={response.data.player.name}
                                        onChange={e => this.setState({updatedName: e.target.value})}/>
                                        <input value={this.state.updatedPosition} placeholder={response.data.player.position}
                                        onChange={e => this.setState({updatedPosition: e.target.value})}/>
                                        <input value={this.state.updatedTeam} placeholder={response.data.player.team}
                                        onChange={e => this.setState({updatedTeam: e.target.value})}/>
                                        <input value={this.state.updatedJerseyNumber} placeholder={response.data.player.jerseyNumber}
                                        onChange={e => this.setState({updatedJerseyNumber: e.target.value})}/>
                                        <div className="yes-no-buttons-div">
                                            <button onClick={e => {
                                            e.preventDefault();
                                            this.setState({updatedWonSuperBowl: true})
                                            }} className="yes-button" style={{background: this.state.updatedWonSuperBowl ? 'green' : 'transparent'}}>
                                                Yes
                                            </button>

                                            <button onClick={e => {
                                                e.preventDefault();
                                                this.setState({updatedWonSuperBowl: false})
                                            }} className="no-button" style={{background: !this.state.updatedWonSuperBowl ? 'red' : 'transparent'}}>
                                                No
                                            </button>
                                        </div>
                                    </form>
                                </div>
                           ); 
                        }
                        //Else return a loading html.
                        return <p>Loading....</p>
                    }}
                </Query>
                <Mutation
                    mutation={updatePlayerMutation}>
                    {(updatePlayer, error) => {
                        if(error) {
                            console.log("update player mutation error------", error);
                        }
                        //If the updatedPlayer mutate method is returned then return the button that will open the edit form or update the player itself.
                        if(updatePlayer) {
                            //If your showEditForm state is true the text of the button will be update
                            //Else if it is false, have the text be edit.
                            //For the onClick event handler have it conditional use your mutation function, or alter your state to open the edit form.
                            return (
                                    <button  className='update-button'
                                    onClick={e => {
                                        e.preventDefault();
                                        console.log("thi.stat.'-------", this.state.showEditForm)
                                        if(this.state.showEditForm) 
                                            this.updatePlayerFunc(updatePlayer);
                                        else 
                                            return this.setState({showEditForm: true})
                                    }}>
                                        {this.state.showEditForm ? 'Update' : 'Edit'}
                                    </button>
                                );
                        }
                        return <div/>
                    }}
                </Mutation>
                <Mutation
                    mutation={deletePlayerMutation}>
                    {(deletePlayer, error) => {
                        if(error) {
                            console.log("update player mutation error------", error);
                        }
                        if(deletePlayer) {
                            //If the edit form is not showing then you can delete a player
                            // else return an alert the user they can't delete that specified player.
                            return (
                                    <button className='delete-button'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if(this.state.showEditForm) 
                                                alert("Can't delete player becuase your edit form is displayed.");
                                            else 
                                                this.deletePlayerFunc(deletePlayer);
                                        }}
                                    >
                                        Delete
                                    </button>
                                );
                        }
                        return <div/>
                    }}
                </Mutation>
            </div>
        );
    }
}