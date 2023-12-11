import React, {memo, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import {useStore} from '../store/store';
import PopAnimation from '../components/PopAnimation';

function PaymentScreen({navigation, route}: any) {
  console.log(route.params.amount);

  const PaymentList = [
    {
      name: 'Wallet',
      icon: 'icon',
      isIcon: true,
    },
    {
      name: 'Google Pay',
      icon: require('../assets/app_images/gpay.png'),
      isIcon: false,
    },
    {
      name: 'Appel Pay',
      icon: require('../assets/app_images/applepay.png'),
      isIcon: false,
    },
    {
      name: 'Amazon Pay',
      icon: require('../assets/app_images/amazonpay.png'),
      isIcon: false,
    },
  ];

  const calculaCartPrice = useStore((state: any) => state.calculaCartPrice);
  const addOrderHistoryList = useStore(
    (state: any) => state.addOrderHistoryList,
  );

  const [paymentMode, setPaymentMode] = useState('Wallet');
  const [showAnimation, setShowAnimation] = useState(false);

  console.log(showAnimation);
  console.log(paymentMode);

  const backHandler = () => {
    navigation.pop();
  };

  const btnPressHandle = () => {
    setShowAnimation(true);
    addOrderHistoryList();
    calculaCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('ORDER_HISTORY');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={backHandler}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Thanh toán</Text>
          <View style={styles.viewEmpty} />
        </View>

      {showAnimation ? (
        <PopAnimation
          style={styles.animationContainer}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
   
        <View style={styles.viewPaymentOptionsMode}>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              onPress={() => {
                setPaymentMode(data.name);
              }}
              key={data.name}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        title="Tổng tiền"
        price={{price: route.params.amount, currency: 'VND'}}
        btnTitle={`Thanh toán bằng ${paymentMode}`}
        btnHandle={btnPressHandle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  animationContainer: {
    flex: 1,
  },

  scrollViewContainer: {
    flexGrow: 1,
    marginTop:10
  },
  headerContainer: {
    padding: SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  viewEmpty: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },

  viewPaymentOptionsMode: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_8,
  },
});
export default memo(PaymentScreen);
