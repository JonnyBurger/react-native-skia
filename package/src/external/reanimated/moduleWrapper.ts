import { useMemo } from "react";

import type { SharedValueType } from "../../renderer/processors/Animations";

import { Reanimated2, Reanimated3, reanimatedVersion } from "./import";

// This one is needed for the deprecated useSharedValue function
// We can remove it once we remove the deprecation

export const HAS_REANIMATED2 = !!Reanimated2;
export const HAS_REANIMATED3 = !!Reanimated3;

function throwOnMissingReanimated2() {
  if (!HAS_REANIMATED2) {
    throw new Error(
      "Reanimated was not found, make sure react-native-reanimated package is installed if you want to use \
      react-native-skia's integration layer API."
    );
  }
}

function throwOnMissingReanimated3() {
  if (!HAS_REANIMATED3) {
    throw new Error(
      `Reanimated version ${reanimatedVersion} is not supported, please upgrade to 3.0.0 or newer.`
    );
  }
  throwOnMissingReanimated2();
}

export const useSharedValue =
  Reanimated2?.useSharedValue ||
  ((value: number) => useMemo(() => ({ value }), [value]));

export const startMapper =
  Reanimated2?.startMapper || throwOnMissingReanimated2;
export const stopMapper = Reanimated2?.stopMapper || throwOnMissingReanimated2;
export const runOnJS = Reanimated2?.runOnJS || throwOnMissingReanimated2;
export const isSharedValue = <T>(
  value: unknown
): value is SharedValueType<T> => {
  throwOnMissingReanimated3();
  return !!value && Reanimated3.isSharedValue(value);
};
