import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

function CartScreen({navigation}: any) {
  const cartList = useStore((state: any) => state.CartList);
  const cartPrice = useStore((state: any) => state.CartPrice);
  const calculaCartPrice = useStore((state: any) => state.calculaCartPrice);

  console.log('CartList------', cartList);

  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  console.log('cartList-------', cartList.length);

  const incrementCartItemQuantityHandle = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculaCartPrice();
  };

  const decrementCartItemQuantityHandle = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculaCartPrice();
  };

  const btnHandlePayment = () => {
    navigation.push('PAYMENT', {amount: cartPrice});
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Giỏ hàng" enable={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.viewInnerContainer, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemViewInnerContainer}>
            {cartList.length == 0 ? (
              <EmptyListAnimation
                title={`Giỏ hàng đang trống \n Vui lòng thêm sản phẩm.`}
              />
            ) : (
              <View style={styles.listItemContainer}>
                {cartList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('DETAIL', {
                        id: data.id,
                        index: data.index,
                        type: data.type,
                      });
                    }}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      roasted={data.roasted}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantity={
                        incrementCartItemQuantityHandle
                      }
                      decrementCartItemQuantity={
                        decrementCartItemQuantityHandle
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {cartList.length != 0 ? (
            <PaymentFooter
              title="Tổng tiền"
              price={{currency: 'VND', price: cartPrice}}
              btnTitle="Thanh toán"
              btnHandle={btnHandlePayment}
            />
          ) : (
            <></>
          )}
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
export default memo(CartScreen);
