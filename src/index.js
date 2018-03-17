import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EmojiTabBar from '../lib/EmojiTabBar';
import EmojiDotTabBar from '../lib/EmojiDotTabBar';

const EMOJI_PAGE_SIZE = 7 * 3;

export default class EmojiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(this.props.selectedPanel !== 'keyboard' ? 250 : 0),
    };
  }

  componentDidUpdate() {
    Animated.timing(this.state.height, {
      duration: 300,
      toValue: this.props.selectedPanel !== 'keyboard' ? 250 : 0
    }).start();
  }

  render() {
    let { emojis } = this.props;
    let { height } = this.state;

    return (
      <Animated.View style={{ height }}>
        <ScrollableTabView
          renderTabBar={(props) => <EmojiTabBar {...props} />}
          tabBarPosition='bottom'>
            {Object.keys(emojis).map((key, groupIndex) => {
              let pageView = [];
              let totalCount = emojis[key].length;
              let pageCount = Math.ceil(totalCount / EMOJI_PAGE_SIZE);

              for (let i = 0; i < pageCount; i++) {
                let pageEmojis = emojis[key].slice(i * EMOJI_PAGE_SIZE, (i + 1) * EMOJI_PAGE_SIZE);
                pageView.push(
                  <View
                    key={`${key}_group_${i}`}
                    style={styles.pageView}
                    tabLabel={`${key}_group_${i}`}>
                    {pageEmojis.map((emoji, emojiIndex) => {
                      return (
                        <TouchableOpacity
                          key={emojiIndex}
                          style={styles.image}
                          onPress={() => this.props.handleEmojiPress(emoji)}>
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
                  key={groupIndex}
                  renderTabBar={(props) => <EmojiDotTabBar {...props} />}
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

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: (window.width - 10) / 7,
    padding: 5
  },
  pageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
