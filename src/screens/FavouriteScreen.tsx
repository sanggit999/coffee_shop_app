import React, {memo} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';

import FavouriteItemCard from '../components/FavouriteItemCard';

function FavouriteScreen({navigation}: any) {
  const favouritesList = useStore((state: any) => state.FavouritesList);

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavorite = useStore((state: any) => state.deleteFromFavorite);

  const toggleFavorite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavorite(type, id) : addToFavoriteList(type, id);
    ToastAndroid.showWithGravity(
      'Bạn đã bỏ yêu thích sản phẩm.',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    console.log(favourite);
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Yêu thích" enable={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.viewInnerContainer, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemViewInnerContainer}>
            {favouritesList.length == 0 ? (
              <EmptyListAnimation
                title={`Yêu thích đang trống \n Vui lòng thêm yêu thích.`}
              />
            ) : (
              <View style={styles.listItemContainer}>
                {favouritesList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('DETAIL', {
                        id: data.id,
                        index: data.index,
                        type: data.type,
                      });
                    }}>
                    <FavouriteItemCard
                      enableBackHandle={false}
                      imagelink_portrait={data.imagelink_portrait}
                      favourite={data.favourite}
                      type={data.type}
                      id={data.id}
                      name={data.name}
                      description={data.description}
                      roasted={data.roasted}
                      ingredients={data.ingredients}
                      special_ingredient={data.special_ingredient}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      toggleFavorite={toggleFavorite}
                    />
                  </TouchableOpacity>
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
export default memo(FavouriteScreen);
