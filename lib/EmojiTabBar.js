import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

export default class EmojiTabBar extends Component {
  render() {
    let {
      tabs,
      activeTab,
      goToPage
    } = this.props;
    return (
      <View style={styles.container}>
        {tabs.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageWrapper,
                activeTab === index && styles.activeImage,
                { width: window.width / tabs.length }
              ]}
              onPress={() => goToPage(index)}>
              <Image
                style={[
                  styles.image,
                  { width: window.width / tabs.length }
                ]}
                resizeMode={'contain'}
                source={{ uri: image }} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 50,
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeImage: {
    backgroundColor: '#f6f6f6',
  },
  image: {
    height: 40
  }
});
