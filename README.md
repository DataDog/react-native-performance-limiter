# react-native-perf-killer

A package for intentionally lowering performance and generating crashes on React Native applications.

## Installation

```sh
npm install react-native-perf-killer
```

```sh
yarn install react-native-perf-killer
```

## Usage

### Block the javascript thread

```js
import { blockJavascriptThread } from 'react-native-perf-killer';

blockJavascriptThread(1000); // blocks javascript thread for 1 second
```

### Block the native main thread

```js
import { blockNativeMainThread } from 'react-native-perf-killer';

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
import { crashJavascriptThread } from 'react-native-perf-killer';

crashJavascriptThread('custom error message');
```

### Crash the app from the native main thread

```js
import { crashNativeMainThread } from 'react-native-perf-killer';

crashNativeMainThread('custom error message');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
