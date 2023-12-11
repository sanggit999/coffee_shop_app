import React, {memo, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

function HomeScreen({navigation}: any) {
  const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
      if (temp[data[i].name] === undefined) {
        temp[data[i].name] = 1;
      } else {
        temp[data[i].name]++;
      }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
  };

  const getCoffeeList = (category: string, data: any) => {
    if (category == 'All') {
      return data;
    } else {
      let coffeeList = data.filter((item: any) => item.name === category);
      return coffeeList;
    }
  };

  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeansList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculaCartPrice = useStore((state: any) => state.calculaCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  console.log('Sort------', sortedCoffee.length);

  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const cleanTextSearch = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };

  const addCoffeAndBeanToCartHandle = ({
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
      prices,
      type,
      index,
    });
    calculaCartPrice(),
      ToastAndroid.showWithGravity(
        `${name} đã thêm vào giỏ hàng.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {/* App header */}
      <HeaderBar title={'Trang chủ'} enable={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.scrollViewInner, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemScrollViewInner}>
            {/* Text title */}
            <Text style={styles.title}>Tìm Coffee {'\n'} tốt nhất cho bạn</Text>
            {/* Search input */}
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => {
                  searchCoffee(searchText);
                }}>
                <CustomIcon
                  name="search"
                  size={FONTSIZE.size_18}
                  color={
                    searchText.length > 0
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryLightGreyHex
                  }
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Tìm coffee của bạn."
                placeholderTextColor={COLORS.primaryLightGreyHex}
                value={searchText}
                onChangeText={text => {
                  setSearchText(text);
                  searchCoffee(text);
                }}
                style={styles.inputText}
              />
              {searchText.length > 0 ? (
                <TouchableOpacity
                  onPress={cleanTextSearch}
                  style={styles.btnCleanInput}>
                  <CustomIcon
                    name="close"
                    color={COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_16}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>

            {/* Categories ScrollView */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollCategoriesContainer}>
              {categories.map((data, index) => (
                <View key={index.toString()} style={styles.viewCategories}>
                  <TouchableOpacity
                    onPress={() => {
                      listRef?.current?.scrollToOffset({
                        animated: true,
                        offset: 0,
                      });
                      setCategoryIndex({
                        index: index,
                        category: categories[index],
                      });
                      setSortedCoffee([
                        ...getCoffeeList(categories[index], CoffeeList),
                      ]);
                    }}
                    style={styles.btnCategories}>
                    <Text
                      style={[
                        styles.categoriesText,
                        categoryIndex.index === index
                          ? {color: COLORS.primaryOrangeHex}
                          : {color: COLORS.primaryWhiteHex},
                      ]}>
                      {data}
                    </Text>
                    {categoryIndex.index === index ? (
                      <View style={styles.indexActive} />
                    ) : (
                      <></>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Flatlist coffee */}

            <FlatList
              ref={listRef}
              ListEmptyComponent={
                <View style={styles.listEmpty}>
                  <Text style={styles.textListEmpty}>
                    Caffee không tồn tại!
                  </Text>
                </View>
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              data={sortedCoffee}
              contentContainerStyle={styles.flatListContainer}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('DETAIL', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                      });
                    }}>
                    <CoffeeCard
                      id={item.id}
                      name={item.name}
                      roasted={item.roasted}
                      imagelink_square={item.imagelink_square}
                      special_ingredient={item.special_ingredient}
                      price={item.prices[2]}
                      average_rating={item.average_rating}
                      type={item.type}
                      index={item.index}
                      btnHandle={addCoffeAndBeanToCartHandle}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            <Text style={styles.coffeeBeansList}>Hạt caffee</Text>
            {/* Flatlist coffee beans*/}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={BeansList}
              contentContainerStyle={styles.flatListContainer}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('DETAIL', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                        size: item,
                      });
                    }}>
                    <CoffeeCard
                      id={item.id}
                      name={item.name}
                      roasted={item.roasted}
                      imagelink_square={item.imagelink_square}
                      special_ingredient={item.special_ingredient}
                      price={item.prices[2]}
                      average_rating={item.average_rating}
                      type={item.type}
                      index={item.index}
                      btnHandle={addCoffeAndBeanToCartHandle}
                    />
                  </TouchableOpacity>
                );
              }}
            />
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
    marginTop:10
  },
  scrollViewInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemScrollViewInner: {
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },

  inputText: {
    flex: 1,
    height: SPACING.space_20 * 2.5,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
  },
  btnCleanInput: {
    marginHorizontal: SPACING.space_20,
  },
  scrollCategoriesContainer: {
    marginBottom: SPACING.space_20,
  },

  viewCategories: {
    paddingHorizontal: SPACING.space_20,
  },
  btnCategories: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  indexActive: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },

  listEmpty: {
    width: Dimensions.get('window').width - SPACING.space_30 * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  textListEmpty: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_4,
  },

  flatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_30,
  },

  coffeeBeansList: {
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_20,
    marginLeft: SPACING.space_30,
  },
});
export default memo(HomeScreen);
