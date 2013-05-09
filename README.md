Poller.js
=========

AMD friendly setTimeout poller that executes a given callback on a certain interval.  Useful to embed Ajax calls or animations.

Example:

Instantiate and start a new poller:

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

Restart:
```js
poller.restart();
```

Stop:
```js
if(poller.isRunning()){
  poller.stop();
}
```

UpdateInterval:
```js
$.when(poller.result).then(function(){
  poller.updateInterval(5000);
});
```
