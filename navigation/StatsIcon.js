import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

export default class StatsIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
