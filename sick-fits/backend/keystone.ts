import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/sick-fits';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
})

// @ts-ignore
export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({
    User
  }),
  ui: {
    isAccessAllowed: ({ session }) => !!session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
}));
