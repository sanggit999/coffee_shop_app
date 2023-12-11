import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, SPACING} from '../theme/theme';

interface Props {
  name: string;
  color: string;
  size: number;
  bgColor: string;
}

function ButtonIcon(props: Props) {
  return (
    <View style={[styles.container, {backgroundColor: props.bgColor}]}>
      <CustomIcon name={props.name} color={props.color} size={props.size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SPACING.space_30,
    height: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});

export default ButtonIcon;
