import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderHistoryItemCard from './OrderHistoryItemCard';

interface Props {
  navigationHandle: any;
  orderDate: any;
  cartList: any;
  cartListPrice: any;
}

function OrderHistoryCard(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View>
          <Text style={styles.textHeader}>Ngày đặt hàng</Text>
          <Text style={styles.textTimeHeader}>{props.orderDate}</Text>
        </View>
        <View style={styles.viewItemHeader}>
          <Text style={styles.textHeader}>Tổng số tiền</Text>
          <Text style={styles.textPriceHeader}>
            {props.cartListPrice}{' '}
            <Text style={styles.textCurrencyHeader}>VND</Text>{' '}
          </Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {props.cartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              props.navigationHandle({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderHistoryItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              itemPrice={data.itemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  textHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  textTimeHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  viewItemHeader: {
    alignItems: 'flex-end',
  },
  textPriceHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  textCurrencyHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});

export default OrderHistoryCard;
