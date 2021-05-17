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

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // User is signed in.
        //    get data from secured api
        await makeRequest('/api/endpoints', 'get', {}, addDataToDom);
        
        //  display user data
        displayUserData(user);

    }
});







