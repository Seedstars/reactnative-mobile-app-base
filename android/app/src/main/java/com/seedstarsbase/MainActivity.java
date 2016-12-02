package com.seedstarsbase;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.RNBranchPackage;
import io.branch.rnbranch.*;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "seedstarsbase";
    }
    @Override
   protected void onStart() {
       super.onStart();
       RNBranchModule.initSession(this.getIntent().getData(), this);
   }

   @Override
   public void onNewIntent(Intent intent) {
       this.setIntent(intent);
   }
}
