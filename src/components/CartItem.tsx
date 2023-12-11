import React from 'react';
import {
  View,
  StyleSheet,
  ImageProps,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

import ButtonIcon from './ButtonIcon';

interface Props {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  type: string;
  incrementCartItemQuantity: any;
  decrementCartItemQuantity: any;
}

function CartItem(props: Props) {
  return (
    <View>
      {props.prices.length != 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientContainer}>
          <View style={styles.viewContainer}>
            <Image
              source={props.imagelink_square}
              style={styles.imageItemContainer}
            />
            <View style={styles.viewItemContainer}>
              <View>
                <Text style={styles.textName}>{props.name}</Text>
                <Text style={styles.textSpecialIngredient}>
                  {props.special_ingredient}
                </Text>
              </View>

              <View style={styles.viewRoasted}>
                <Text style={styles.textRoasted}>{props.roasted}</Text>
              </View>
            </View>
          </View>

          {props.prices.map((data: any, index: any) => (
            <View key={index.toString()} style={styles.viewSizeContainer}>
              <View style={styles.itemSizeContainer}>
                <View style={styles.itemSizeBox}>
                  <Text style={styles.itemTextSizeBox}>{data.size}</Text>
                </View>

                <Text style={styles.itemTextPrice}>
                  {data.price}{' '}
                  <Text style={styles.itemTextCurrency}>{data.currency}</Text>
                </Text>
              </View>
              <View style={styles.itemSizeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    props.decrementCartItemQuantity(props.id, data.size);
                  }}>
                  <ButtonIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    bgColor={COLORS.primaryOrangeHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.itemSizeBoxQuantity}>
                  <Text style={styles.itemTextQuantity}>{data.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.incrementCartItemQuantity(props.id, data.size);
                  }}>
                  <ButtonIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    bgColor={COLORS.primaryOrangeHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientSingleContainer}>
          <View>
            <Image
              source={props.imagelink_square}
              style={styles.imageSingleContainer}
            />
          </View>
          <View style={styles.viewItemSingleContainer}>
            <View>
              <Text style={styles.textName}>{props.name}</Text>
              <Text style={styles.textSpecialIngredient}>
                {props.special_ingredient}
              </Text>
            </View>
            <View style={styles.viewSizeSingleContainer}>
              <View style={styles.itemSizeBox}>
                <Text
                  style={[
                    styles.itemTextSizeBox,
                    {
                      fontSize:
                        props.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_14,
                    },
                  ]}>
                  {props.prices[0].size}
                </Text>
              </View>

              <Text style={styles.itemTextPrice}>
                {props.prices[0].price}{' '}
                <Text style={styles.itemTextCurrency}>
                  {props.prices[0].currency}
                </Text>
              </Text>
            </View>

            <View style={styles.itemSizeSingleContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.decrementCartItemQuantity(
                    props.id,
                    props.prices[0].size,
                  );
                }}>
                <ButtonIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  bgColor={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={styles.itemSizeBoxQuantity}>
                <Text style={styles.itemTextQuantity}>
                  {props.prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.incrementCartItemQuantity(
                    props.id,
                    props.prices[0].size,
                  );
                }}>
                <ButtonIcon
                  name="add"
                  color={COLORS.primaryWhiteHex}
                  bgColor={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradientContainer: {
    flex: 1,
    padding: SPACING.space_15,
    gap: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_15,
  },
  imageItemContainer: {
    width: 130,
    height: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  viewItemContainer: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  textName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  textSpecialIngredient: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  viewRoasted: {
    width: 50 * 2 + SPACING.space_20,
    height: 50,
    borderRadius: BORDERRADIUS.radius_15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  textRoasted: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  viewSizeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
  },
  itemSizeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: SPACING.space_8,
  },
  itemSizeBox: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryBlackHex,
  },
  itemTextSizeBox: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  itemTextPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  itemTextCurrency: {
    color: COLORS.primaryWhiteHex,
  },
  itemSizeBoxQuantity: {
    width: 50,
    paddingVertical: SPACING.space_2,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_4,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextQuantity: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  linearGradientSingleContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING.space_15,
    gap: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
  },
  imageSingleContainer: {
    width: 150,
    height: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  viewItemSingleContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  viewSizeSingleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_8,
  },
  itemSizeSingleContainer: {
    marginTop: SPACING.space_10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CartItem;
