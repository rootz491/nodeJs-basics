#   firebase + nodeJs

implementing firebase auth and firestore with nodeJs backend server.

##  Firebase Auth

>   Admin SDK only verifies token and allow to access specific set of endpoints.
    User session only remain on `client-application` untill session exprires;

*   firebase auth works with nodejs using something called **firebase admin SDK** which helps to config firebase app on server-side and then, can initialize the admin SDK.
    
*   authorization process use **JWT Token** with comes with every request from client-side.

*   **Admin SDK** will be used to verify the recieved *token*. 
    *   `checkIfAuthorized` middleware will take care of checking whether token is valid or not.
    *   similarly we can check if token comes from **admin** account or nor.
    checkout `checkIfAdmin` middleware for code.

*   If token is valid, then request is forwarded to next() middleware or final endpoint. Else request will be returned with `401` or `400`.

##  Firebase Firestore [noSQL] DB

*   google provides `API` to access Cloud Firestore. here's ![documentation]('https://googleapis.dev/nodejs/firestore/latest/')

***

### build tailwind into project

```bash
$   npx tailwindcss init
$   npx tailwindcss-cli@latest build -o tailwind.css
```

*   First comand creates file named `tailwind.config.js` which is basically configuration for classes.

    *   Here I'm it because it will `purge` all unwanted classes when **building** of `tailwind.css`

*   second command creates file named `tailwind.css` which can be used as normal stylesheet to style webpage by linking it 😅

