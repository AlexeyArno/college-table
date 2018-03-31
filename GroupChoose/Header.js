import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});

const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Поиск..."
      onChangeText={(text) => props.change(text)}
    />
  </View>
);

export default Header;
