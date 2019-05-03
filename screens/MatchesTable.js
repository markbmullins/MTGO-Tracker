import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import _getAllData from '../utils/getAllData';
import { DataTable } from 'react-native-paper';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class MatchesTable extends React.Component {
  static navigationOptions = {
    title: 'Matches'
  };

  state = {
    matches: [],
    headings: ['Deck', 'Opp Deck', 'Win Match', 'Time/Date'],
    dateSortDirection: 'descending',
    deckSortDirection: 'descending',
    winSortDirection: 'descending',
    recordSortDirection: 'descending'
  };

  syncTable() {
    _getAllData()
      .then(response => this.setState({ matches: this.parseMatches(response) }))
      .catch(err => console.log('err: ', err));
  }

  parseMatches(response) {
    if (!Array.isArray(response)) return [];
    let matches = [];
    response.forEach(element => {
      const time = element[0];
      let match = JSON.parse(element[1]);
      match.time = time;
      matches.push(match);
    });
    return matches;
  }

  switchSortDirection(direction) {
    if (direction === 'ascending') return 'descending';
    else return 'ascending';
  }

  renderTableRows(match) {
    return (
      <DataTable.Row style={styles.body} key={match.time.toString()}>
        <DataTable.Cell>{match.deck}</DataTable.Cell>
        <DataTable.Cell>{match.opponentDeck}</DataTable.Cell>
        <DataTable.Cell>{match.time}</DataTable.Cell>
        <DataTable.Cell>{match.winMatch ? 'Yes' : 'No'}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  printWinLose(bool) {
    return bool ? 'Win' : 'Lose';
  }

  printPlayDraw(bool) {
    return bool ? 'Play' : 'Draw';
  }

  _alert(match) {
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
  }

  render() {
    const { matches, deckSortDirection, headings } = this.state;
    const element = data => (
      <TouchableOpacity onPress={() => this._alert(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Details</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.syncTable()} />
        <ScrollView>
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={headings} style={styles.head} textStyle={styles.text} />

            {matches.map((match, index) => (
              <TableWrapper key={index} style={styles.row}>
                <Cell
                  key={match.deck}
                  data={match.deck}
                  textStyle={styles.text}
                />
                <Cell
                  key={match.opponentdeck}
                  data={match.opponentDeck}
                  textStyle={styles.text}
                />
                <Cell
                  key={match.winMatch}
                  data={match.winMatch ? 'Yes' : 'No'}
                  textStyle={styles.text}
                />
                <Cell
                  key={match.time}
                  data={match.time}
                  textStyle={styles.text}
                />
                <Cell
                  key={index + 10}
                  data={element(match)}
                  textStyle={styles.text}
                />
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff'
  },
  head: { height: 40, backgroundColor: '#f1f8ff', flexDirection: 'row' },
  text: { margin: 0 },
  alert: { margin: 2, textAlign: 'left', fontWeight: '100' },
  row: { flexDirection: 'row', backgroundColor: '#ffffff' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#ffffff' }
});
