//  create account

export const createUserAccount = (data) => {
    return axios.post('/user/auth/signup', data)
        .then(res => res.data);
}




export const makeRequest = (url, method) => {
    let token = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        if (method === 'get')
            return makeGetReq(url, token);
        else
            return makePostReq(url, idToken);
    });
}


const makePostReq = async (url, token) => {
    
    return axios.post(url, {}, {
        headers: { 'Authorization': `Bearer ${token}` } 
    }).then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
}



const makeGetReq = async (url, token) => {

    return axios.get(url, {}, {
        headers: { 'Authorization': `Bearer ${token}` } 
    }).then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
}
