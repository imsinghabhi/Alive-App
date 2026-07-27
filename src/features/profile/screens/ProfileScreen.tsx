import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLoginViewModel } from '../../auth/hooks/useLoginViewModel';
import { colors, spacing } from '../../../shared/theme';

export function ProfileScreen() {
  const { state, actions } = useLoginViewModel();

  const handleLogout = useCallback(async () => {
    await actions.logout();
    console.log('User logged out successfully');
  }, [actions]);

  const handleDeleteAccount = useCallback(async () => {
    await actions.deleteAccount();
    console.log('User account deleted permanently');
  }, [actions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile 👤</Text>
      {state.user?.email ? (
        <Text style={styles.userEmail}>{state.user.email}</Text>
      ) : null}
      <Text style={styles.subtitle}>Manage your account and settings</Text>

      <View style={styles.btnRow}>
        <Pressable
          style={styles.logoutBtn}
          onPress={handleLogout}
          disabled={state.loading}
        >
          <Text style={styles.logoutBtnText}>
            {state.loading ? 'Logging out...' : 'Logout'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteBtn}
          onPress={handleDeleteAccount}
          disabled={state.loading}
        >
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accentStart,
    marginTop: 6,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: spacing.xl,
  },
  btnRow: {
    gap: spacing.md,
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    minWidth: 180,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  deleteBtnText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
