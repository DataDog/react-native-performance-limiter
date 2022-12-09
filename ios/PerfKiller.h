
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPerfKillerSpec.h"

@interface PerfKiller : NSObject <NativePerfKillerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PerfKiller : NSObject <RCTBridgeModule>
#endif

@end
