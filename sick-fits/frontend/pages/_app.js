import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import { CartStateProvider } from '../lib/cartState';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <CartStateProvider>
      <Page>
        <Head>
          <title>Sick Fits</title>
        </Head>
        <Component {...pageProps} />
      </Page>
    </CartStateProvider>
  </ApolloProvider>
);

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
  apollo: PropTypes.object.isRequired,
};

export default withData(App);
