import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../theme/theme';
import LottieView from 'lottie-react-native';

interface Props {
  style: any;
  source: any;
}

function PopAnimation(props: Props) {
  return (
    <View style={styles.container}>
      <LottieView
        style={props.style}
        source={props.source}
        autoPlay
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: COLORS.primaryBlackRGBA,
    justifyContent: 'center',
  },
});
export default PopAnimation;
