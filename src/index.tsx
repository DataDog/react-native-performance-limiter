import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-perf-killer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PerfKillerModule = isTurboModuleEnabled
  ? require('./NativePerfKiller').default
  : NativeModules.PerfKiller;

const PerfKiller = PerfKillerModule
  ? PerfKillerModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const crashNativeMainThread = (
  errorMessage: string = 'react-native-perf-killer crashed the native main thread'
): Promise<void> => {
  return PerfKiller.crashNativeMainThread(errorMessage);
};

export const blockNativeMainThread = (durationMs: number): Promise<void> => {
  return PerfKiller.blockNativeMainThread(durationMs);
};

export const crashJavascriptThread = (
  errorMessage: string = 'react-native-perf-killer crashed the javascript thread'
) => {
  throw new Error(errorMessage);
};

export const blockJavascriptThread = (durationMs: number) => {
  const start = Date.now();
  while (Date.now() - start < durationMs) {
    // wait in while loop until duration is reached
  }
};
