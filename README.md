# react-native-performance-limiter

A package for intentionally lowering performance and generating crashes on React Native applications.

## Installation

```sh
npm install react-native-performance-limiter
```

```sh
yarn install react-native-performance-limiter
```

## Usage

### Block the javascript thread

```js
import { blockJavascriptThread } from 'react-native-performance-limiter';

blockJavascriptThread(1000); // blocks javascript thread for 1 second
```

### Block the native main thread

```js
import { blockNativeMainThread } from 'react-native-performance-limiter';

blockNativeMainThread(1000); // blocks native main thread for 1 second
```

Inside functions you can `await` for the block to be finised:

```js
const myfun = async () => {
  await blockNativeMainThread(1000);
  // do something else afterwards
};
```

### Crash the app from the javascript thread

```js
import { crashJavascriptThread } from 'react-native-performance-limiter';

crashJavascriptThread('custom error message');
```

### Crash the app from the native main thread

```js
import { crashNativeMainThread } from 'react-native-performance-limiter';

crashNativeMainThread('custom error message');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
