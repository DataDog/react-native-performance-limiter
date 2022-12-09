package com.perfkiller

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.lang.RuntimeException
import java.util.Date

class PerfKillerModule internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  override fun getName(): String {
    return PerfKillerModuleImpl.NAME
  }

  @ReactMethod
  fun blockNativeMainThread(durationMs: Double, promise: Promise) {
    PerfKillerModuleImpl.blockNativeMainThread(durationMs, promise)
  }

  @ReactMethod
  fun crashNativeMainThread(message: String, promise: Promise) {
    PerfKillerModuleImpl.crashNativeMainThread(message, promise)
  }

  companion object {
    const val NAME = "PerfKiller"
  }
}
