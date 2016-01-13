var main = angular.module('main', []);
main.controller('ToDoList', function($scope) {
  $scope.listFooter = false;
  $scope.btnState = 'All';
  $scope.formShow = [];
  $scope.list = [];
  $scope.addList = function() {
    if ($scope.newToDo === undefined || $scope.newToDo === '') {
      return;
    }
    $scope.list.push({
      text: $scope.newToDo,
      state: false
    });
    $scope.newToDo = '';
    $scope.listFooter = true;
  };
  $scope.deleteList = function(index) {
    $scope.list.splice(index, 1);
    if ($scope.list.length === 0) {
      $scope.listFooter = false;
    }
  };
  $scope.judgeListState = function(index) {
    if ($scope.btnState === 'All') {
      return true;
    }
    else if ($scope.btnState === 'Active') {
      return !$scope.list[index].state;
    }
    else {
      return $scope.list[index].state;
    }
  };
  $scope.showAll = function() {
    $scope.btnState = 'All';
  };
  $scope.showActive = function() {
    $scope.btnState = 'Active';
  };
  $scope.showCompleted = function() {
    $scope.btnState = 'Completed';
  };
  $scope.allChange = function() {
    if ($scope.allCheck === false) {
      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].state === true) {
          $scope.list[i].state = false;
        }
      }
    }
    else {
      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].state === false) {
          $scope.list[i].state = true;
        }
      }
    }
  };
  $scope.clearCompleted = function() {
    for (var i = $scope.list.length - 1; i >= 0; i--) {
      if ($scope.list[i].state === true) {
        $scope.deleteList(i);
      }
    }
  };
  $scope.calculateRemark = function() {
    for (var i = count = 0; i < $scope.list.length; i++) {
      if ($scope.list[i].state === true) {
        count++;
      }
    }
    return $scope.list.length - count;
  };
  $scope.inputBoxes = {
    inputBox: [],
    showInput: function(index) {
      this.inputBox[index] = $scope.list[index].text;
      $scope.focusme = false;
      $scope.formShow[index] = true;
    },
    hideInput: function(index) {
      $scope.formShow[index] = false;
      $scope.focusme = undefined;
      $scope.list[index].text = this.inputBox[index];
    }
  }
});
main.directive('focusMe', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === false) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
});
