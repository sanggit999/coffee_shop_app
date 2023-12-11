import React from 'react';
import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import {Text} from 'react-native';

interface Props {
  enableBackHandle: boolean;
  imagelink_portrait: ImageProps;
  backHandle?: any;
  favourite: boolean;
  type: string;
  id: string;
  name: string;
  roasted: string;
  ingredients: string;
  special_ingredient: string;
  average_rating: number;
  ratings_count: string;
  toggleFavorite: any;
}

function ImageBGInfo(props: Props) {
  return (
    <View>
      <ImageBackground
        source={props.imagelink_portrait}
        style={styles.imageBGContainer}>
        {props.enableBackHandle ? (
          <View style={styles.viewHeaderContainer1}>
            <TouchableOpacity
              onPress={() => {
                props.backHandle();
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.toggleFavorite(props.favourite, props.type, props.id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  props.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewHeaderContainer2}>
            <TouchableOpacity
              onPress={() => {
                props.toggleFavorite(props.favourite, props.type, props.id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  props.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.itemInner1}>
              <View>
                <Text style={styles.titleInner}>{props.name}</Text>
                <Text style={styles.subTitleInner}>
                  {props.special_ingredient}
                </Text>
              </View>
              <View style={styles.innerPropertiesContainer}>
                <View style={styles.itemProperties}>
                  <CustomIcon
                    name={props.type == 'Bean' ? 'bean' : 'beans'}
                    size={
                      props.type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24
                    }
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.textProperties1,
                      {
                        marginTop:
                          props.type == 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {props.type}
                  </Text>
                </View>

                <View style={styles.itemProperties}>
                  <CustomIcon
                    name={props.type == 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_18}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.textProperties2}>
                    {props.ingredients}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInner2}>
              <View style={styles.innerRating}>
                <Text style={styles.textRating}>{props.average_rating}</Text>
                <CustomIcon
                  name="star"
                  size={FONTSIZE.size_14}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.textCountRating}>
                  ({props.ratings_count})
                </Text>
              </View>
              <View style={styles.innerRoasted}>
                <Text style={styles.textRoasted}>{props.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBGContainer: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  viewHeaderContainer1: {
    flexDirection: 'row',
    padding: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewHeaderContainer2: {
    flexDirection: 'row',
    padding: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  outerContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_24,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  innerContainer: {
    justifyContent: 'center',
    gap: SPACING.space_15,
  },
  itemInner1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleInner: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  subTitleInner: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },

  innerPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  itemProperties: {
    width: 60,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_15,
  },
  textProperties1: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  textProperties2: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4,
  },
  itemInner2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerRating: {
    flexDirection: 'row',
    gap: SPACING.space_4,
    alignItems: 'center',
  },
  textRating: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  textCountRating: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  innerRoasted: {
    width: 55 * 2 + SPACING.space_20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_15,
  },
  textRoasted: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBGInfo;
