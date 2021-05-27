import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// At it's simplest, the access control returns a yes or no value depending on the users session
export const isSignedIn = ({ session }: ListAccessArgs): boolean => !!session;

const generatedPermissions = permissionsList.reduce(
  (permissionsObject, permission) => ({
    ...permissionsObject,
    [permission]: ({ session }: ListAccessArgs) =>
      !!session?.data.role?.[permission],
  }),
  {}
);

export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('Jesús');
  },
};
