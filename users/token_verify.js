var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.setToken = function(username,userid){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			name:username,
			_id:userid
		},signkey,{ expiresIn:'0.01h' });
		resolve(token);
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		jwt.verify(token, signkey, (err, decode)=> {
			if (err) {  //  时间失效的时候 || 伪造的token
				reject(err)
			} else {
				resolve(decode)
			}
		})
	})
}