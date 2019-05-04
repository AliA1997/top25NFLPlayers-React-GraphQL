import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Import your ApollloProvider, and nested with your App.
import { ApolloProvider } from 'react-apollo';
//import your BrowserRouter from react-router-dom
import { BrowserRouter as R } from 'react-router-dom';
//import your ApolloClient, InMemoryCache, and HttpLink to configure your Apollo Client.
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
import registerServiceWorker from './registerServiceWorker';

//Define your client which will be passed into the ApolloProvider client prop.
const client = new ApolloClient({
    //Define your cache by passing a new instance of InMemoryCache to your cache key.
    cache: new InMemoryCache(),
    //Define your link which will be set to a http link.
    //useGETForQueries for making your requests more developer friendly. Since we don't want to use post requests 
    //except the case of authentication where we are giving a user authorization which in this case we are not doing.
    link: new HttpLink({uri: 'http://localhost:5000/graphql', useGETForQueries: true})
});
//Nest your App with ApolloProvider with it's client prop set to the defined ApolloCLient.
ReactDOM.render(<ApolloProvider client={client}><R><App /></R></ApolloProvider>, document.getElementById('root'));
registerServiceWorker();