import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'kotelezo');
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


  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24, marginTop: 40 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ film_id }, index) => film_id}
            renderItem={({ item }) => (

              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center' }}> {item.iro_nev}</Text>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center' }}>{item.konyv_nev}</Text>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center' }}>{item.mufaj_nev}</Text>
                <Image source={{ uri: IP.ipcim+item.konyv_kep }} style={{ width: 300, height: 450, alignSelf: 'center' }} />
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