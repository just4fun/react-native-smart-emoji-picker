import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EmojiTabBar from '../lib/EmojiTabBar';
import EmojiDotTabBar from '../lib/EmojiDotTabBar';

const window = Dimensions.get('window');

export default class EmojiPicker extends Component {
  static defaultProps = {
    show: true,
    height: 250,
    rows: 3,
    columns: 7
  }

  constructor(props) {
    super(props);
    this.state = {
      animatedHeight: new Animated.Value(props.show ? props.heigth : 0),
    };
  }

  componentDidUpdate() {
    let { show, height } = this.props;
    Animated.timing(this.state.animatedHeight, {
      duration: 300,
      toValue: show ? height : 0
    }).start();
  }

  renderEmojiTabBar = (props) => {
    return (
      this.props.show &&
        <EmojiTabBar {...props} />
        ||
        <View></View>
    );
  }

  renderEmojiDotTabBar(props) {
    return (
      <EmojiDotTabBar {...props} />
    );
  }

  handleEmojiPress(emoji) {
    this.props.onEmojiPress(emoji);
  }

  render() {
    let {
      emojis,
      show,
      rows,
      columns
    } = this.props;

    if (!emojis || emojis.length === 0) {
      throw new Error('`emojis` required. You should pass your custom memes as array to `emojis`.');
    }

    let { animatedHeight } = this.state;
    let emojiPageSize = rows * columns;

    return (
      <Animated.View style={{ height: animatedHeight }}>
        <ScrollableTabView
          renderTabBar={this.renderEmojiTabBar}
          tabBarPosition='bottom'>
            {Object.keys(emojis).map((key, categoryIndex) => {
              let pageView = [];
              let totalCount = emojis[key].length;
              let pageCount = Math.ceil(totalCount / emojiPageSize);

              for (let i = 0; i < pageCount; i++) {
                let pageEmojis = emojis[key].slice(i * emojiPageSize, (i + 1) * emojiPageSize);
                pageView.push(
                  <View
                    key={`category_${categoryIndex}_page_${i}`}
                    style={styles.pageView}
                    tabLabel={`category_${categoryIndex}_page_${i}`}>
                    {pageEmojis.map((emoji, emojiIndex) => {
                      return (
                        <TouchableOpacity
                          key={`category_${categoryIndex}_page_${i}_emoji_${emojiIndex}`}
                          style={[
                            styles.image,
                            { width: (window.width - 10) / columns }
                          ]}
                          onPress={this.handleEmojiPress.bind(this, emoji)}>
                          <Image
                            style={styles.image}
                            resizeMode={'contain'}
                            source={{ uri: emoji.image }} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              }

              return (
                <ScrollableTabView
                  key={`category_${categoryIndex}`}
                  renderTabBar={this.renderEmojiDotTabBar}
                  tabLabel={emojis[key][0].image}
                  tabBarPosition='bottom'>
                  {pageView}
                </ScrollableTabView>
              );
            })}
        </ScrollableTabView>
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  image: {
    height: 50,
    padding: 5
  },
  pageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
