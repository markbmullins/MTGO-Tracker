import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

export default class AngleButton extends React.Component {
  render() {
    return (
      <FontAwesome
        name={Platform.OS === 'ios' ? 'angle-right' : 'angle-right'}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}