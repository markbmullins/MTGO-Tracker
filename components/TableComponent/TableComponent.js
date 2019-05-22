import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert, Button
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import AngleButton from '../AngleButton/AngleButton';
import MatchDetails from '../MatchDetails/MatchDetails'
//import Cryptic from '../../assets/images/cryptic'

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    //showMatchDetails.bind(this);
  }

  printWinLose = function(bool) {
    return bool ? 'Win' : 'Lose';
  };

  printPlayDraw = function(bool) {
    return bool ? 'Play' : 'Draw';
  };

  _alert = function(match) {
    const {
      deck,
      opponentDeck,
      winGameOne,
      OTPGameOne,
      winGameTwo,
      OTPGameTwo,
      winGameThree,
      OTPGameThree,
      winMatch,
      gameWins,
      gameLosses
    } = match;

    const w = this.printWinLose;
    const p = this.printPlayDraw;
    const decks = 'Deck: ' + deck + '\n' + 'Opp: ' + opponentDeck + '\n';
    const record = 'Record: ' + gameWins + ' - ' + gameLosses + '\n';
    const gameOne = 
      'G1:  ' + w(winGameOne) + '\n' + 'Play/Draw: ' + p(OTPGameOne) + '\n';
    const gameTwo =
      'G2:  ' + w(winGameTwo) + '\n' + 'Play/Draw: ' + p(OTPGameTwo) + '\n';
    const gameThree =
      'G3 ' + w(winGameThree) + '\n' + 'Play/Draw: ' + p(OTPGameThree);

    let alert = decks + record + gameOne + gameTwo;
    if (winGameThree !== undefined && OTPGameThree !== undefined)
      alert += gameThree;

    Alert.alert(alert);
  };

  showMatchDetails(match) {
    console.log('Props: ', this.props);
    console.log("match::: ", match);
    this.props.navigation.navigate('Details', {match: match});
  }

  render() {
    const { matches} = this.props;
    return (

      <View>
        {matches.map((match, i) => (
          <ListItem
            title={`${match.deck} vs. ${match.opponentDeck}`}
            subtitle={`${match.gameWins} - ${match.gameLosses}`}
            chevron
            topDivider
            bottomDivider
            onPress={()=>this.showMatchDetails(match)}
            key={i}
          />
        ))}
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  form: { flex: 1, padding: 10, marginTop: 30 },
  baseText: {},
  input: {
    padding: 1000
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'roboto-regular',
    color: '#2089dc',
    margin: 5
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  buttonContainer: {
    flex: 1,
    margin: 5
  },
  item: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#D3D3D3'
  },
  rightButton: {
    position: 'relative'
  }
});
