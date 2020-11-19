// import $ from 'jquery';
// import '../styles/styles.scss';
// import '../img/UI kit/Group.svg';
// import '../UI.blocks/UI-header.js'

// console.log('Hello test')


function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('../../src/', true, /\.js$|\.scss$/));