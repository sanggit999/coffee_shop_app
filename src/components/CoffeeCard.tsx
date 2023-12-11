import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ImageProps,
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
import CustomIcon from './CustomIcon';
import ButtonIcon from './ButtonIcon';

interface Props {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  price: any;
  average_rating: number;
  type: string;
  index: number;
  btnHandle: any;
}

const WIDTH = Dimensions.get('window').width * 0.32;

function CoffeeCard(props: Props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={props.imagelink_square}
        style={styles.imageBGContainer}
        resizeMode="cover">
        <View style={styles.viewRating}>
          <Text style={styles.textRating}>{props.average_rating}</Text>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_14}
          />
        </View>
      </ImageBackground>
      <Text style={styles.title}>{props.name}</Text>
      <Text style={styles.subTitle}>{props.special_ingredient}</Text>
      <View style={styles.viewFooter}>
        <Text style={styles.textPrice}>
          {props.price.price}{' '}
          <Text style={styles.textCurrency}>{props.price.currency}</Text>
        </Text>
        <TouchableOpacity
          onPress={() =>
            props.btnHandle({
              id: props.id,
              name: props.name,
              roasted: props.roasted,
              imagelink_square: props.imagelink_square,
              special_ingredient: props.special_ingredient,
              prices:[{...props.price, quantity: 1}],
              type: props.type,
              index: props.index,
            })
          }>
          <ButtonIcon
            name="add"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
            bgColor={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
    alignItems: 'center',
  },
  imageBGContainer: {
    width: WIDTH,
    height: WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  viewRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_4,
    paddingHorizontal: SPACING.space_15,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
  },
  textRating: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  subTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  viewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.space_15,
    gap: SPACING.space_10,
  },
  textPrice: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  textCurrency: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
});

export default CoffeeCard;
