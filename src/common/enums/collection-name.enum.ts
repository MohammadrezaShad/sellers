import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  IMAGE = 'image',
  USER = 'user',
  VISIT_STATISTICS = 'visitStatistics',
  TAXONOMY = 'taxonomy',
  VIDEO = 'video',
  PERMISSION = 'permission',
  ROLE = 'role',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
