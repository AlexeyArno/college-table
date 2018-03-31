import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';

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
    width: 40,
    fontSize: 26,
    color:`#fff`,
    textAlign:'center',
    backgroundColor: "#d6d6d6",
    borderRadius: 20,

  },
});

const Row = (props) => (
  <TouchableOpacity  onPress={() => props.onPress(props.name)}  underlayColor="white">
    <View style={styles.container}>
      <Text style={styles.photo}>
        {props.name[2]}
      </Text>
      <Text style={styles.text}>
        {props.name}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Row;
