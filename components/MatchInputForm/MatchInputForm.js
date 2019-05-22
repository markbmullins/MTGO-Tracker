import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import { format } from 'date-fns';
import _storeData from '../../utils/storeData';
import colors from '../../constants/Colors.js';

class MatchInputForm extends Component {
  state = {
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
    drawMatch: false,
    gameWins: 0,
    gameLosses: 0,
    gameDraws: 0,
    submitted: false
  };

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
      drawMatch: false,
      gameWins: 0,
      gameLosses: 0,
      gameDraws: 0,
      submitted: false
    });
  }

  cleanUpMatchObj(match) {
    const T = true;
    const F = false;

    let {
      winGameOne,
      drawGameOne,
      OTPGameOne,
      winGameTwo,
      drawGameTwo,
      OTPGameTwo,
      winGameThree,
      drawGameThree,
      OTPGameThree,
      winMatch,
      drawMatch,
      gameWins,
      gameLosses,
      gameDraws,
      ...rest
    } = match;

    //Win game 1 & 2
    if (winGameOne && winGameTwo) {
      winGameThree = undefined;
      OTPGameThree = undefined;
      winMatch = T;
      drawMatch = F;
      gameWins = 2;
      gameLosses = 0;
      gameDraws = 0;
    }

    //Win game 1 & 3
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = T;
      gameWins = 2;
      gameLosses = 1;
    }

    //Win game 2 & 3
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = T;
      gameWins = 2;
      gameLosses = 1;
    }

    //Win game 1
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = F;
      gameWins = 1;
      gameLosses = 2;
    }

    //Win game 2
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = F;
      gameWins = 1;
      gameLosses = 2;
    }

    //Win game 3
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = F;
      gameWins = 1;
      gameLosses = 2;
    }

    //Win no games
    if (winGameOne && winGameTwo && winGameThree) {
      winMatch = F;
      gameWins = 0;
      gameLosses = 2;
    }

    //Game one end in draw
    if (drawGameOne) {
      winGameThree = undefined;
      OTPGameThree = undefined;
      winGameTwo = undefined;
      OTPGameTwo = undefined;
      winMatch = F;
      drawMatch = T;
      gameWins = 2;
      gameLosses = 0;
      gameDraws = 1;
    }

    //Game two end in draw & won game 1
    if (drawGameTwo && winGameOne) {
      winGameThree = undefined;
      OTPGameThree = undefined;
      winMatch = T;
      drawMatch = F;
      gameWins = 1;
      gameLosses = 0;
      gameDraws = 1;
    }

    //Game two end in draw & lost game 1
    if (drawGameTwo && winGameOne) {
      winGameThree = undefined;
      OTPGameThree = undefined;
      winMatch = F;
      drawMatch = F;
      gameWins = 0;
      gameLosses = 1;
      gameDraws = 1;
    }

    //Game Three end in draw & lost game 1 & won game 2
    if (drawGameThree && winGameOne && winGameTwo) {
      winMatch = F;
      drawMatch = T;
      gameWins = 1;
      gameLosses = 1;
      gameDraws = 1;
    }

    //Game Three end in draw & won game 1 & lost game 2
    if (drawGameThree && winGameOne && winGameTwo) {
      winMatch = F;
      drawMatch = T;
      gameWins = 1;
      gameLosses = 1;
      gameDraws = 1;
    }

    return {
      winGameOne,
      drawGameOne,
      OTPGameOne,
      winGameTwo,
      drawGameTwo,
      OTPGameTwo,
      winGameThree,
      drawGameThree,
      OTPGameThree,
      winMatch,
      drawMatch,
      gameWins,
      gameLosses,
      gameDraws,
      ...rest
    };
  }

  handleSubmit() {
    const { submitted, ...match } = this.state;
    const cleanedUpmatch = this.cleanUpMatchObj(match);
    if (cleanedUpmatch !== null) {
      _storeData(this.getCurrentTime(), JSON.stringify(cleanedUpmatch));
    }
    this.clearForm();
  }

  getCurrentTime() {
    return format(new Date(), 'MM/DD h:mm aa');
  }

  buttonSelected(otp) {
    return otp ? 'solid' : 'outline';
  }

  renderGameTwo(drewGameOne) {
    const { winGameTwo, OTPGameTwo, drawGameTwo } = this.state;
    const { titleText, container, buttonContainer, gameContainer } = styles;
    const buttonSelected = this.buttonSelected;

    if (!drewGameOne) {
      return (
        <View style={gameContainer}>
          <Text style={titleText}>Game Two:</Text>
          <View style={container}>
            <View style={buttonContainer}>
              <Button
                title="On the Play"
                raised
                selected
                type={buttonSelected(OTPGameTwo)}
                onPress={() => this.setState({ OTPGameTwo: true })}
              />
            </View>
            <View style={buttonContainer}>
              <Button
                title="On the Draw"
                raised
                selected
                type={buttonSelected(!OTPGameTwo)}
                onPress={() => this.setState({ OTPGameTwo: false })}
              />
            </View>
          </View>
          {drawGameTwo ? (
            false
          ) : (
            <CheckBox
              title="Win Game Two?"
              checked={winGameTwo}
              onPress={() => this.setState({ winGameTwo: !winGameTwo })}
            />
          )}
          {winGameTwo ? (
            false
          ) : (
            <CheckBox
              title="End in Draw?"
              checked={drawGameTwo}
              onPress={() =>
                this.setState({
                  drawGameTwo: !drawGameTwo
                })
              }
            />
          )}
        </View>
      );
    }
  }

  renderGameThree(wonGameOne, wonGameTwo, drewGameOne, drewGameTwo) {
    const shouldRenderGameThree =
      wonGameOne !== wonGameTwo && !drewGameOne && !drewGameTwo;
    const { winGameThree, OTPGameThree, drawGameThree } = this.state;
    const { titleText, container, buttonContainer, gameContainer } = styles;
    const buttonSelected = this.buttonSelected;

    if (shouldRenderGameThree) {
      return (
        <View style={gameContainer}>
          <Text style={titleText}>Game Three:</Text>
          <View style={container}>
            <View style={buttonContainer}>
              <Button
                title="On the Play"
                raised
                type={buttonSelected(OTPGameThree)}
                onPress={() => this.setState({ OTPGameThree: true })}
              />
            </View>
            <View style={buttonContainer}>
              <Button
                title="On the Draw"
                raised
                type={buttonSelected(!OTPGameThree)}
                onPress={() => this.setState({ OTPGameThree: false })}
              />
            </View>
          </View>

          {drawGameThree ? (
            false
          ) : (
            <CheckBox
              title="Win Game Three?"
              checked={winGameThree}
              onPress={() => this.setState({ winGameThree: !winGameThree })}
            />
          )}

          {winGameThree ? (
            false
          ) : (
            <CheckBox
              title="End in Draw?"
              checked={drawGameThree}
              onPress={() =>
                this.setState({
                  drawGameThree: drawGameThree
                })
              }
            />
          )}
        </View>
      );
    }
  }

  render() {
    const {
      opponentDeck,
      winGameOne,
      OTPGameOne,
      drawGameOne,
      winGameTwo,
      drawGameTwo,
      submitted
    } = this.state;
    const { form, input, titleText, container, buttonContainer, gameContainer, decksContainer } = styles;
    const buttonSelected = this.buttonSelected;
    const handleSubmit = this.handleSubmit;

    return (
      <View style={form}>
        <View style={decksContainer}>
        <Input
          style={input}
          value={this.state.deck}
          onChangeText={deck => this.setState({ deck })}
          label="Your deck"
          placeholder="Enter the name of your deck"
          ref={input => {
            this.textInput = input;
          }}
        />
        <Input
          style={input}
          value={opponentDeck}
          onChangeText={opponentDeck => this.setState({ opponentDeck })}
          label="Opponent's deck"
          placeholder="Enter the name of your opponent's deck"
          ref={input => {
            this.textInput = input;
          }}
        />
        </View>
        <View style={gameContainer}>
          <Text style={titleText}>Game One:</Text>
          <View style={container}>
            <View style={buttonContainer}>
              <Button
                title="On the Play"
                raised
                selected
                type={buttonSelected(OTPGameOne)}
                onPress={() => this.setState({ OTPGameOne: true })}
              />
            </View>
            <View style={buttonContainer}>
              <Button
                title="On the Draw"
                raised
                selected
                type={buttonSelected(!OTPGameOne)}
                onPress={() => this.setState({ OTPGameOne: false })}
              />
            </View>
          </View>
          {drawGameOne ? (
            false
          ) : (
            <CheckBox
              title="Win Game One?"
              checked={winGameOne}
              onPress={() => {
                this.setState({
                  winGameOne: !winGameOne,
                  OTPGameTwo: false
                });
              }}
            />
          )}
          {winGameOne ? (
            false
          ) : (
            <CheckBox
              title="End in Draw?"
              checked={drawGameOne}
              onPress={() =>
                this.setState({
                  drawGameOne: !drawGameOne
                })
              }
            />
          )}
        </View>
        {this.renderGameTwo(drawGameOne)}
        {this.renderGameThree(winGameOne, winGameTwo, drawGameOne, drawGameTwo)}
        <Button
          title="Submit"
          raised
          selected
          type={buttonSelected(submitted)}
          onPress={() => {
            this.setState({ submitted: true });
            handleSubmit();
          }}
        />
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
    color: colors.headingColor,
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
  gameContainer: {
    padding:1,
  },
  decksContainer: {
    padding:1,
  }
});

export default MatchInputForm;
