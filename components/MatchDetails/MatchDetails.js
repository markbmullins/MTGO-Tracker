import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert, Button
  } from 'react-native';

class MatchDetails extends Component {
    constructor(props){
        super(props);
    }
    printWinLose = function(bool) {
        return bool ? 'Win' : 'Lose';
      };
    
      printPlayDraw = function(bool) {
        return bool ? 'Play' : 'Draw';
      };
    
      details = function(match) {
        if(!match) return "no match";
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
    
        return alert;
      };

    render() { 
        const { navigation } = this.props;
        const match = navigation.getParam('match', null);
        return ( <Text>{this.details(match)}</Text> );
    }
}
 
export default MatchDetails;