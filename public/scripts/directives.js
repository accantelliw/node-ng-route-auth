angular.module('ngMainApp')
    .directive('a', function() {
    /* 
     * This directive is to prevent angular 
     * page reload when user click on 
     * <a href="#" ...> HTML elements.
     * Otherwise, use <a href=# ...>
     */
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});