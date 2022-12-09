package com.perfkiller

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise
import java.lang.RuntimeException
import java.util.Date

class PerfKillerModule internal constructor(context: ReactApplicationContext) :
  NativePerfKillerSpec(context) {

  override fun getName(): String {
    return PerfKillerModuleImpl.NAME
  }

  override fun blockNativeMainThread(durationMs: Double, promise: Promise) {
    PerfKillerModuleImpl.blockNativeMainThread(durationMs, promise)
  }

  override fun crashNativeMainThread(message: String, promise: Promise) {
    PerfKillerModuleImpl.crashNativeMainThread(message, promise)
  }
}
