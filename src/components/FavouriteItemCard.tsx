import React from 'react';
import {ImageProps, StyleSheet, Text, View} from 'react-native';
import ImageBGInfo from './ImageBGInfo';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface Props {
  enableBackHandle: boolean;
  imagelink_portrait: ImageProps;
  favourite: boolean;
  type: string;
  id: string;
  name: string;
  description: string;
  roasted: string;
  ingredients: string;
  special_ingredient: string;
  average_rating: number;
  ratings_count: string;
  toggleFavorite: any;
}

function FavouriteItemCard(props: Props) {
  return (
    <View style={styles.container}>
      <ImageBGInfo
        enableBackHandle={props.enableBackHandle}
        imagelink_portrait={props.imagelink_portrait}
        favourite={props.favourite}
        type={props.type}
        id={props.id}
        name={props.name}
        roasted={props.roasted}
        ingredients={props.ingredients}
        special_ingredient={props.special_ingredient}
        average_rating={props.average_rating}
        ratings_count={props.ratings_count}
        toggleFavorite={props.toggleFavorite}
      />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradientContainer}>
        <Text style={styles.title}>Mô tả</Text>

        <Text style={styles.text}>{props.description}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius:BORDERRADIUS.radius_25,
    overflow:"hidden"
  },

  linearGradientContainer: {
    padding:SPACING.space_20,
    gap:SPACING.space_10
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
    textAlign: 'center',
  },
});
export default FavouriteItemCard;
