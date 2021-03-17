package com.mynsapp;

import com.facebook.react.ReactActivity;

import android.os.Bundle; // 添加这一行
import org.devio.rn.splashscreen.SplashScreen;  // 添加这一行


public class MainActivity extends ReactActivity {
  // 添加这一个方法
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mynsapp";
  }
}
