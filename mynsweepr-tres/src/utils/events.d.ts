import { SyntheticEvent } from "react";

export type SyntheticEventHandler<T = Element> = (event: SyntheticEvent<T>) => void;