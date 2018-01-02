'use strict';

app.controller('celebController', function ($scope, dataFactory, $route, $uibModal, $log) {
    $scope.create = false;
    $scope.name;
    $scope.country;
    $scope.age;
    $scope.celebs;
    $scope.sortKey = "name";


    
    dataFactory.getCelebs()
        .then(function (response) {
            $scope.celebs = response.data;
            $scope.totalItems = $scope.celebs.length;
        }, function (error) {
            $scope.status = 'Unable to load celeb data: ' + error.message;
        });
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.delete = function (id, name) {
        var ans = confirm("Are you sure you want to delete " + name + "?");
        if (ans == true) {
            dataFactory.deleteCeleb(id)
                .then(function (response) {
                    alert(name + " Was successfully deleted.");
                    $route.reload();
                }, function (error) {
                    alert("There Was a problem. Please try again.");
                });
        }
    }

    // MODAL //
    $scope.animationsEnabled = true;

    $scope.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$scope',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            component: 'modalComponent',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };


});

app.controller('ModalInstanceCtrl', function ($scope, dataFactory, $route, $uibModalInstance) {
    $scope.ok = function () {
        if ($scope.name != null && $scope.country != null && $scope.age != null) {
            dataFactory.createCeleb($scope.name, $scope.country, $scope.age)
                .then(function (response) {
                    $uibModalInstance.dismiss('ok');
                    alert($scope.name + " Was successfully created.");
                    $route.reload();
                }, function (error) {
                    alert("There Was a problem. Please try again.");
                });
        }
        else {
            alert("Please insert all the data.");
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});







app.controller('editController', function ($scope, dataFactory, $routeParams, $location) {
    $scope.celeb;
    $scope.name;
    $scope.country;
    $scope.age;
    $scope.id;

    var id = $routeParams.celebID;
    dataFactory.getCelebById(id)
        .then(function (response) {
            $scope.celeb = response.data;
            $scope.name = $scope.celeb.name;
            $scope.country = $scope.celeb.country;
            $scope.age = $scope.celeb.age;
            $scope.id = $scope.celeb.id;
        }, function (error) {
            $scope.status = 'Unable to load celeb data: ' + error.message;
        });
    $scope.update = function (id) {
        if ($scope.celeb.name == $scope.name && $scope.celeb.age == $scope.age && $scope.celeb.country == $scope.country) {
            alert("Celeb did not changed!");
        } else {
            dataFactory.updateCeleb(id, $scope.name, $scope.country, $scope.age)
                .then(function (response) {
                    alert($scope.name + " Was successfully updated.");
                    $location.path('/');
                }, function (error) {
                    alert("There Was a problem. Please try again.");
                });
        }

    }
});
