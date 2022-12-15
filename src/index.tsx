import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-performance-limiter' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PerfLimiterModule = isTurboModuleEnabled
  ? require('./NativePerfKiller').default
  : NativeModules.PerfKiller;

const PerfLimiter = PerfLimiterModule
  ? PerfLimiterModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const crashNativeMainThread = (
  errorMessage: string = 'react-native-performance-limiter crashed the native main thread'
): Promise<void> => {
  return PerfLimiter.crashNativeMainThread(errorMessage);
};

export const blockNativeMainThread = (durationMs: number): Promise<void> => {
  return PerfLimiter.blockNativeMainThread(durationMs);
};

export const crashJavascriptThread = (
  errorMessage: string = 'react-native-performance-limiter crashed the javascript thread'
) => {
  throw new Error(errorMessage);
};

export const blockJavascriptThread = (durationMs: number) => {
  const start = Date.now();
  while (Date.now() - start < durationMs) {
    // wait in while loop until duration is reached
  }
};
