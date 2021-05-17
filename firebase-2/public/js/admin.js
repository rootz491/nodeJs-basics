import { makeRequest } from '/static/js/baseFunctions.js';

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //    check if user is admin or not?!
        makeRequest('/api/isAdmin', 'get', {}, res => {
            if(res.admin) {
                $('greeting').innerText = `Welcome, ${user.displayName}!`;
                loadPage();
            }
            else
                $('greeting').innerText = 'Sorry, you\'re not Admin! This page is bit useless for you 😬';
        });

        //  if admin, then fetch priv data
        const loadPage = () => {
            //  make requests to more admin endpoints
            makeRequest('/api/admin/users', 'get', {}, res => {
                console.log(res);
            });
            makeRequest('/api/admin', 'get', {}, res => {
                console.log(res);
            });
        }
        

    }
});
