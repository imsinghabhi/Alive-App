import { useEffect } from 'react';
import { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { durations } from '../../../shared/constants/durations';

export function useSplashAnimation() {
  const scale = useSharedValue(0.92);
  const opacity = useSharedValue(0);
  const textTranslateY = useSharedValue(12);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: durations.fadeIn });
    scale.value = withTiming(1, { duration: durations.scaleIn });
    textOpacity.value = withDelay(
      180,
      withTiming(1, { duration: durations.fadeIn }),
    );
    textTranslateY.value = withDelay(
      180,
      withTiming(0, { duration: durations.scaleIn }),
    );
  }, [opacity, scale, textOpacity, textTranslateY]);

  return {
    scale,
    opacity,
    textTranslateY,
    textOpacity,
  };
}