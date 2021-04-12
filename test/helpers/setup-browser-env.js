/* eslint-disable no-unused-vars */
import browserEnv from 'browser-env';
import HowlerGlobal from 'howler';

browserEnv();
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
};
