import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface Props {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  itemPrice: string;
}

function OrderHistoryItemCard(props: Props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.linearGradientContainer}>
      <View style={styles.viewContainer}>
        <View style={styles.itemViewContainer}>
          <Image
            source={props.imagelink_square}
            style={styles.imageContainer}
          />
          <View>
            <Text style={styles.textName}>{props.name}</Text>
            <Text style={styles.textSpecialIngredient}>
              {props.special_ingredient}
            </Text>
          </View>
        </View>

        <Text style={styles.textPrice}>
          {props.itemPrice} <Text style={styles.textCurrency}>VND</Text>
        </Text>
      </View>

      {props.prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.viewItemPriceContainer}>
          <View style={styles.viewItemPrice}>
            <View style={styles.itemBoxSize}>
              <Text
                style={[
                  styles.textItemSize,
                  {
                    fontSize:
                      props.type == 'Bean'
                        ? FONTSIZE.size_14
                        : FONTSIZE.size_14,
                  },
                ]}>
                {data.size}
              </Text>
            </View>

            <Text style={styles.textItemPrice}>
              {data.price}{' '}
              <Text style={styles.textItemCurrency}>{data.currency}</Text>
            </Text>
          </View>

          <View style={styles.viewItemPrice}>
            <Text style={styles.textItemX}>
              x<Text style={styles.textItemQuantity}>{data.quantity}</Text>
            </Text>

            <Text style={styles.textItemTotalPriceQuantity}>
              {(data.price * data.quantity)
                .toFixed(3)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
              <Text style={styles.textItemCurrency}>VND</Text>
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradientContainer: {
    gap: SPACING.space_15,
    padding: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_25,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemViewContainer: {
    gap: SPACING.space_8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDERRADIUS.radius_10,
  },
  textName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  textSpecialIngredient: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  textPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  textCurrency: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  viewItemPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
  },
  viewItemPrice: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_10,
  },

  itemBoxSize: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_10,
  },
  textItemSize: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },

  textItemPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryOrangeHex,
  },
  textItemCurrency: {color: COLORS.primaryWhiteHex},
  textItemX: {
    color: COLORS.primaryOrangeHex,
  },
  textItemQuantity: {
    fontFamily: FONTFAMILY.poppins_medium,

    color: COLORS.primaryWhiteHex,
  },
  textItemTotalPriceQuantity: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryOrangeHex,
  },
});
export default OrderHistoryItemCard;
