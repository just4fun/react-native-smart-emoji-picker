import React from 'react';
import {
  View,
  Alert,
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
  }

  showKeyboard = () => {
    this.contentInput.focus();
    // https://github.com/facebook/react-native/issues/18003
    //
    // This is workaround to bypass the keyboard bug above on iOS 11.2,
    // which will fire `keyboardWillShow` while keyboard dismiss.
    this.setState({
      selectedPanel: 'keyboard'
    });
  }

  hideKeyboard = () => {
    let { selectedPanel } = this.state;

    if (selectedPanel === 'keyboard') {
      Keyboard.dismiss();
    }

    if (selectedPanel === 'emoji') {
      this.setState({
        selectedPanel: 'keyboard'
      });
    }
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

  handleContentSelectionChange(event) {
    this.contentCursorLocation = event.nativeEvent.selection.start;
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
                onFocus={() => this.setState({
                  // https://github.com/facebook/react-native/issues/18003
                  //
                  // See more details in `showKeyboard()` method.
                  selectedPanel: 'keyboard'
                })}
                onSelectionChange={(event) => this.handleContentSelectionChange(event)}
                onChangeText={(text) => this.setState({ content: text })}
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
              showEmojiPicker={selectedPanel === 'emoji'}
              handleEmojiPress={this.handleEmojiPress} />
          </KeyboardAccessory>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fa7ff'
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
