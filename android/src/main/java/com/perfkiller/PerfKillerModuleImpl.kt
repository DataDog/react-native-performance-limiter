package com.perfkiller

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Promise
import java.lang.RuntimeException
import java.util.Date

class PerfKillerModuleImpl {
  companion object {
    fun blockNativeMainThread(durationMs: Double, promise: Promise) {
      Handler(Looper.getMainLooper()).post {
        val startTime = Date().time
        while((Date().time - startTime) < durationMs.toLong()) {
          // do nothing
        }
        promise.resolve(null)
      }
    }

    fun crashNativeMainThread(message: String, promise: Promise) {
      throw RuntimeException(message)
      promise.resolve(null)
    }

    const val NAME = "PerfKiller"
  }
}
