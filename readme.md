# ReactCasting

Raycasting algorithm that renders pseudo 3D scene in HTML using React (no canvas) and renders as text in textarea or console

![main](main.gif)

## Features

- Textures
- Sprites
- Simple lighting system
- Rendering scene in \<textarea>
- Rendering scene in Chrome console

### Rendering scene using \<div> elements

Everything you see is built by HTML5 \<div> using React

![div-example](div-example.png)

### Rendering scene as text inside \<textarea>

![div-example](textarea-example.gif)

### Via NPM

```sh
npm install --save  react-native-debounce-input
```

### Via Yarn

```sh
yarn add react-native-debounce-input
```

## Usage

```js
import React, { useState, createRef } from "react";
import { SafeAreaView, Text } from "react-native";
import DelayInput from "react-native-debounce-input";

const YourComponent = () => {
  const [value, setValue] = useState("Have");
  const inputRef = createRef();

  return (
    <SafeAreaView>
      <DelayInput
        value={value}
        minLength={3}
        inputRef={inputRef}
        onChangeText={setValue}
        delayTimeout={500}
        style={{ margin: 10, height: 40, borderColor: "gray", borderWidth: 1 }}
      />
      <Text>value: {value}</Text>
    </SafeAreaView>
  );
};

export default YourComponent;
```

## Props

#### `onChangeText:` (string | number) => void

A function called after some delay when a value is changed

#### `value?`: string | number (defalut: `''`)

Initial value of the input

#### `minLength?`: number (default: 3)

Minimal length of text to start notify, if value becomes shorter then `minLength` (after removing some characters), there will be a notification with empty value `''`.

#### `delayTimeout?`: number (default: 600)

Timeout to call `onChangeText` prop after last edit input text

#### `inputRef?`: React.refObject

Will pass `ref={inputRef}` to TextInput element. We needed to rename `ref` to `inputRef` since `ref` is a special prop in React and cannot be passed to children.

#### And also all props specified for React Native `TextInput` component

## License

MIT
