import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface Props {
  enable: boolean;
  title?: string;
}

function HeaderBar(props: Props) {
  return (
    <View>
      {props.enable ? (
        <View style={styles.container1}>
          <GradientBGIcon
            name="menu"
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.text}>{props.title}</Text>
          <ProfilePic />
        </View>
      ) : (
        <View style={styles.container2}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    padding: SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container2:{
    padding: SPACING.space_20,
    alignItems: 'center',
  },

  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
