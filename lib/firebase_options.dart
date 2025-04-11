import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError(
        'Web is not supported yet - configure Firebase for Web',
      );
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'Windows is not supported yet.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'Linux is not supported yet.',
        );
      default:
        throw UnsupportedError(
          'Unknown platform ${defaultTargetPlatform}',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyC9QP4I0T7YV7UgyJ_sQpyiQUl1v6O7W1A',
    appId: '1:123456789012:android:abcdef1234567890',
    messagingSenderId: '123456789012',
    projectId: 'moduped-dc88a',
    storageBucket: 'moduped-dc88a.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAsgYXtLGDN0ulzFnNIi7vK5NB8RZhFdxw',
    appId: '1:123456789012:ios:abcdef1234567890',
    messagingSenderId: '123456789012',
    projectId: 'moduped-dc88a',
    storageBucket: 'moduped-dc88a.appspot.com',
    iosClientId: '123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAsgYXtLGDN0ulzFnNIi7vK5NB8RZhFdxw',
    appId: '1:123456789012:ios:abcdef1234567890',
    messagingSenderId: '123456789012',
    projectId: 'moduped-dc88a',
    storageBucket: 'moduped-dc88a.appspot.com',
    iosClientId: '123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
  );
} 