import { useCallback, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearError, setError, setLoading } from '../../../store/slices/authSlice';
import { authService } from '../services/authService';

const GOOGLE_WEB_CLIENT_ID =
  '148236423672-6b7ldt1oj1qnoi02v367916s5engq7fu.apps.googleusercontent.com';

export function useLoginViewModel() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    dispatch(setLoading(true));
    try {
      await authService.signOutUser();
    } catch (e: any) {
      console.log('Logout error:', e);
      dispatch(setError(e?.message || 'Logout failed'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const deleteAccount = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await authService.deleteUserAccount();
    } catch (e: any) {
      console.log('Delete account error:', e);
      dispatch(setError(e?.message || 'Failed to delete account'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loginWithGoogle = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const userCredential = await authService.loginWithGoogle();
      console.log('Google Login Successful:', userCredential.user);
      return userCredential;
    } catch (error: any) {
      const message = error?.message || 'Google Sign-In failed';
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loginWithEmailPassword = useCallback(async () => {
    dispatch(setError('Email & Password login is not implemented yet. Please sign in with Google.'));
  }, [dispatch]);

  const handleForgotPassword = useCallback(() => {
    dispatch(setError('Forgot Password feature is not implemented yet.'));
  }, [dispatch]);

  const handleSignUp = useCallback(() => {
    dispatch(setError('Sign Up feature is not implemented yet.'));
  }, [dispatch]);

  const handleFacebookLogin = useCallback(() => {
    dispatch(setError('Facebook Sign-In is not implemented yet. Please sign in with Google.'));
  }, [dispatch]);

  return {
    state: {
      identifier,
      password,
      passwordVisible,
      loading: authState.loading,
      errorMessage: authState.error,
      user: authState.user,
      initializing: authState.initializing,
    },
    actions: {
      setIdentifier,
      setPassword,
      togglePasswordVisibility,
      loginWithGoogle,
      loginWithEmailPassword,
      handleForgotPassword,
      handleSignUp,
      handleFacebookLogin,
      logout,
      deleteAccount,
    },
  };
}
