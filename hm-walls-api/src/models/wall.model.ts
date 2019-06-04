import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Wall extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'buffer',
  })
  file?: Buffer;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'array',
    itemType: 'number',
  })
  resolutions?: number[];

  @property({
    type: 'number',
  })
  adultScore?: number;

  @property({
    type: 'string',
  })
  category?: string;

  @property({
    type: 'string',
  })
  canonical?: string;

  @property({
    type: 'buffer',
  })
  thumb?: Buffer;


  constructor(data?: Partial<Wall>) {
    super(data);
  }
}
