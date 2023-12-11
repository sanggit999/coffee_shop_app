import React, {memo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBGInfo from '../components/ImageBGInfo';
import {useStore} from '../store/store';
import PaymentFooter from '../components/PaymentFooter';

function DetailScreen({navigation, route}: any) {
  const itemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeansList,
  )[route.params.index];

  console.log('params-------', route.params);
  console.log('favourite---', itemOfIndex.favourite);

  const [description, setDescription] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);
  console.log('price----', price);

  const backHandle = () => {
    navigation.pop();
  };

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavorite = useStore((state: any) => state.deleteFromFavorite);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculaCartPrice = useStore((state: any) => state.calculaCartPrice);

  const toggleFavorite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavorite(type, id) : addToFavoriteList(type, id);
    if (favourite == true) {
      ToastAndroid.showWithGravity(
        'Bạn đã bỏ thích sản phẩm.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Bạn đã thích sản phẩm.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    console.log(favourite);
  };

  const addToCartHandle = ({
    id,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    prices,
    type,
    index,
  }: any) => {
    addToCart({
      id,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      prices: [{...price, quantity: 1}],
      type,
      index,
    });
    calculaCartPrice(),
      ToastAndroid.showWithGravity(
        `${name} đã thêm vào giỏ hàng.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    navigation.navigate('CART');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.scrollViewInner}>
          <View style={styles.itemScrollViewInner}>
            <ImageBGInfo
              enableBackHandle={true}
              imagelink_portrait={itemOfIndex.imagelink_portrait}
              backHandle={backHandle}
              favourite={itemOfIndex.favourite}
              type={itemOfIndex.type}
              id={itemOfIndex.id}
              name={itemOfIndex.name}
              roasted={itemOfIndex.roasted}
              ingredients={itemOfIndex.ingredients}
              special_ingredient={itemOfIndex.special_ingredient}
              average_rating={itemOfIndex.average_rating}
              ratings_count={itemOfIndex.ratings_count}
              toggleFavorite={toggleFavorite}
            />

            <View style={styles.viewFooterArea}>
              <Text style={styles.textDescription}>Mô tả</Text>
              {description ? (
                <TouchableWithoutFeedback
                  onPress={() => setDescription(prev => !prev)}>
                  <Text style={styles.textItemDescription}>
                    {itemOfIndex.description}
                  </Text>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => setDescription(prev => !prev)}>
                  <Text numberOfLines={3} style={styles.textItemDescription}>
                    {itemOfIndex.description}
                  </Text>
                </TouchableWithoutFeedback>
              )}

              <Text style={styles.textSize}>
                {itemOfIndex.type == 'Bean' ? 'Cân nặng' : 'Kích cỡ'}
              </Text>
              <View style={styles.sizeItemContainer}>
                {itemOfIndex.prices.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => setPrice(data)}
                    key={data.size}
                    style={[
                      styles.btnSize,
                      {
                        borderColor:
                          data.size == price.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryDarkGreyHex,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textItemSize,
                        {
                          fontSize: FONTSIZE.size_16,
                          color:
                            data.size == price.size
                              ? COLORS.primaryOrangeHex
                              : COLORS.primaryLightGreyHex,
                        },
                      ]}>
                      {data.size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <PaymentFooter
            price={price}
            title="Giá tiền"
            btnTitle="Thêm vào giỏ"
            btnHandle={() => {
              addToCartHandle({
                id: itemOfIndex.id,
                name: itemOfIndex.name,
                roasted: itemOfIndex.roasted,
                imagelink_square: itemOfIndex.imagelink_square,
                special_ingredient: itemOfIndex.special_ingredient,
                prices: price,
                type: itemOfIndex.type,
                index: itemOfIndex.index,
              });
            }}
          />
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
  },
  scrollViewInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemScrollViewInner: {
    flex: 1,
  },
  viewFooterArea: {
    padding: SPACING.space_20,
  },
  textDescription: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  textItemDescription: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
    textAlign: 'center',
  },
  textSize: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginVertical: SPACING.space_10,
  },
  sizeItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  btnSize: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  textItemSize: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
export default memo(DetailScreen);
