// import scss
import './styles/main.scss';
import importAll from './util/importAll';

// import scss
importAll(require.context('./styles/', true, /scss/i));

// import image
importAll(require.context('./assets/images', false, /\.(gif|png|jpe?g|svg|ico)$/i));

// import util
importAll(require.context('./util/', true, /ts/i));

