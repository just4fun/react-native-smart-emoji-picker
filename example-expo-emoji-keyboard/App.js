import React from 'react';
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import EmojiPicker from 'react-native-smart-emoji-picker';
import CUSTOM_EMOJIS from './customEmojis';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPanel: 'keyboard',
      content: ''
    };
    this.contentCursorLocation = 0;
  }

  showKeyboard = () => {
    this.contentInput.focus();
    this.setState({ selectedPanel: 'keyboard' });
  }

  hideKeyboard = () => {
    let { selectedPanel } = this.state;
    if (selectedPanel === 'keyboard') {
      Keyboard.dismiss();
    }
    if (selectedPanel === 'emoji') {
      this.setState({ selectedPanel: 'keyboard' });
    }
  }

  handleContentInputFocus = () => {
    this.setState({ selectedPanel: 'keyboard' });
  }

  handleContentSelectionChange = (event) => {
    this.contentCursorLocation = event.nativeEvent.selection.start;
  }

  handleChangeText = (text) => {
    this.setState({ content: text });
  }

  handlePanelSelect = (item) => {
    if (item !== 'keyboard') {
      Keyboard.dismiss();
    } else {
      this.showKeyboard();
    }
    this.setState({ selectedPanel: item });
  }

  handleEmojiPress = (emoji) => {
    this.setState((prevState) => {
      let newContent = prevState.content.substr(0, this.contentCursorLocation)
                     + emoji.code
                     + prevState.content.substr(this.contentCursorLocation);
      return { content: newContent };
    });
  }

  render() {
    let { selectedPanel, content } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <KeyboardAccessory>
            <View style={styles.keyboardAccessoryContainer}>
              <TextInput
                ref={component => this.contentInput = component}
                style={styles.input}
                value={content}
                onFocus={this.handleContentInputFocus}
                onSelectionChange={this.handleContentSelectionChange}
                onChangeText={this.handleChangeText}
                // `onSelectionChange` will only be invoked by `setState({ content })` when `multiline={true}`,
                // I think it's a bug in React Native.
                multiline={true}
                placeholder='Click me!' />
              {selectedPanel === 'emoji' &&
                <Icon
                  style={styles.keyboardAccessoryItem}
                  name='keyboard-o'
                  size={30}
                  onPress={this.handlePanelSelect.bind(this, 'keyboard')} />
                ||
                <Icon
                  style={styles.keyboardAccessoryItem}
                  name='smile-o'
                  size={30}
                  onPress={this.handlePanelSelect.bind(this, 'emoji')} />
              }
              <Icon
                style={styles.keyboardAccessoryItem}
                name='angle-down'
                size={30}
                onPress={this.hideKeyboard} />
            </View>
            <EmojiPicker
              emojis={CUSTOM_EMOJIS}
              show={selectedPanel === 'emoji'}
              onEmojiPress={this.handleEmojiPress} />
          </KeyboardAccessory>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  keyboardAccessoryContainer: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  keyboardAccessoryItem: {
    color: '#979797',
    marginLeft: 10
  },
  input: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff'
  },
});
