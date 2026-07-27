import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../../shared/theme';
import { CountryTab } from '../types/home.types';

interface CountryFilterBarProps {
  countries: CountryTab[];
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
}

export function CountryFilterBar({
  countries,
  selectedCountryId,
  onSelectCountry,
}: CountryFilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {countries.map(country => {
        const isSelected = selectedCountryId === country.id;
        return (
          <Pressable
            key={country.id}
            onPress={() => onSelectCountry(country.id)}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipUnselected,
            ]}
          >
            <Text style={styles.flagText}>{country.flag}</Text>
            <Text
              style={[
                styles.chipText,
                isSelected && styles.chipTextSelected,
              ]}
              numberOfLines={1}
            >
              {country.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  chipSelected: {
    borderColor: colors.accentEnd,
    backgroundColor: 'rgba(22, 166, 32, 0.08)',
  },
  chipUnselected: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  flagText: {
    fontSize: 15,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chipTextSelected: {
    color: colors.accentEnd,
  },
});
