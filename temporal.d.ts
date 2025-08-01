import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
export { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';

type dt = typeof Date;

declare module "@js-temporal/polyfill" {
    export var Date: dt & {
        toTemporalInstant: (this: dt) => Temporal.Instant;
    };
    export var globalThis: {
        Temporal: typeof Temporal;
        Intl: typeof Intl;
    };
}
