import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LiveStreamCardData } from '../types/home.types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.35;

interface LiveStreamCardProps {
  item: LiveStreamCardData;
  onPressCard?: (item: LiveStreamCardData) => void;
  onToggleFollow?: (id: string) => void;
}

export function LiveStreamCard({
  item,
  onPressCard,
  onToggleFollow,
}: LiveStreamCardProps) {
  return (
    <Pressable
      onPress={() => onPressCard?.(item)}
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]}
    >
      <ImageBackground
        source={{ uri: item.streamCover }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        {/* Top Gradient Overlay */}
        <View style={styles.topGradient} />

        {/* Viewers Pill Overlay */}
        <View style={styles.viewersPill}>
          <Icon name="eye-outline" size={13} color="#FFFFFF" />
          <Text style={styles.viewersText}>{item.viewers}</Text>
        </View>

        {/* Bottom Details Overlay */}
        <View style={styles.bottomOverlay}>
          <View style={styles.hostInfoRow}>
            {/* Host Avatar */}
            <Image
              source={{ uri: item.hostAvatar }}
              style={styles.avatar}
            />

            {/* Host Name & Flag */}
            <View style={styles.hostNameWrap}>
              <Text style={styles.hostName} numberOfLines={1}>
                {item.hostName}
              </Text>
              <Text style={styles.flagText}>{item.countryFlag}</Text>
            </View>

            {/* Follow Button */}
            <Pressable
              onPress={() => onToggleFollow?.(item.id)}
              style={[
                styles.followBtn,
                item.isFollowing && styles.followingBtn,
              ]}
              hitSlop={6}
            >
              <Text
                style={[
                  styles.followBtnText,
                  item.isFollowing && styles.followingBtnText,
                ]}
              >
                {item.isFollowing ? 'Following' : '+ Follow'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 20,
  },
  topGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  viewersPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  viewersText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomOverlay: {
    justifyContent: 'flex-end',
  },
  hostInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  hostNameWrap: {
    flex: 1,
  },
  hostName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  flagText: {
    fontSize: 10,
    marginTop: 1,
  },
  followBtn: {
    backgroundColor: '#D7F400',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  followingBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  followBtnText: {
    color: '#111111',
    fontSize: 10,
    fontWeight: '800',
  },
  followingBtnText: {
    color: '#FFFFFF',
  },
});
