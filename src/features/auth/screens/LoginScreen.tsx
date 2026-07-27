import React, { useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthTextField } from '../components/AuthTextField';
import { GradientButton } from '../components/GradientButton';
import { useLoginViewModel } from '../hooks/useLoginViewModel';
import { colors, spacing, typography } from '../../../shared/theme';

function SocialButton({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.socialButton}>
      {icon}
      <Text style={styles.socialButtonText}>{title}</Text>
    </View>
  );
}

export function LoginScreen() {
  const { state, actions } = useLoginViewModel();

  const onGoogleLogin = useCallback(async () => {
    try {
      await actions.loginWithGoogle();
    } catch {
      // Error message is captured in state for UI.
    }
  }, [actions]);

  const onDirectLogin = useCallback(async () => {
    await actions.loginWithEmailPassword();
  }, [actions]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>Alive</Text>
            </View>
          </View>
          <Text style={styles.title}>Welcome back! 👋</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your live streaming journey.
          </Text>
        </View>

        <View style={styles.form}>
          <AuthTextField
            label="Email ID or Phone Number"
            value={state.identifier}
            onChangeText={actions.setIdentifier}
            placeholder="Enter Registered Email or Phone No."
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />

          <AuthTextField
            label="Password"
            value={state.password}
            onChangeText={actions.setPassword}
            placeholder="Enter your password"
            secureTextEntry={!state.passwordVisible}
            autoCapitalize="none"
            rightIcon={
              <Pressable onPress={actions.togglePasswordVisibility} hitSlop={12}>
                <Icon
                  name={state.passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#8A8A8A"
                />
              </Pressable>
            }
          />

          <Pressable style={styles.forgotWrap} onPress={actions.handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          {state.errorMessage ? (
            <Text style={styles.errorText}>{state.errorMessage}</Text>
          ) : null}

          <GradientButton
            title="Login"
            onPress={onDirectLogin}
            loading={state.loading}
          />
        </View>

        <View style={styles.waveSection}>
          <View style={styles.waveLayerOne} />
          <View style={styles.waveLayerTwo} />
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialStack}>
            <Pressable onPress={onGoogleLogin}>
              <SocialButton
                title={state.loading ? 'Continue with Google' : 'Continue with Google'}
                icon={<Text style={styles.googleIcon}>G</Text>}
              />
            </Pressable>

            <Pressable onPress={actions.handleFacebookLogin}>
              <SocialButton
                title="Continue with Facebook"
                icon={<Text style={styles.facebookIcon}>f</Text>}
              />
            </Pressable>
          </View>

          <Text style={styles.signupText}>
            Don’t have an account?{' '}
            <Text style={styles.signupLink} onPress={actions.handleSignUp}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  logoWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.accentEnd,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 31,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#343434',
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl,
    gap: spacing.lg,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#009C2D',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    fontWeight: '500',
  },
  waveSection: {
    marginTop: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    backgroundColor: '#3CBF23',
    overflow: 'hidden',
  },
  waveLayerOne: {
    position: 'absolute',
    left: -28,
    top: -68,
    width: 220,
    height: 120,
    borderRadius: 999,
    backgroundColor: '#009E36',
    opacity: 0.95,
  },
  waveLayerTwo: {
    position: 'absolute',
    right: -24,
    top: -78,
    width: 260,
    height: 150,
    borderRadius: 999,
    backgroundColor: '#9BD20D',
    opacity: 0.95,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: 64,
    marginBottom: spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  socialStack: {
    gap: spacing.lg,
  },
  socialButton: {
    minHeight: 78,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  socialButtonText: {
    color: '#222222',
    fontSize: 18,
    fontWeight: '700',
  },
  googleIcon: {
    color: '#4285F4',
    fontSize: 26,
    fontWeight: '900',
  },
  facebookIcon: {
    color: '#1877F2',
    fontSize: 28,
    fontWeight: '900',
  },
  signupText: {
    marginTop: spacing.xl,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    textDecorationLine: 'underline',
    fontWeight: '800',
  },
});