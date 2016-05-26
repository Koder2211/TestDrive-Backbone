/**
 * Copyright 2013 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
  // Do a ping to Kinvey whenever the button is clicked.
   
    
    // Login functionality
    var button = $('#login');
    button.on('click', function() {
      
    var promise = Kinvey.User.login({
        username : 'mind1',
        password : 'mind1'
      });
    promise.then(function(user) {
        alert(user.username);
    }, function(error) {
      alert('Kinvey Login failed for mind1. Response: ' + error.description);
    });
  });
    
    // Logout functionality
    var button = $('#logout');
  button.on('click', function() {
    var promise = Kinvey.User.logout();
    promise.then(function() {
        alert("Logged out");
    }, function(error) {
      alert('Kinvey Logout failed. Response: ' + error.description);
    });
  });
    
    
     var button = $('#jobroles');
    button.on('click', function() {
          
             var query = new Kinvey.Query();
            // query.equalTo('name', 'Call Center');
        
   var names = ["Administration","Call Center"];
   var finalQuery;
   for (var i =0; i < names.length; i++){
        var q = new Kinvey.Query().equalTo('name',names[i]);
        finalQuery = (finalQuery) ? finalQuery.and(q) : q;
       
        
//        if(finalQuery)
//            {
//                finalQuery = finalQuery.or(q).or();
//            }
//        else
//            {
//                finalQuery = q;
//            }
        

    }
        
//  query.equalTo('name', 'MyJobSadasddsadantosh4').or().equalTo('name', 'Call Center').or().equalTo('name','Administration');
             
            var promise = Kinvey.DataStore.find('Job-Roles', finalQuery);
            promise.then(function(response) {
                alert('Fetched Job Roles: ' + response[0].name);
                
    }, function(error) {
      alert('Query Failed. Response: ' + error.description);
    });

});
    
    
        var button = $('#geoloc');
        button.on('click', function() {
            var defaultDistance = 2; 
                navigator.geolocation.getCurrentPosition(function(loc){
                    var coord = [loc.coords.longitude,loc.coords.latitude];
                  var query = new Kinvey.Query();
                    query.near('_geoloc',coord,defaultDistance);

                    var promise = Kinvey.DataStore.find('Hotels',query);
                    promise.then(function(response) {
                        alert('Fetched Hotels');

                    }, function(error) {
                        alert('Query Failed. Response: ' + error.description);
                    });
                });
        });
    
    
  

}());

    