
var express = require('express');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require("request");
var url = require("url");
var jq = require("jquery");



var app = express();


// create a server
//http.createServer(function(req, res) {
  
/* On affiche la liste des daily PVE */
app.get('/', function(req, res) { 
  request({url:'https://api.guildwars2.com/v2/achievements/daily', json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var pveIds = body.pve;
      //console.log("body : "+ body);
      //console.log("PveIds : "+ pveIds);
      
      //initialise le tab avec le nom des 6 dailies
      var pveNames = [];
      //parcourt les id des dailies du jour
      pveIds.forEach(function(item){
        request({url:'https://api.guildwars2.com/v2/achievements?id='+item, json: true},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //charger le tableau PveNames
            console.log("body name: "+body.name);
            pveNames.push(body.name);
          }
        });
      }).then(function(){
        console.log("names tab:"+ pveNames);
        res.render('pve.ejs', {names: pveNames});
      });
        
      
      
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
      //   });
      // } //fin for
      
    }
  })
    
})
.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
}).listen(process.env.PORT, process.env.IP);
      
      
      
      /*if (page == '/') {
          request({url: 'https://api.guildwars2.com/v2/achievements/daily', json: true }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var html ='<!DOCTYPE html>'+
            '<html>'+
            '    <head>'+
            '        <meta charset="utf-8" />'+
            '        <title>Guild Wars 2 Daily Achievments</title>'+
            '    </head>'+ 
            '    <body>'+
            '     	<h1>Daily achievments</h1>'+
            '       <h2>PVE achievments</h2>';
          //console.dir(body) // Show the HTML for the Google homepage. 
          var pveIds = body.pve;
          console.log(pveIds);
          html+='<ul>';
          for (var i=0;i<pveIds.length;i++){
            html+= '<li>'+pveIds[i].id+'</li>';
          }
          html+='</ul>';
          html+=
            '       <h2>PVP achievments</h2>'+
            '       <h2>MCM achievments</h2>'+
            '    </body>'+
            '</html>';
            console.log(html);
            res.write(html, function(err) { res.end(); });
          
        } //fin if no error
        });
        
        
          
    } //fin page home (/)
    else if (page == '/pvp') {
        res.write('Envie de vous friter avec d\'autres joueurs ? Voilà vos missions');
    }
    else if (page == '/mcm') {
        res.write('Que la bataille commence');
    }else{
      res.write("<span style='font-size:xx-large; font-weight:bolder'>Erreur 404, la page que vous demandez n'est pas accessible.</span>")
    }
    
    
      
        
    res.end();*/


// Note: when spawning a server on Cloud9 IDE, 
// listen on the process.env.PORT and process.env.IP environment variables

// Click the 'Run' button at the top to start your server,
// then click the URL that is emitted to the Output tab of the console

