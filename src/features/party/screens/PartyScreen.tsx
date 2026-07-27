import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme';

export function PartyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Party Rooms 🎉</Text>
      <Text style={styles.subtitle}>Join voice & party rooms with friends</Text>
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
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
