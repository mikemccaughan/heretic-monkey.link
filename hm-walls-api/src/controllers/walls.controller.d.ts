import { Wall } from '../models';
export declare class WallsController {
    private repository;
    constructor();
    getAll(): Promise<Wall[]>;
    getById(id: number): Promise<Wall>;
    create(wall: Wall): Promise<Wall>;
    update(id: number, wall: Wall): Promise<void>;
    del(id: number, wall: Wall): Promise<void>;
}
