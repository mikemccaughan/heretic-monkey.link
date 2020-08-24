import { get, post, patch, del, requestBody, param } from '@loopback/rest';
import { repository } from '@loopback/repository';
import { WallRepository } from '../repositories/wall.repository';
import { Wall } from '../models';

export class WallsController {
    @repository(WallRepository)
    private repository: WallRepository;

    constructor() {
    }
    @get('/walls')
    async getAll(): Promise<Wall[]> {
        return await this.repository.find();
    }
    @get('/walls/{id}')
    async getById(@param.path.number('id') id: number): Promise<Wall> {
        return await this.repository.findById(id);
    }
    @post('/walls')
    async create(@requestBody() wall: Wall): Promise<Wall> {
        return await this.repository.create(wall);
    }
    @patch('/walls/{id}')
    async update(@param.path.number('id') id: number, @requestBody() wall: Wall): Promise<void> {
        await this.repository.update(wall);
    }
    @del('/walls/{id}')
    async del(@param.path.number('id') id: number, @requestBody() wall: Wall): Promise<void> {
        await this.repository.delete(wall);
    }
}