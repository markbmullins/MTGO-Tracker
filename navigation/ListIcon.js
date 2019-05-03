import React from 'react';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class ListIcon extends React.Component {
  render() {
    return (
      <Feather
        name="list"
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
