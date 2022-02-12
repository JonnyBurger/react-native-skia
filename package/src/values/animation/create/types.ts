import type { IValue, IReadonlyValue } from "../../types";

export type INativeValue = IValue & {
  /**
   * Adds another value as the driver of this value. When the driver
   * value change, this value will be updated with either the value of the
   * dependant value, or if the cb parameter is provided, the result of the
   * callback. To remove a dependency, just call addDependency with an undefined
   * value.
   */
  setDriver: <DepT>(
    value: IReadonlyValue<DepT> | undefined,
    cb?: (v: DepT) => number
  ) => void;
  /**
   * Returns the current dependency of this value.
   */
  getDriver: () => IReadonlyValue | undefined;
};
