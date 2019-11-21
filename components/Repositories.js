import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../App';

const Repositories = () => {
    return (
        <AppContext.Consumer>
            {
            ({ repositoryCount, edges, onPress }) =>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.mainDetails}>
                  <Text style={styles.mainText}>Numero de repositorios: {repositoryCount}</Text>
                  <FlatList
                    data={edges}
                    renderItem={({ item }) => (
                      <Text style={styles.title}>{item.node.name}</Text>
                    )}
                    keyExtractor={item => item.node.id}
                  /> 

                </View>
            </TouchableOpacity>
            }
        </AppContext.Consumer>
        );
}

//
const styles = {
  mainDetails: {
    padding: 30,
    alignItems: 'center'
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    marginTop: 20
  }
}

export default Repositories;