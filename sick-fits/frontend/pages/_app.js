import PropTypes from 'prop-types';
import Page from '../components/Page';

const App = ({ Component, pageProps }) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default App;
