app.factory('dataFactory', function($http) {

    var urlBase = '../api/';
    var dataFactory = {};
    

    dataFactory.getCelebs = function () {
        return $http.get(urlBase + 'values');
    };

    dataFactory.getCelebById = function (id) {
        return $http.get(urlBase + 'values/' + id);
    };
    dataFactory.deleteCeleb = function(id) {
        return $http.delete(urlBase + 'values/' + id);
    };
    dataFactory.updateCeleb = function(id,name,country,age) {
        return $http({
            url: urlBase + 'values/',
            method: "POST",
            params: { cmd: 'update',
                      id: id,
                      name:name,
                      country:country,
                      age:age  
                     }
            })
    };
    dataFactory.createCeleb = function(name,country,age) {
        return $http({
            url: urlBase + 'values/',
            method: "POST",
            params: { cmd: 'create',
                      name:name,
                      country:country,
                      age:age  
                     }
            })
    };

    return dataFactory;
});