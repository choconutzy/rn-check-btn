import React from 'react';
import {
  NativeModules,
  Platform,
  TouchableOpacity,
  Text,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'rn-check-btn' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnLibrary = NativeModules.RnLibrary
  ? NativeModules.RnLibrary
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return RnLibrary.multiply(a, b);
}

interface CheckButtonType extends ViewProps {
  text?: string;
  onPress?: () => void;
  size?: number;
  color?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CheckButton = ({ text, onPress, ...rest }: CheckButtonType) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} {...rest}>
        <Text>{text || 'Button'}</Text>
      </TouchableOpacity>
    </>
  );
};
