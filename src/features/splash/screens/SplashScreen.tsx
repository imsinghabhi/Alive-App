import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { colors, spacing, typography } from '../../../shared/theme';
import { SplashLogo } from '../components/SplashLogo';
import { useSplashAnimation } from '../hooks/useSplashAnimation';

export function SplashScreen() {
  const animations = useSplashAnimation();

  const logoStyle = useAnimatedStyle(() => ({
    opacity: animations.opacity.value,
    transform: [{ scale: animations.scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: animations.textOpacity.value,
    transform: [{ translateY: animations.textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, logoStyle]}>
        <SplashLogo />
      </Animated.View>

      <Animated.View style={textStyle}>
        <Text style={styles.title}>Welcome to Alive</Text>
        <Text style={styles.subtitle}>
          Live streaming and voice chat, built for instant connection.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoWrapper: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    marginTop: spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
});