require('http').createServer(function(req, res) {
  res.end('Hello World!\n');
  
        var gw2 = require('./src/gw2-api');
        var memStore = function () {};
        
        memStore.prototype = {
          cache: {},
          setItem : function (key, val) {
            this.cache[key] = val;
            return this;
          },
          
          getItem: function (key) {
            return this.cache[key];
          }
        }
        
        module.exports = {
          gw2 : gw2,
          memStore : memStore
        }
  
  
         console.log('Someone visited our web server!');
        //var gw2 = require('./src/gw2-api');
        var api = new gw2.gw2();
        
        // Set storage system to RAM if no access to localStorage
        api.setStorage(new gw2.memStore());
        
        // Get daily pve achievement names:
        api.getDailyAchievements().then(function (res) {
          if (!res.pve) {
            return;
          }
        
          var achievementIds = [];
        
          for (var i = 0, len = res.pve.length; i < len; i++) {
            achievementIds.push(res.pve[i].id);
          }
        
          return api.getAchievements(achievementIds);
        }).then(function (res) {
          for (var i = 0, len = res.length; i < len; i++) {
            console.log(res[i].name);
          }
        });
        
        // Get all character names associated with an account.
        api.setAPIKey('352339F1-3BEC-A749-B285-228A08B489CB422EA6F3-9BFE-49E9-8068-7911101DAAAF');
        
        api.getCharacters().then(function (res) {
          for (var i = 0, len = res.length; i < len; i++) {
            // This API call just returns an array of string character names.
            console.log(res[i]);
          }
        });
        
        // Get Character Details
        api.getCharacters('Zojja').then(function (res) {
          console.log(res);
        });
        
}).listen(3001, process.argv[2]);
console.log('Sending greetings on ', process.argv[2] + ':3001');