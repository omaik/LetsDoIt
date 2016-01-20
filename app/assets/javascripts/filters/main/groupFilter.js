angular.module('letsDoIt')

.filter('groupFilter', function() {
  return function(items, filteredByGroupId) {
    if(filteredByGroupId===null) {
      return items;
    }
    
    var filtered = [];

    angular.forEach(items, function(item) {
      if(item.group_id == filteredByGroupId) {
        filtered.push(item);
      }
    });
    return filtered;
    
  };
});