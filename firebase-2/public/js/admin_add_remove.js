import { makeRequest } from '/static/js/baseFunctions.js';
/**
 * 
 * @TODO
 * 
 * 1. 
 * 
 * https://firebase.google.com/docs/auth/admin/email-action-links
 * 
 * implement password reset and email verification link
 * 
 * 2.
 * 
 * fix that bug on making request on /app page
 * 
 */


//  req to make user admin for now here,

$('adminAdd').onclick = e => {
    e.preventDefault();

    makeRequest('/api/isAdmin', 'post', {'reqAdmin': true}, res => {
        console.log(res);
        // window.location = window.location.href;
    });
}

$('adminRemove').onclick = e => {
    e.preventDefault();

    makeRequest('/api/isAdmin', 'post', {'reqAdmin': false}, res => {
        console.log(res);
        // window.location = window.location.href;
    });
}