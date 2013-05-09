Poller.js
=========

AMD friendly setTimeout poller that executes a given callback on a certain interval.  Useful to embed Ajax calls or animations.

### Downloads (Right-click, and use "Save As")

- [Development Version](<https://raw.github.com/Sitch/Poller.js/master/Poller.js>)   1.73kb, Uncompressed with Comments
- [Production Version](<https://raw.github.com/Sitch/Poller.js/master/Poller.min.js>)   0.53kb, Minified and Gzipped


##Example:

###Instantiate and start a new poller:

```js
var poller = new Poller(function(){
  return $.ajax({
    url: '/analytics',
    type: 'post',
    data: {
      timestamp: +new Date()
    }
  });
}, 1000).start();
```

###Restart:
```js
poller.restart();
```

###Stop:
```js
if(poller.isRunning()){
  poller.stop();
}
```

###UpdateInterval:
```js
$.when(poller.result).then(function(){
  poller.updateInterval(5000);
});
```
