import * as React from 'react';

import { StyleSheet, View, Text, Button, Animated } from 'react-native';
import {
  blockJavascriptThread,
  blockNativeMainThread,
  crashJavascriptThread,
  crashNativeMainThread,
} from 'react-native-performance-limiter';

export default function App() {
  const position = React.useRef(new Animated.Value(0)).current;
  const nativePosition = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(position, {
        toValue: 200,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [position]);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(nativePosition, {
        toValue: 200,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [nativePosition]);

  return (
    <View style={styles.container}>
      <Text>Javascript animation</Text>
      <Animated.View
        style={{ ...styles.box, transform: [{ translateX: position }] }}
      />
      <Text>Native animation</Text>
      <Animated.View
        style={{ ...styles.box, transform: [{ translateX: nativePosition }] }}
      />
      <Button
        title="block javascript thread 500ms"
        onPress={() => blockJavascriptThread(500)}
      />
      <Button
        title="block main thread 500ms"
        onPress={() => blockNativeMainThread(500)}
      />
      <Button
        title="crash javascript thread"
        onPress={() => crashJavascriptThread()}
      />
      <Button
        title="crash main thread"
        onPress={() => crashNativeMainThread()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 20,
    height: 20,
    marginVertical: 20,
    backgroundColor: 'blue',
  },
});
