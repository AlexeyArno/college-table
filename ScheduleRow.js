import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 90,
    borderRadius: 20,
    marginTop: 20,
    color: COLOR.green500
  },
});


const ScheduleRow = (props) => (
  <View style={styles.container}>
    <Text style={styles.photo}>
      {`${props.data.time.start} - ${props.data.time.finish}`}
    </Text>
    <Text style={styles.text}>
      {props.data.value}
    </Text>
  </View>
);

export default ScheduleRow;
