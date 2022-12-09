import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  crashNativeMainThread(message: string): Promise<void>;
  blockNativeMainThread(durationMs: number): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PerfKiller');
