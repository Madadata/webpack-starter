import React, { PropTypes } from 'react';
import styles from './App.css';

const App = ({ children }) =>
  <div className={styles.container}>
    {children}
  </div>;

App.propTypes = {
  children: PropTypes.object,
};

export default App;
