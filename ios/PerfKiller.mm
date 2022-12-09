#import "PerfKiller.h"

@implementation PerfKiller
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(blockNativeMainThread, withDurationMs:(double)durationMs resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDate *date = [NSDate date];
        while ([[NSDate date] timeIntervalSinceDate:date] < durationMs / 1000) {
            //do nothing
        }
        resolve(nil);
    });
}

RCT_REMAP_METHOD(crashNativeMainThread, withMessage:(NSString *)message resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [NSException raise:@"PerfKillerCrash" format:@"%@", message];
        resolve(nil);
    });
}


- (void)blockNativeMainThread:(double)durationMs resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDate *date = [NSDate date];
        while ([[NSDate date] timeIntervalSinceDate:date] < durationMs / 1000) {
            //do nothing
        }
        resolve(nil);
    });
}

- (void)crashNativeMainThread:(NSString *)message resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    dispatch_async(dispatch_get_main_queue(), ^{
        [NSException raise:@"PerfKillerCrash" format:@"%@", message];
        resolve(nil);
    });
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativePerfKillerSpecJSI>(params);
}
#endif

@end
