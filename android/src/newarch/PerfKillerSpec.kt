package com.perfkiller

import com.facebook.react.bridge.ReactApplicationContext

abstract class PerfKillerSpec internal constructor(context: ReactApplicationContext) :
  NativePerfKillerSpec(context) {
}
