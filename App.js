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
  View
} from 'react-native';

import { Bars } from 'react-native-loader';
import GroupChoose from './GroupChoose'
import { COLOR, ThemeProvider } from 'react-native-material-ui';



var DomParser = require('react-native-html-parser').DOMParser



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {doc: null, groups: [], load: 0};
  }
            
  componentWillMount(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.novkrp.ru/raspisanie.htm', true);
    xhr.send();
    xhr.onreadystatechange = function() { // (3)
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        this.setState({
          load:2
        })
      } else {
        // console.log(xhr.responseText);
        let doc = new DomParser().parseFromString(xhr.responseText,'text/html')
        
        let tables = Array.from(doc.getElementsByTagName('table'));
         
        let groupsNames=[];
        let array = [];
        let groups=[];
         tables.forEach((table)=>{
           array= Array.from(table.childNodes)
           groups = array.filter((item)=>item.localName == 'tr')[0].childNodes;
           groups =  Array.from(groups).filter((item)=>item.localName == "td");
           groups.forEach((item)=>{
            groupsNames.push(item.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data)
           })
         })
         groupsNames = groupsNames.filter((item)=>item!=" ");
         this.setState({
           doc, groups: groupsNames, load:1
         })
      }

  }.bind(this)
}
  
  
  render() {
    return ( <ThemeProvider uiTheme={uiTheme}>
                {(this.state.load==0)
                    ?<View style={styles.container}>
                       <Bars  size={10} color={COLOR.green500} />
                    </View>
                    :<GroupChoose groups={this.state.groups} doc={this.state.doc}/>
                  }
            </ThemeProvider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
