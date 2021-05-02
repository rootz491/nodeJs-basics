#   learning project

##  middleware:
*   code run between request arrival & sending response.

```js
app.use((req, res, next) => {
    //  do something ...
    next();
})
```
*   calling `next()` is important; because esle, it wont go to next middleware.
*   probably last middleware is request handler and after that, respond will be sent to server ~

* middlewares can be specific to certain ***paths** too. for example, 

```js
app.use('/public', (req, res, next) => {
    //  code
    next();
});
```

*   supposing that, this code is written before `/public` request mapper, then this middleware will run before request mapper, which is itself a middleware!

### an example application of global middleware:

```js
app.use((req, res, next) => {
    console.log(`-> ${req.url}`);
    next();
})
```

>   it will log all the request to the server log (terminal); specifically just request paths!

*   static file can be handled in same way, i.e. with help of middleware!

```js
app.use('/public', express.static('css'));
```

*   here, any request that begins with `/public` will be handled here;
*   `css` is name of folder located at root of project with contains static files
*   for ex, `/public/style.css` this request will fetch the file whose location is `/css/style.css`.



##  body-parser pkg

it's also a middleware, it helps parsing body of `POST` request as they are **urlEncoded** when sent from browser!

*   basically it will make body of POST request understandable, whether it's a urlEncodedForm or json data!

### use

```js
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
urlEncodeParser = bodyParser.urlencoded({ extended: false });
    //  OR
// parse application/json
jsonParser = bodyParser.json();

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username);
});
 
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
});
```

##  make '\n' recognisable:

so to make newline character recognisable,
add a css property to `div` where that string is present.

```css
.message {
  /* other properties ... */
  white-space: pre-wrap;
}
```

also, after closing of element with `message` class, dont use spaces or newline chars. or it will break the structure of text inside the element.like:

```html
<p class="message"><%= data.message %></p>
```