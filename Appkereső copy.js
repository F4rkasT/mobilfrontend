import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      keres: ''
    };
  }

  async getMovies() {
    try {
      const response = await fetch(IP.ipcim + 'kotelezo');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  kattintas = () => { 
   
       //alert(this.state.keres)

       var bemenet={
        bevitel1:this.state.keres
       
      }
fetch(IP.ipcim+'kereso', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      //alert(JSON.stringify(responseJson))
      this.setState({
   
        data: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
      }
    
  

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24, marginTop: 40, backgroundColor: 'rgb(245, 240, 230)'}}>
        <TextInput
          style={{ height: 40, marginTop: 40, fontSize: 30 }}
          placeholder="keress könyvet!"
          onChangeText={(beirtszoveg) => this.setState({ keres: beirtszoveg })}
          value={this.state.keres}
        />
        <TouchableOpacity
          style={{ backgroundColor: "grey", margin: 5 }}
          onPress={() => this.kattintas()}
        >
          <Text>Keresés</Text>
        </TouchableOpacity>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ film_id }, index) => film_id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center' }}>{item.konyv_cime}</Text>
                <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 300, height: 450, alignSelf: 'center' }} />
                <View style={{borderBottomWidth:5,borderBottomColor:'blue',padding:10}}></View>
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft: 30,
    marginRight: 30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});