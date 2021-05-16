import { makeRequest } from '/static/js/baseFunctions.js'

let dataElement = document.querySelector('#data');

const addDataToDom = data => {
    let newElem = document.createElement('p');

    newElem.innerText = data.message;

    newElem.classList += 'text-center text-blue-500';

    dataElement.appendChild(newElem);
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        //    get data from secured api
        makeRequest('/api/', 'get', {}, addDataToDom);
    }
  });


