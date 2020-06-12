
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store";
import WebFontLoader from 'webfontloader';
import FontFaceObserver from 'fontfaceobserver';
import { Provider } from "react-redux";
import { registerServiceWorker } from './config/serviceWorker';

import App from './app/App';

registerServiceWorker();

const store = configureStore();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,600,700', 'Material+Icons'],
  }
});

const Roboto300 = new FontFaceObserver('Roboto', { weight: 300 });
const Roboto400 = new FontFaceObserver('Roboto', { weight: 400 });
const Roboto600 = new FontFaceObserver('Roboto', { weight: 600 });
const Roboto700 = new FontFaceObserver('Roboto', { weight: 700 });
const MaterialIcons = new FontFaceObserver('Material Icons');

Promise.all([
  Roboto300.load(),
  Roboto400.load(),
  Roboto600.load(),
  Roboto700.load(),
  MaterialIcons.load(),
]);

const Root = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('react-root')
);
