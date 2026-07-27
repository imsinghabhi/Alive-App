import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setInitializing, setUser } from '../../../store/slices/authSlice';
import { authService } from '../services/authService';

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthState(authUser => {
      dispatch(setUser(authUser));
      dispatch(setInitializing(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
}
