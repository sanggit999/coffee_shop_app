import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';

function ProfilePic() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:SPACING.space_36,
    height:SPACING.space_36,
    borderRadius:BORDERRADIUS.radius_10,
    borderWidth:2,
    borderColor:COLORS.secondaryDarkGreyHex,
    alignItems:"center",
    justifyContent:"center",
    overflow:"hidden"
  },
  image: {
    width:SPACING.space_36,
    height:SPACING.space_36,
  },
});

export default ProfilePic;
