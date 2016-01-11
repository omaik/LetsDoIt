angular.module('letsDoIt')

.directive('colorpicker', function() {
  return {
    restrict:'A',
    link: function(scope, element) {
      var hexColor = '',
        context = element[0].getContext('2d'),
        colorWheel = document.getElementById('colorwheel'),
        drawImg = function() {
          element[0].height = element[0].width;
          colorWheel.height = element[0].width;
          colorWheel.width = element[0].width;
          context.drawImage(colorWheel, 0, 0, colorWheel.width, colorWheel.height);
        };
      if(colorWheel.complete) {
         drawImg();
      }   else {
         colorWheel.onload = drawImg;
      };
      element.bind('mousemove', function(event) {
        var x = event.offsetX - 10,
          y = event.offsetY - 10,
          imageData = context.getImageData(x, y, 1, 1),
          pixel = imageData.data,
          r = ('0' + (pixel[0]).toString(16)).slice(-2),
          g = ('0' + (pixel[1]).toString(16)).slice(-2),
          b = ('0' + (pixel[2]).toString(16)).slice(-2);
        hexColor = '#' + r + g + b;
        if (hexColor === '#000000')
          hexColor = '#ffffff';
        element[0].style.background = hexColor;
      });
      element.bind('click', function(event) {
        scope.priority.color = hexColor;
        scope.$apply();
      });
      element.bind('mouseout', function(event) {
        hexColor = '#ffffff';
        element[0].style.background = hexColor;
      })
    }
  }
});
