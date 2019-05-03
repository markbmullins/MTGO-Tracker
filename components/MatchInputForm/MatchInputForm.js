import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import _storeData from '../../utils/storeData';
import { format } from 'date-fns';

/*
 * TODO: Work on styling
 *
 */
class MatchInputForm extends Component {
  state = {
    deck: '',
    opponentDeck: '',
    winGameOne: false,
    OTPGameOne: false,
    winGameTwo: false,
    OTPGameTwo: null,
    winGameThree: false,
    OTPGameThree: false,
    winMatch: false,
    gameWins: 0,
    gameLosses: 0,
    submitted: false,
    selected: false
  };
  // constructor(props) {
  //   super(props);
  // }
  handleChange(event) {
    // const _match = { ...match};
    // // computed property syntax
    // _match[event.target.name] = event.target.value;
    // this.setState({ match: _match})
  }

  clearForm() {
    this.textInput.clear();
    this.setState({
      deck: '',
      opponentDeck: '',
      winGameOne: false,
      OTPGameOne: false,
      drawGameOne: false,
      winGameTwo: false,
      OTPGameTwo: false,
      drawGameTwo: false,
      winGameThree: false,
      OTPGameThree: false,
      drawGameThree: false,
      winMatch: false,
      gameWins: 0,
      gameLosses: 0,
      submitted: false,
      selected: false
    });
  }

  cleanUpMatchObj(match) {
    if (match.winGameOne && match.winGameTwo) {
      match.winGameThree = undefined;
      match.OTPGameThree = undefined;
      match.winMatch = true;
      match.gameWins = 2;
      match.gameLosses = 0;
    }
    if (match.winGameOne && match.winGameThree) {
      match.winMatch = true;
      match.gameWins = 2;
      match.gameLosses = 1;
    }
    if (match.winGameTwo && match.winGameThree) {
      match.winMatch = true;
      match.gameWins = 2;
      match.gameLosses = 1;
    }
  }

  handleSubmit() {
    const { submitted, selected, ...match } = this.state;
    this.cleanUpMatchObj(match);
    if (match !== null) {
      _storeData(this.getNow(), JSON.stringify(match));
    }
    this.clearForm();
  }

  getNow() {
    const date = format(new Date(), 'MM/DD h:mm aa');
    return date;
  }
  renderGameThree(wonGameOne, wonGameTwo) {
    const shouldRenderGameThree = wonGameOne !== wonGameTwo;
    if (shouldRenderGameThree) {
      return (
        <View>
          <Text style={styles.titleText}>Game Three:</Text>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Play"
                raised
                type={this.buttonSelected(this.state.OTPGameThree)}
                onPress={() => this.setState({ OTPGameThree: true })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Draw"
                raised
                type={this.buttonSelected(!this.state.OTPGameThree)}
                onPress={() => this.setState({ OTPGameThree: false })}
              />
            </View>
          </View>
          <CheckBox
            title="Win Game Three?"
            checked={this.state.winGameThree}
            onPress={() =>
              this.setState({ winGameThree: !this.state.winGameThree })
            }
          />
          <CheckBox
            title="End in Draw?"
            checked={this.state.drawGameThree}
            onPress={() =>
              this.setState({ drawGameThree: !this.state.drawGameThree })
            }
          />
        </View>
      );
    }
  }

  buttonSelected(otp) {
    if (otp === true) {
      return 'solid';
    }
    return 'outline';
  }

  render() {
    return (
      <View style={styles.form}>
        <Input
          style={styles.input}
          value={this.state.deck}
          onChangeText={deck => this.setState({ deck })}
          label="Your deck"
          placeholder="Enter the name of your deck"
          ref={input => {
            this.textInput = input;
          }}
        />
        <Input
          style={styles.input}
          value={this.state.opponentDeck}
          onChangeText={opponentDeck => this.setState({ opponentDeck })}
          label="Opponent's deck"
          placeholder="Enter the name of your opponent's deck"
          ref={input => {
            this.textInput = input;
          }}
        />
        <View>
          <Text style={styles.titleText}>Game One:</Text>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Play"
                raised
                selected
                type={this.buttonSelected(this.state.OTPGameOne)}
                onPress={() => this.setState({ OTPGameOne: true })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Draw"
                raised
                selected
                type={this.buttonSelected(!this.state.OTPGameOne)}
                onPress={() => this.setState({ OTPGameOne: false })}
              />
            </View>
          </View>
          <CheckBox
            title="Win Game One?"
            checked={this.state.winGameOne}
            onPress={() => {
              this.setState({
                winGameOne: !this.state.winGameOne,
                OTPGameTwo: false
              });
            }}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Game Two:</Text>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Play"
                raised
                selected
                type={this.buttonSelected(this.state.OTPGameTwo)}
                onPress={() => this.setState({ OTPGameTwo: true })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="On the Draw"
                raised
                selected
                type={this.buttonSelected(!this.state.OTPGameTwo)}
                onPress={() => this.setState({ OTPGameTwo: false })}
              />
            </View>
          </View>
          <CheckBox
            title="Win Game Two?"
            checked={this.state.winGameTwo}
            onPress={() =>
              this.setState({ winGameTwo: !this.state.winGameTwo })
            }
          />
        </View>
        {this.renderGameThree(this.state.winGameOne, this.state.winGameTwo)}
        <Button
          title="Submit"
          raised
          selected
          type={this.buttonSelected(this.state.submitted)}
          onPress={() => {
            this.setState({ submitted: true });
            this.handleSubmit();
          }}
        />
      </View>
    );
  }
}
const width = '100%';
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
  }
});
export default MatchInputForm;
