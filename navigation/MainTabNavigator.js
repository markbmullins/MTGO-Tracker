import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import AddMatchIcon from './AddMatchIcon';
import ListIcon from './ListIcon';
import StatsIcon from './StatsIcon'
import MatchesTable from '../screens/MatchesTable';

const AddMatchStack = createStackNavigator({
  AddMatch: HomeScreen,
});

AddMatchStack.navigationOptions = {
  tabBarLabel: 'Add Match',
  tabBarIcon: ({ focused }) => (
    <AddMatchIcon
      focused={focused}
    />
  ),
};

const MatchesTableStack = createStackNavigator({
  List: MatchesTable,
});

MatchesTableStack.navigationOptions = {
  tabBarLabel: 'Matches',
  tabBarIcon: ({ focused }) => (
    <ListIcon
      focused={focused}
    />
  ),
};

const StatsStack = createStackNavigator({
  Stats: SettingsScreen,
});

StatsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <StatsIcon
      focused={focused}
    />
  ),
};

export default createBottomTabNavigator({
  AddMatchStack,
  MatchesTableStack,
  StatsStack,
});
