
var express = require('express');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require("request");
var url = require("url");
//var $ = require("jquery");
// var promise = require('promise');
var app = express();
//http://stackoverflow.com/questions/35030676/looping-promises-in-nodejs
var Q = require('q'); 
// var promise = Q.when('test');
var Promise = require("bluebird");

// create a server
//http.createServer(function(req, res) {
  
/* On affiche la liste des daily PVE */
app.get('/', function(req, res) { 
  request({url:'https://api.guildwars2.com/v2/achievements/daily', json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //pveIds contains list of pve dailies id
      var pveIds = body.pve;
      console.log("PveIds : "+  pveIds);
      
      //init tab, will contain dailies title
      var pveNames = [];
        
      Promise.map(pveIds, function(pveId) {
        // Promise.map awaits for returned promises as well.
        request.get({
            url: 'https://api.guildwars2.com/v2/achievements?id=' + pveId.id,
            json: true
          },
          function(error, response, body) {
            console.log('log 1: ' + body.name);
            if (response.statusCode == 200) {
              return body.name;
            }
          
        });
      }).done(function(results) {
        console.log("done");
        console.log(results);
        console.log("names tab:" + pveNames);
        res.render('pve.ejs', {
          names: pveNames, ids: pveIds
        });
      });
    
      // (function(){
      //   for(var i=0;i<pveIds.length;i++){
      //       request({url:'https://api.guildwars2.com/v2/achievements?id='+pveIds[i].id, json: true},
      //       function (error, response, body) {
      //         if (!error && response.statusCode == 200) {
      //           //charger le tableau PveNames
      //           console.log("body name: "+body.name);
      //           pveNames.push(body.name);
      //         }
      //       })
      //   }
      // })().then( function(val) {
      //   console.log("names tab:"+ pveNames);
      //   res.render('pve.ejs', {names: pveNames});
      // }, function(error){
      //   console.log('erreur:' + error);
      // });
    
      // for(var idx = 1 ; idx <= 1 ; idx++){
      //     (function(){
      //       for(var i=0;i<pveIds.length;i++){
      //           request({url:'https://api.guildwars2.com/v2/achievements?id='+pveIds[i].id, json: true},
      //           function (error, response, body) {
      //             if (!error && response.statusCode == 200) {
      //               //charger le tableau PveNames
      //               console.log("body name: "+body.name);
      //               pveNames.push(body.name);
      //             }
      //           })
      //       } 
      //       promise.then( function(val) {
      //         console.log("names tab:"+ pveNames);
      //         res.render('pve.ejs', {names: pveNames});
      //       });
      //     })();
      // }
      
      //for(var i=0;i<pveIds.length;i++){
      //   //console.log("pve id: "+pveIds[i].id);
      //   //lance une requete pour avoir le détail de chaque daily
      //   request({url:'https://api.guildwars2.com/v2/achievements?id='+pveIds[i].id, json: true},
      //   function (error, response, body) {
      //     if (!error && response.statusCode == 200) {
      //       //charger le tableau PveNames
      //       console.log("body name: "+body.name);
      //       pveNames.push(body.name);
      //     }
      //   })
      // }
      
      
      
      /* test regis */
      // var results = {}, promiselist = [];
      // for (var p in pveIds) {
      //   promiselist.push( pveIds[p].aside( function(_p) {
      //     return function(result) {
      //         results[_p] = result;
      //     };
      //   }(p) ) );
      // }
      // return deferred.apply(null, promiselist).then(function(resultArr) {
      //   console.log('All metrics loaded', resultArr, results);
      //   return results;
      // });
      
      // $.when.apply(function(){
      //   pveIds.forEach(function(item){ 
      //     request({
      //       url:'https://api.guildwars2.com/v2/achievements?id='+item, json: true
      //     },function (error, response, body) {
      //       return (!error && response.statusCode == 200) ? body.name : '';
      //     });
      //   })
      // })
      // .then(function(results){
      //   // all done
      //   console.log('fini');
      //   console.log(results);
      // });
      
      /* NPM */
      // var promise = new Promise(function (resolve, reject) {
      //   get('http://www.google.com', function (err, res) {
          
      //     pveIds.forEach(function(item){
      //       request({url:'https://api.guildwars2.com/v2/achievements?id='+item, json: true},
      //       function (error, response, body) {
      //         if (!error && response.statusCode == 200) {
      //           //charger le tableau PveNames
      //           console.log("body name: "+body.name);
      //           pveNames.push(body.name);
      //         }
      //       });
      //     })
          
      //   if (err) reject(err);
        
      //   else resolve(res);
      //   });
      // });
      
      // //parcourt les id des dailies du jour
      // .then(function(str){
        
      // });
        
      
      
      // for(var i=0;i<pveIds.length;i++){
      //   //console.log("pve id: "+pveIds[i].id);
      //   //lance une requete pour avoir le détail de chaque daily
      //   request({url:'https://api.guildwars2.com/v2/achievements?id='+pveIds[i].id, json: true},
      //   function (error, response, body) {
      //     if (!error && response.statusCode == 200) {
      //       //charger le tableau PveNames
      //       console.log("body name: "+body.name);
      //       pveNames.push(body.name);
      //     }
      //   })
      // }
      // promise.then(function (str){
      //     console.log("names tab:"+ pveNames);
      //     res.render('pve.ejs', {names: pveNames});
      // }); //fin for
      
    }
  })
    
})
.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
}).listen(process.env.PORT, process.env.IP);