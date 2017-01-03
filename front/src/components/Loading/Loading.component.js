import React from 'react';
import spin from './spin.svg';
import styles from './Loading.stylesheet.css';

const Loading = () => ((
  <img src={spin} alt='spinner' width={90} className={styles.Loading}/>
));

export default Loading;
