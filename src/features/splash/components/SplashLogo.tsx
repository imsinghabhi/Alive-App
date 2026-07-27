import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme';

function SplashLogoComponent() {
  return (
    <View style={styles.logoShell}>
      <View style={styles.logoTopGlow} />
      <View style={styles.logoBottomWave} />
      <Text style={styles.logoText}>ALive</Text>
      <View style={styles.cameraBadge}>
        <View style={styles.cameraBody}>
          <View style={styles.playTriangle} />
          <View style={styles.cameraTail} />
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