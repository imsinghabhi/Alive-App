import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from '@react-native-firebase/auth';
import { AuthUser } from '../../../store/slices/authSlice';

const GOOGLE_WEB_CLIENT_ID =
  '148236423672-6b7ldt1oj1qnoi02v367916s5engq7fu.apps.googleusercontent.com';

function mapFirebaseUser(user: FirebaseUser | null): AuthUser | null {
  if (!user) {
    return null;
  }
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

export const authService = {
  subscribeToAuthState(onUserChanged: (user: AuthUser | null) => void): () => void {
    const authInstance = getAuth();
    return onAuthStateChanged(authInstance, firebaseUser => {
      onUserChanged(mapFirebaseUser(firebaseUser));
    });
  },

  async loginWithGoogle() {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    try {
      await GoogleSignin.signOut();
    } catch {
      // Ignore if no prior active session
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

    return userCredential;
  },

  async loginWithEmailPassword(email: string, pass: string) {
    const authInstance = getAuth();
    try {
      return await signInWithEmailAndPassword(authInstance, email, pass);
    } catch (error: any) {
      // If user does not exist, try to create account
      if (
        error?.code === 'auth/user-not-found' ||
        error?.code === 'auth/invalid-credential'
      ) {
        return await createUserWithEmailAndPassword(authInstance, email, pass);
      }
      throw error;
    }
  },

  async signOutUser() {
    const authInstance = getAuth();
    await firebaseSignOut(authInstance);
    try {
      await GoogleSignin.signOut();
    } catch {
      // Ignore if Google session was not active
    }
  },

  async deleteUserAccount() {
    const authInstance = getAuth();
    const currentUser = authInstance.currentUser;
    if (currentUser) {
      try {
        await deleteUser(currentUser);
      } catch (e) {
        await firebaseSignOut(authInstance);
      }
    } else {
      await firebaseSignOut(authInstance);
    }

    try {
      await GoogleSignin.signOut();
    } catch {
      // Ignore if Google session was not active
    }
  },
};
