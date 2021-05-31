import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// At it's simplest, the access control returns a yes or no value depending on the users session
export const isSignedIn = ({ session }: ListAccessArgs): boolean => !!session;

interface Permissions {
  [name: string]: ({ session }: ListAccessArgs) => boolean;
}

const generatedPermissions: Permissions = permissionsList.reduce(
  (permissionsObject, permission) => ({
    ...permissionsObject,
    [permission]: ({ session }: ListAccessArgs) =>
      !!session?.data.role?.[permission],
  }),
  {}
);

// Permissions check if someone meets a criteria - yes or no
export const permissions: Permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('Jesús');
  },
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({
    session,
  }: ListAccessArgs): boolean | { user: { id: string } } {
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs): boolean | { status: string } {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
};
