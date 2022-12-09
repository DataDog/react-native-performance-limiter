package com.perfkiller

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.lang.RuntimeException
import java.util.Date

class PerfKillerModule internal constructor(context: ReactApplicationContext) :
  NativePerfKillerSpec(context) {

  override fun getName(): String {
    return NAME
  }

  override fun blockNativeMainThread(durationMs: Double, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
        val startTime = Date().time
        while((Date().time - startTime) < durationMs.toLong()) {
          // do nothing
        }
    }
    promise.resolve(null)
  }

  override fun crashNativeMainThread(message: String, promise: Promise) {
    throw RuntimeException(message)
    promise.resolve(null)
  }

  companion object {
    const val NAME = "PerfKiller"
  }
}
