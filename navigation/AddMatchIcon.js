import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class AddMatchIcon extends React.Component {
  render() {
    return (
      <AntDesign name='plussquareo'
      size={26}
      style={{ marginBottom: -3 }}
      color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
    );
  }
}
