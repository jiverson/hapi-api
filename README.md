# hapi-api

### Installation
```
$ npm install
$ npm start
```
### Notes
Server can take awhile to get the initial data (10s) because of rate limiting but after is cached for a certain amount of time afterwards. If this were a production application I would either use a different mechanism to handle the caching via redis/mongo/client?.

Open your browser:  
[http://localhost:8000](http://localhost:8000)  
or  
Test the search api via space seperated terms     
[http://localhost:8000/search?q=backpack zipper](http://localhost:8000/search?q=backpack%20zipper)  

### Test
```
$ npm test
```

### Technology
* [Hapijs](https://github.com/hapijs/hapi)
* [Joi](https://github.com/hapijs/joi)
* [request](https://github.com/request/request)
* [rxjs](https://github.com/ReactiveX/RxJS)
* [bulma](https://github.com/jgthms/bulma)
