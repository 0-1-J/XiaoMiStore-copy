/**
 * Created by Administrator on 16-7-30.
 */

///*����3��ָ����ʹ��ng-includeָ����Խ����ͬģ������Ȼ����һ�����domԪ��*/
angular.module("xmIncludeMd",[])
    .directive('xmInclude', function factory() {
        var directiveDefinitionObject = {
            restrict: "AE",
            replace: "true",
            scope: {
                //���Ը�����Ҫ�����ⲿ���������,��Ϊ�ڹ�����ģ���п��ܴ��ڸ���DOMԪ�ز�ͬ/**/
                //��ʱ������ʹ��ָ��ĵط������boolֵ���������boolֵ�ж�ģ���в����DOMԪ���Ƿ���Ҫ��Ⱦ/*/
                title: "@?",
                src: "@",
                user:"="
            },
            template: "<div ng-include='src'></div>",
            compile: function compile(tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    //���ݲ�ͬ��Ҫ��������link�����д����ص�ģ��/**/
                   // scope.src = attrs.src;
                   // scope.getContentUrl = function () {
                   //     return "view/common/" + attr.src + ".html"
                   // }
                }
            }
        };
        return directiveDefinitionObject;
    })