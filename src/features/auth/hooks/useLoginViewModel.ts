import { useCallback, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';

const GOOGLE_WEB_CLIENT_ID =
  '148236423672-6b7ldt1oj1qnoi02v367916s5engq7fu.apps.googleusercontent.com';

export function useLoginViewModel() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(prev => !prev);
  }, []);

  const logout = useCallback(async () => {
    try {
      const authInstance = getAuth();
      await firebaseSignOut(authInstance);
      await GoogleSignin.signOut();
    } catch (e) {
      console.log('Logout error:', e);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Sign out existing Google session to ensure Account Chooser prompt opens every time
      try {
        await GoogleSignin.signOut();
      } catch {
        // Ignore if no session was active
      }

      const signInResult = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      const idToken =
        signInResult.data?.idToken ||
        (signInResult as any).idToken ||
        tokens.idToken;
      const accessToken =
        tokens.accessToken ||
        (signInResult.data as any)?.accessToken;

      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token returned.');
      }

      const googleCredential = GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      const authInstance = getAuth();
      const userCredential = await signInWithCredential(
        authInstance,
        googleCredential,
      );

      console.log('Google Login Successful:', userCredential.user);
      return userCredential;
    } catch (error: any) {
      const message = error?.message || 'Google Sign-In failed';
      setErrorMessage(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    state: {
      identifier,
      password,
      passwordVisible,
      loading,
      errorMessage,
    },
    actions: {
      setIdentifier,
      setPassword,
      togglePasswordVisibility,
      loginWithGoogle,
      logout,
    },
  };
}
