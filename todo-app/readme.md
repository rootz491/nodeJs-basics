# To-Do project

>   work in progress . . .

##  Bug[s]

*   got an error while making push req to server, for creating new **task**; not typical error but a bug.

*   when i send object as body of POST req, like this:
```js
{item: "hello"}
```

*   server gets it like this,
```js
{hello: ''}
```

*   now im using jquery to send request and it's working fine!

*   i tried `xhr` & `axiom` to send request but got almost similar results/response; 