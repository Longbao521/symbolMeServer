var mongo = require('../model/mongo')
var userSchema = require ('../model/baseInfoSchema')

mongo.save(userSchema, {
    name: '李宇龙',
    age: 24,
    tel: '18752099509',
    email: '17766077316@163.com',
    education: '硕士',
    home: '山西晋城',
    school: '南京师范大学 地理科学学院'
})