import React, {memo} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import EmptyListAnimation from '../components/EmptyListAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

function OrderHistoryScreen({navigation}: any) {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList);
  console.log('OrderHistoryList-----', orderHistoryList.length);

  const navigationHandle = ({index, id, type}: any) => {
    navigation.push('DETAIL', {index, id, type});
  };
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <HeaderBar title="Lịch sử đặt hàng" enable={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.viewInnerContainer, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemViewInnerContainer}>
            {orderHistoryList.length == 0 ? (
              <EmptyListAnimation
                title={`Lịch sử đặt hàng đang trống \n Vui lòng đặt hàng.`}
              />
            ) : (
              <View style={styles.listItemContainer}>
                {orderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandle={navigationHandle}
                    orderDate={data.OrderDate}
                    cartList={data.CartList}
                    cartListPrice={data.CartListPrice}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  viewInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemViewInnerContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
export default memo(OrderHistoryScreen);
