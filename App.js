import React, {Component} from 'react';
import { ActivityIndicator,TextInput,  Button, Alert } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from 'apollo-client';
//import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';


const cache = new InMemoryCache();
const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = 'ce459a4dc890646d396f92146e4599169c1bf6e3';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

const client = new ApolloClient({ 
  link: httpLink,
  cache,
  //uri: 'http://192.168.0.18:4000/graphql' ,

});


import Repositories from "./components/Repositories";

export const AppContext = React.createContext({ data: { repositories: null } });


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.nameOwner = {text: ''};
  }
  state = {
    query: null,
    text:''
  }
  

  componentDidMount() {
    const query = this.getQuery('vanesantillana');
    this.setState({
      query
    });
  }

  onGetNewRequest = () => {
    //console.log(this.state.text);
    const query = this.getQuery(this.state.text);

    this.setState({
      query
    });
  }

  getQuery = (name) => {
    //const randomID = getRandomInt(1, 807);
    //console.log(randomID);
     
    return `
      query GetRepositoriesByUsername {
        search(query: "org:${name}", type: REPOSITORY, first: 10) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                name,id
              }
            }
          }
        }
      }
    `
  }

  
  render(){
    const { query } = this.state;
    if (!query) return null;

    console.log("render")
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title="Buscar"
          onPress={() => this.onGetNewRequest()}
        />

      <ApolloProvider client={client}>
        <Query query={gql`${query}`} >

          {({ loading, error, data }) => {
            if (loading || error) return <ActivityIndicator size="large" color="#0000ff" />
            console.log("loading",data)
            return (
              <AppContext.Provider value={{...data.search, onPress: this.onGetNewRequest,}} style={styles.container}>
                <Repositories />
              </AppContext.Provider>
            )
          }}
        </Query>
      </ApolloProvider>
      </View>
    );
    
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*



*/