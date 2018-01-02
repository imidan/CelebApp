/**
 * Main AngularJS Web Application
 */

var app = angular.module('celebs', ['ui.bootstrap','ngRoute','angularUtils.directives.dirPagination']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      /* Home */
      .when("/", { templateUrl: "templates/home.html", controller: "celebController" }) 
      .when('/edit/:celebID', { templateUrl: 'templates/edit.html', controller: "editController" })
      /* else 404 */
      .otherwise("/", { templateUrl: "templates/home.html", controller: "celebController" });
  }]);




