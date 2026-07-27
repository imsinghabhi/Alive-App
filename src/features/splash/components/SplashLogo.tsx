import React, { memo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../../../shared/theme';

export interface SplashLogoProps {
  size?: number;
  style?: ViewStyle;
}

function SplashLogoComponent({ size = 176, style }: SplashLogoProps) {
  const scale = size / 176;

  const dynamicStyles = {
    shell: {
      width: size,
      height: size,
      borderRadius: Math.max(8, Math.round(42 * scale)),
    },
    topGlow: {
      left: Math.round(-18 * scale),
      top: Math.round(-26 * scale),
      width: Math.round(150 * scale),
      height: Math.round(150 * scale),
      borderRadius: Math.round(75 * scale),
    },
    bottomWave: {
      left: Math.round(-10 * scale),
      bottom: Math.round(18 * scale),
      width: Math.round(208 * scale),
      height: Math.round(56 * scale),
    },
    text: {
      top: Math.round(50 * scale),
      fontSize: Math.max(10, Math.round(34 * scale)),
    },
    cameraBadge: {
      bottom: Math.round(16 * scale),
    },
    cameraBody: {
      width: Math.max(14, Math.round(68 * scale)),
      height: Math.max(10, Math.round(50 * scale)),
      borderRadius: Math.max(3, Math.round(14 * scale)),
      borderWidth: Math.max(1, Math.round(5 * scale)),
    },
    playTriangle: {
      borderTopWidth: Math.max(2, Math.round(11 * scale)),
      borderBottomWidth: Math.max(2, Math.round(11 * scale)),
      borderLeftWidth: Math.max(3, Math.round(18 * scale)),
      marginLeft: Math.max(1, Math.round(5 * scale)),
    },
    cameraTail: {
      right: Math.round(-16 * scale),
      borderTopWidth: Math.max(2, Math.round(10 * scale)),
      borderBottomWidth: Math.max(2, Math.round(10 * scale)),
      borderLeftWidth: Math.max(3, Math.round(14 * scale)),
    },
  };

  return (
    <View style={[styles.logoShell, dynamicStyles.shell, style]}>
      <View style={[styles.logoTopGlow, dynamicStyles.topGlow]} />
      <View style={[styles.logoBottomWave, dynamicStyles.bottomWave]} />
      <Text style={[styles.logoText, dynamicStyles.text]}>ALive</Text>
      <View style={[styles.cameraBadge, dynamicStyles.cameraBadge]}>
        <View style={[styles.cameraBody, dynamicStyles.cameraBody]}>
          <View style={[styles.playTriangle, dynamicStyles.playTriangle]} />
          <View style={[styles.cameraTail, dynamicStyles.cameraTail]} />
        </View>
      </View>
    </View>
  );
}

export const SplashLogo = memo(SplashLogoComponent);

const styles = StyleSheet.create({
  logoShell: {
    width: 176,
    height: 176,
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: colors.accentEnd,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  logoTopGlow: {
    position: 'absolute',
    left: -18,
    top: -26,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accentStart,
    opacity: 0.95,
  },
  logoBottomWave: {
    position: 'absolute',
    left: -10,
    bottom: 18,
    width: 208,
    height: 56,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ rotate: '-8deg' }],
  },
  logoText: {
    position: 'absolute',
    top: 52,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  cameraBody: {
    width: 68,
    height: 50,
    borderRadius: 14,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22,166,32,0.18)',
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 11,
    borderBottomWidth: 11,
    borderLeftWidth: 18,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
    marginLeft: 5,
  },
  cameraTail: {
    position: 'absolute',
    right: -16,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 14,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
  },
});