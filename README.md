# goodhabit
一个问答小测试。nodejs + mongodb + H5动画

###开启mongodb

安装mongodb后，进入mongodb安装目录下的bin，终端输入
```
./mongod
```

另一个终端输入
```
./mongo
```
mongodb几个常用命令
```
mongo
show dbs
use habit
show collections
db.habits.find({})
db.users.update({"name":"a"}, {$set:{"role":51}})
```

###启动
```
npm i
npm start
前台：http://localhost:8090/goodhabit/
简单后台：http://localhost:8090/goodhabit/admin
```

###报错
```
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }   
  js-bson: Failed to load c++ bson extension, using pure JS version  

找到 npm 的module mongodb ..node_modules\mongodb\node_modules\bson\ext\index.js
并并在catch块改变bson的js本版路径：
bson = require('../build/Release/bson');
变成:
bson = require('../browser_build/bson');
```
