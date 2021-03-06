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
  BackHandler,
  ListView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';
import ScheduleRow from './ScheduleRow'
import { ListItem } from 'react-native-material-ui';


export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {    };
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  back(){
    this.props.back()
  }

  componentWillMount=()=>{

    BackHandler.addEventListener('hardwareBackPress',  this.handleBackButton)
  }
  //
  componentWillUnmount=()=>{
    BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButton)
  }

  handleBackButton() {
       // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
       this.props.back()
       return true;
   }

   getTdContent=(TDElement)=>{
     return TDElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data
   }


getSchedule=()=>{
  let CTable = Number(this.props.currentGroup[0])-1;
  let doc = this.props.doc
  CTable = Array.from(doc.getElementsByTagName('table'))[CTable];
  let lessons = Array.from(CTable.childNodes).filter((item)=>item.localName == "tr")
  let group = Array.from(lessons.slice()[0].childNodes).filter((item)=>item.localName == "td");
  lessons.splice(0,1)
  group.splice(-1,1)
  let name = this.props.currentGroup;

  let FailsOfTables = [];

  let currentIndex = 0;


  let firstLesson = Array.from(lessons.slice()[0].childNodes).filter((item)=>item.localName == "td");
  firstLesson.splice(-1,1)

  for(var i=0;i<firstLesson.length-1;i++){

    if(firstLesson[i].textContent.includes("ПРАКТИКА")){
      FailsOfTables.push(i);
    }

    if(group[i].textContent.includes(name)){
      currentIndex = i;
    }
  }

  let raspisanie = {};
  let nowLesss;
  lessons.forEach((item,i)=>{
    nowLesss = Array.from(item.childNodes).filter((o)=>o.localName == "td")
    // Count bias
    if(FailsOfTables.indexOf(currentIndex)==-1 && i!=0){
      let count=0;
      FailsOfTables.forEach((it,j)=>{
        if(currentIndex>it) count++;
      })
      raspisanie[i] = nowLesss[currentIndex-count].textContent;
    }else{
      raspisanie[i] = firstLesson[currentIndex].textContent;
    }
  })

  // console.log(raspisanie)
  // this.setState({schedule: raspisanie});
  return raspisanie;

}



  render() {
    const schedule = this.getSchedule();
    const times={
      0:{start: "08:30",finish:"10:00"},
      1:{start: "10:10",finish:"11:40"},
      2:{start: "12:10",finish:"13:40"},
      3:{start: "13:50",finish:"15:20"},
      4:{start: "15:30",finish:"17:00"},
      5:{start: "17:10",finish:"18:40"}
    }
    let key=0;

    let cards=[];

    var exp = /[абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/;

    for(i in schedule){
      if(exp.test(schedule[i])){
        let a = schedule[i].split("")
        a = a.filter((item)=>item!='\n')
        a = a.join("")
        cards.push({value: a, time: times[i], key: i})
      }
    }



    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource= ds.cloneWithRows(cards)


    return (
      <View style={styles.container}>
        <Toolbar
          centerElement={this.props.currentGroup}
          leftElement="arrow-back"
          onLeftElementPress={()=>this.back()}
        />
        <ListView
          style={styles.container}
          dataSource={dataSource}
          renderRow={(data) => <ScheduleRow data={data}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  separator: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
 },
  cardText:{
    fontSize: 18
  }
});
