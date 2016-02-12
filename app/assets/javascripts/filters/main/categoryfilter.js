angular.module('letsDoIt')

.filter('categoryFilter', function() {
  return function(items, filteredByCategory) {
    var filtered = [];
    if(filteredByCategory === null) {
      return items;
    }
    angular.forEach(items, function(item) {
      if(item.category_id == filteredByCategory) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

