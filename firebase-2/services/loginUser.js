const admin = require('../services/firebase-service');

module.exports = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken = req.headers.authorization.split(' ')[1];
        try {
            const{ authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;
            console.log('login successful')
            //  if user has correct 
            res.send({login: true});
            // res.render('/app');
        }
        catch (e) {
            console.log(e);
            res.send({login: false});
        }
     }
    else 
        res.status(400).send({error: 'bad request, please check authorization header'});
}