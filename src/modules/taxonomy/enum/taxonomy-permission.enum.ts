import { registerEnumType } from '@nestjs/graphql';
export enum TaxonomyPermission {
  CREATE_TAXONOMY = 'create_taxonomy',
  UPDATE_TAXONOMY = 'update_taxonomy',
  DELETE_TAXONOMY = 'delete_taxonomy',
}

registerEnumType(TaxonomyPermission, {
  name: 'TaxonomyPermission',
});
