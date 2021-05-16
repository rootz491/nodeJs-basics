//  create account

export const createUserAccount = (data) => {
    return axios.post('/auth/signup', data)
        .then(res => res.data);
}




export const makeRequest = (url, method, data, fn) => {

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        if (method == 'get')
            return makeGetReq(url, idToken, fn);
        else
            return makePostReq(url, data, idToken, fn);
    });
}


const makePostReq = async (url, data, token, fn) => {
   
    return axios.post(url, data, {
        headers: { 'Authorization': `Bearer ${token}` } 
    }).then(res => res.data)
      .then(stuff => fn(stuff))
      .catch(err => console.log(err));
}



const makeGetReq = async (url, token, fn) => {

    return axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` } 
    }).then(res => res.data)
      .then(data => fn(data))
      .catch(err => console.log(err));
}
