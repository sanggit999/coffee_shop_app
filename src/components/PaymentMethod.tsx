import React from 'react';
import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  paymentMode: any;
  name: string;
  icon: ImageProps;
  isIcon: boolean;
}

function PaymentMethod(props: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor:
            props.paymentMode == props.name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}>
      {props.isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientContainer1}>
          <View style={styles.viewItem}>
            <CustomIcon
              name="wallet"
              size={FONTSIZE.size_30}
              color={COLORS.primaryOrangeHex}
            />
            <Text style={styles.textName}>{props.name}</Text>
          </View>

          <Text style={styles.textPaymentPrice}>1.000.000 VND</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientContainer2}>
          <Image source={props.icon} style={styles.image} />
          <Text style={styles.textName}>{props.name}</Text>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
    backgroundColor: COLORS.primaryGreyHex,
  },
  linearGradientContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  textName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  textPaymentPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  linearGradientContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  image: {
    width: FONTSIZE.size_30,
    height: FONTSIZE.size_30,
  },
});
export default PaymentMethod;
