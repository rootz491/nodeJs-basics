import { makeRequest } from '/static/js/baseFunctions.js'


//  communicate to backend api and hense database at some point
const addDataToDom = data => {
    
    data.endpoints.forEach(endpoint => {
        let li = document.createElement('li');
        let a = document.createElement('a');

        a.href = endpoint;
        a.innerText = endpoint;
        a.classList += 'endpoint min-w-36 text-blue-500 mx-auto px-2 py-1 rounded bg-gray-100 tracking-widest';
        li.appendChild(a);
        //  attach listener
        attachListener(a);
        $('data').appendChild(li);
    });
}

//  load data from user metadata and push it to DOM
const displayUserData = (user) => {
    $('userName').innerText = user.displayName;
    if (user.photoURL)
        $('userImg').src = user.photoURL;
    if(user.emailVerified) {
        $('verified').innerText = 'Yes'
        $('verified').style.color = 'green'
    }
    else {
        $('verified').innerText = 'No'
        $('verified').style.color = 'red'
    }
}


//  event listener to call API endpoint
const attachListener = a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        let resDiv = $('response');
        resDiv.innerText = '';

        makeRequest(a.href, 'get', {}, resData => {
             
            let data = document.createElement('p');
        
            data.classList += 'font-thin whitespace-pre-wrap tracking-widest';
            data.innerText = JSON.stringify(resData);
        
            resDiv.appendChild(data);
        });
    });
}

//  get all secrets
const addSecretsToDom = (res) => {
    res.secrets.forEach(secret => {
        let p = document.createElement('p')
        let newSecret = document.createElement('a')
        newSecret.classList = 'hover:bg-red-200 hover:text-white';
        p.classList += ' py-2 px-1 font-thin';
        newSecret.href = `/api/secret/delete`;
        newSecret.innerText = '🔥   ' + secret;
        p.appendChild(newSecret);
        $('secrets').appendChild(p);
        //  attaching delete listener for every secret
        attachDeleteListener(newSecret, secret);
    })
}

//  event listener to call API endpoint
const attachDeleteListener = (a, secret) => {
    a.addEventListener('click', e => {
        e.preventDefault();

        makeRequest(a.href, 'post', {secret}, res => {
            if(res.deleted === true) {
                //  remove a and p tag which originally container that `secret` ~
                e.target.parentElement.remove();
            }
        });
    });
}

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // User is signed in.
        //    get data from secured api
        await makeRequest('/api/endpoints', 'get', {}, addDataToDom);
        
        //  get all secrets from database through API
        await makeRequest('/api/secrets', 'get', {}, addSecretsToDom);
        
        //  display user data
        displayUserData(user);


    }
});


//  push secret

document.addEventListener('submit', e => {
    e.preventDefault();

    makeRequest(e.target.action, e.target.method, {'secret': e.target.secret.value}, (res) => {
        //  reload page
        if(res.push === true)
            window.location.reload();
    });

    
})









