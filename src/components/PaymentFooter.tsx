import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface Price {
  currency: string;
  price: string;
}

interface Props {
  price: Price;
  title: string;
  btnTitle: string;
  btnHandle: any;
}

function PaymentFooter(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewPriceContainer}>
        <Text style={styles.textTitle}>{props.title}</Text>
        <Text style={styles.textPrice}>
          {props.price.price}{' '}
          <Text style={styles.textCurrency}>{props.price.currency}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.btnBox} onPress={() => props.btnHandle()}>
        <Text style={styles.btnTextTitle}>{props.btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  viewPriceContainer: {
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },

  textPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textCurrency: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  btnBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    height: SPACING.space_30 * 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  btnTextTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default PaymentFooter;
