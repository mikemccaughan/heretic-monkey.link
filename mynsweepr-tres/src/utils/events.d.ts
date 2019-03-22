import { SyntheticEvent } from "react";

export type SyntheticEventHandler<T = Element> = (
  event: SyntheticEvent<T>
) => void;
export type SyntheticEventWithDataHandler<T = Element, U = any> = (
  data: U,
  event: SyntheticEvent<T>
) => void;
