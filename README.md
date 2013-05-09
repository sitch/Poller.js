Poller.js
=========

AMD friendly setTimeout poller that executes a given callback on a certain interval.  Useful to embed Ajax calls or animations.

### Downloads (Right-click, and use "Save As")

- [Development Version](<https://raw.github.com/Sitch/Poller.js/master/Poller.js>)   1.73kb, Uncompressed with Comments
- [Production Version](<https://raw.github.com/Sitch/Poller.js/master/Poller.min.js>)   0.53kb, Minified and Gzipped


##Basic Usage

###Initialize
Takes a truple of arguments: (callback, interval, context).

- callback MUST be a function.
- interval MUST be a nummber.
- context will be applied to the callback on each poll.

```js

// Initialize
var poller = new Poller(function(){
  alert('Just initialized.');
}, 1000);

// and Start
poller.start();


// or Chain
var poller = new Poller(function(){
  // Will have access to the context provided
  alert('Chained initialize and start. Thanks' + this.author); // Sitch
}, 1000, {author: 'Sitch'}).start()
```

###Restart:
Effectively call poller.stop().start();
```js
poller.restart();
```

###Stop:
Can call whether or not the poller is running.
```js
if(poller.isRunning()){ // boolean
  poller.stop();
}
```

###UpdateInterval:
If the updated interval is different than the current interval, there will be a restart.  Otherwise it is idempotent.
```js
// Update interval to 5sec
poller.updateInterval(5000);
```

###poller.result:
```js
var poller = new Poller(function(){
  alert('result is useful for dealing with the result of the polling fn call');
  return 5000;
}, 1000).start();

poller.result; // 5000;
```


##Example Ajax poller:

```js
// Initialize the poller with a 1sec interval
var poller = new Poller(function(){
  return $.ajax({
    url: '/analytics',
    type: 'post',
    data: {
      timestamp: +new Date()
    }
  });
}, 1000).start();

// After the first response, update the interval to 5sec
$.when(poller.result).then(function(){
  poller.updateInterval(5000);
});
```
