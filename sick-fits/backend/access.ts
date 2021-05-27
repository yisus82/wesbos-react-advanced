import { ListAccessArgs } from './types';

// At it's simplest, the access control returns a yes or no value depending on the users session
export const isSignedIn = ({ session }: ListAccessArgs) => !!session;
