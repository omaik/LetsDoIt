angular.module('letsDoIt')

.controller('statController', [
  '$scope',
  'tasksResource',
  '$timeout',
  function($scope, tasksResource, $timeout){
    var graphData;
    $scope.index = 0;
    $scope.dueDatesList = {
      'week': 0,
      'two_weeks': 1,
      'month': 2
    }
    $scope.finishedList = {
      'week_ago': 0,
      'two_weeks_ago': 1,
      'month_ago': 2
    }
    $scope.pieList = ['all', 'uncompleted', 'completed']
    tasksResource.stat(function(data) {
      graphData = data;
      $scope.setDueDateLength($scope.indexDueDate);
      $scope.setFinishedLength($scope.indexFinished);
      $scope.setCategories($scope.pieList[$scope.indexCategory]);
      $scope.setPriorities($scope.pieList[$scope.indexPriority]);
      });
    $scope.setDueDateLength = function (value){
      var dates = [7, 14, 31]
      $timeout(function() {
        $scope.dueDateLabels = graphData.due_date[0].slice(0, dates[value]);
        $scope.dueDateData = [graphData.due_date[1].slice(0, dates[value])];
      });
    };
    $scope.setFinishedLength = function (value){
      var dates = [24, 17, 0]
      $timeout(function() {
        $scope.finishedLabels = graphData.finished[0].slice(dates[value],  graphData.finished[0].length);
        $scope.finishedData = [graphData.finished[1].slice(dates[value],  graphData.finished[0].length)];
      });
    };
    $scope.setCategories = function(value) {
      $timeout(function() {
        $scope.categoriesData = graphData.category.value[value];
        $scope.categoriesLabels = graphData.category.label;
      });
    };
    $scope.setPriorities = function(value) {
      $timeout(function() {
        $scope.prioritiesData = graphData.priority.value[value];
        $scope.prioritiesLabels = graphData.priority.label;
        $scope.prioritiesColors = graphData.priority.color;
      })
    };
    $scope.options = {
      bezierCurve : true,
      bezierCurveTension : 0.3,
      scaleBeginAtZero: true,
      scaleFontSize: 15,
      tooltipTemplate: '<%= " " + value + " " %>'
    }
}])
