/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput 
} from 'react-native';

import Row from './GroupChoose/Row'
import Header from './GroupChoose/Header'
import Schedule from './Schedule'

import { Toolbar } from 'react-native-material-ui';




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class GroupChoose extends Component{
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      currentGroup: ""
    };
  }




  render() {
    let groups = this.props.groups.slice();
    groups = groups.filter((item)=>item.indexOf(this.state.input)!=-1 || this.state.input.length == 0);
    
    
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(groups)

    return (  
              (this.state.currentGroup.length == 0)?
              <View style={styles.container}>
              <Toolbar
                centerElement="Группа"
                searchable={{
                  autoFocus: true,
                  placeholder: 'Поиск',
                  onChangeText: function(text){this.setState({input:text})}.bind(this)
                }}
              />
                <ListView
                  style={styles.container}
                  dataSource={dataSource}
                  renderRow={(data) => <Row name={data} onPress={(text)=>{this.setState({currentGroup: text})}}/>}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
              </View>
              :<Schedule doc={this.props.doc} currentGroup={this.state.currentGroup} back={()=>this.setState({currentGroup: ""})}/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
    },
    separator: {
     flex: 1,
     height: StyleSheet.hairlineWidth,
     backgroundColor: '#8E8E8E',
   }
});
