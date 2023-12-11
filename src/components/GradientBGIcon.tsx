import React from 'react';

import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  name: string;
  color: string;
  size: number;
}

function GradientBGIcon(props: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradient}>
        <CustomIcon name={props.name} color={props.color} size={props.size} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearGradient: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientBGIcon;
