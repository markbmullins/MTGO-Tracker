import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import _getAllData from '../utils/getAllData';
import { DataTable } from 'react-native-paper';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TableComponent from '../components/TableComponent/TableComponent';

export default class MatchesTable extends React.Component {
  static navigationOptions = {
    title: 'Matches'
  };

  state = {
    matches: [],
    headings: ['Deck', 'Opp Deck', 'Win Match', 'Time/Date'],
    loading: false,
    dateSortDirection: 'descending',
    deckSortDirection: 'descending',
    winSortDirection: 'descending',
    recordSortDirection: 'descending',

  };

  syncTable() {
    this.setState({loading: true});
    _getAllData()
      .then(response => {
        console.log('all match data: ', response);
        this.setState({ matches: this.parseMatches(response), loading:false });
      })
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

  render() {
    const { matches, headings } = this.state;
    const {...props} = this.props;
    console.log('Props: ', this.props);
    return (
      <View>
        <NavigationEvents onWillFocus={() => this.syncTable()} />
        <ScrollView>
        <TableComponent matches={matches} headings={headings} {...props}/>
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
