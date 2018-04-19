# react-native-smart-emoji-picker

[![npm downloads](https://img.shields.io/npm/dm/react-native-smart-emoji-picker.svg)](https://www.npmjs.com/package/react-native-smart-emoji-picker)
[![version](https://img.shields.io/npm/v/react-native-smart-emoji-picker.svg)](https://www.npmjs.com/package/react-native-smart-emoji-picker)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/react-native-smart-emoji-picker.svg)](https://github.com/just4fun/react-native-smart-emoji-picker/issues)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

## Background

- This library was abstracted from my React Native app [stuhome](https://github.com/just4fun/stuhome) which was written for iOS only, so **maybe it didn't work in Android now**. But it's in my [Todo](#Todo).
- When I was developing my app, I found there are lots of emoji picker components for React Native, but all of them only support [regular emojis](https://github.com/iamcal/emoji-data), and what I need are custom memes, so I wrote my own. And yes, I will support regular emojis soon.
- The [custom emoji file](example-expo-emoji-keyboard/customEmojis.js) in example was crawled (but kept using image url instead of saving them) from the [offcial website](http://bbs.uestc.edu.cn/) which was built for a Chinese University, that said if there are any imporant events like National Congress helding in China, **the example won't work since anyone can't access any college internal websites when you are out of college internet during such 'important' time**. You should update custom emoji file accroding to [Data Structure](#data-structure).

## Preview

![iphoneX](https://user-images.githubusercontent.com/7512625/38934780-280b0726-434f-11e8-9f27-d1366b43ef75.gif)

## Installation

```bash
npm install --save react-native-smart-emoji-picker
```

or

```bash
yarn add react-native-smart-emoji-picker
```

## Usage

```javascript
import EmojiPicker from 'react-native-smart-emoji-picker';

<EmojiPicker
  emojis={CUSTOM_EMOJIS}
  show={true}
  onEmojiPress={this.handleEmojiPress} />
```

You can try it out with the working [example](example-expo-emoji-keyboard).

## Data Structure

```javascript
// CUSTOM_EMOJIS

{
  categoryOne: [
    {
      code: '[a:1178]', // The key which your app server can recognize and map to an unique image.
      image: 'http://bbs.uestc.edu.cn/static/image/smiley/alu/65.gif' // Custom emoji url or local image path.
    },
    {
      code: '[a:1179]',
      image: 'http://bbs.uestc.edu.cn/static/image/smiley/alu/66.gif'
    }
  ],
  categoryTwo: [
    {
      code: '[s:763]',
      image: 'http://bbs.uestc.edu.cn/static/image/smiley/lu/01.gif'
    }
  ]
}
```

## Props

- `emojis` _(Array)_ - Custom memes you want to display.
- `show` _(Boolean)_ - Whether to display emoji picker, defaults to `true`.
- `height` _(Integer)_ - Height for emoji picker, defaults to `250`.
- `rows` _(Integer)_ - How many rows for emoji you want to display in one page, defaults to `3`.
- `columns` _(Integer)_ - How many columns for emoji you want to display in one page, defaults to `7`.
- `onEmojiPress` _(Function)_ - Callback when a specific emoji is pressed.

## Todo

- [ ] Support Android
- [ ] Support [regular emojis](https://github.com/iamcal/emoji-data)

## License

[The MIT License](http://opensource.org/licenses/MIT)
