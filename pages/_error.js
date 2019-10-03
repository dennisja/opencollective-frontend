import React from 'react';
import PropTypes from 'prop-types';

import ErrorPage, { generateError } from '../components/ErrorPage';

/**
 * This page is shown when NextJS triggers a critical error during server-side
 * rendering, typically 404 errors.
 */
class NextJSErrorPage extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number.isRequired,
    url: PropTypes.string,
    err: PropTypes.object,
  };

  static getInitialProps({ res, err, req }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, err, url: req && req.originalUrl };
  }

  render() {
    const { statusCode, url } = this.props;

    if (statusCode === 404 && url) {
      const slugRegex = /^\/([^/?]+)/;
      const parsedUrl = slugRegex.exec(url);
      return <ErrorPage log={false} error={generateError.notFound(parsedUrl[1])} />;
    } else {
      return <ErrorPage />;
    }
  }
}

export default NextJSErrorPage;
