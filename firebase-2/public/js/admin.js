import { makeRequest } from '/static/js/baseFunctions.js';

const addUsersToDom = users => {
    if(users.length > 0) {
        $('users').classList += 'block'
        $('noUsers').remove();
        //  add header to `Users` div
        let header = document.createElement('div');
        const uname = document.createElement('p')
        uname.innerText='USER NAME';
        const uemail = document.createElement('p');
        uemail.innerText='EMAIL';
        const usec = document.createElement('p');
        usec.innerText='SECRETS';
        header.appendChild(uname);
        header.appendChild(uemail);
        header.appendChild(usec);
        header.classList = 'flex justify-between px-2 py-4 font-extrabold font-xl'
        $('users').appendChild(header);
        //  append tho each user data and add it to `Users` as a child 
        users.forEach(user => {
            let newUser = document.createElement('div');
            let name = document.createElement('p')
            name.innerText = user.name;
            let email = document.createElement('p')
            email.innerText = user.email;
            let secrets = document.createElement('p')
            secrets.innerText = user.secrets.length;

            newUser.className = 'flex justify-between p-2 my-1 border m-2';
            newUser.appendChild(name);
            newUser.appendChild(email);
            newUser.appendChild(secrets);
            $('users').appendChild(newUser);
        });
    }
}

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
                addUsersToDom(res.users);
            });
            makeRequest('/api/admin', 'get', {}, res => {
                console.log(res);
            });
        }
        

    }
});
