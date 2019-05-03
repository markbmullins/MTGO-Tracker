import React from "react";
import { PropTypes } from "prop-types";
import { AppRegistry, Text, StyleSheet } from 'react-native';

const TextInput = ({ id, name, value, label, onChange, error }) => {
  return (
    <div>
      {/* <Text style={styles.baseText}><label htmlFor={id}>{label}</label></Text> */}
      <br />
      <input
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
      <br />
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInput.defaultProps = {
  error: ""
};

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
export default TextInput;