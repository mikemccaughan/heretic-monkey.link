/// <reference types="node" />
import { AnyObject, Entity } from '@loopback/repository';
export declare class Wall extends Entity implements AnyObject {
    id: number;
    name: string;
    file?: Buffer;
    description?: string;
    resolutions?: number[];
    adultScore?: number;
    category?: string;
    canonical?: string;
    thumb?: Buffer;
    constructor(data?: Partial<Wall>);
}
