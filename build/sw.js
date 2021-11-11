// // Inside of build.js:
// const {generateSW} = require('workbox-build');

// const swDest = 'build/sw.js';
// generateSW({
//   swDest,
//   // Other configuration options...
// }).then(({count, size}) => {
//   console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
// });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}