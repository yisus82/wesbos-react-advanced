import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { sendPasswordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import insertSeedData from './seed-data';

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
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    }
  }
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
    onConnect: async (keystone) => {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    }
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
    CartItem,
  }),
  ui: {
    isAccessAllowed: ({ session }) => !!session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
}));
