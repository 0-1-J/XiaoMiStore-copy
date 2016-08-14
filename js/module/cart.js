/**
 * Created by Administrator on 16-6-13.
 */

angular.module('cart', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("cart", {
                    url: '/cart',
                    templateUrl: 'view/cart.html',
                    controller:function($scope,cartService){
                        $scope.cart = cartService.myCart;
                    },
                    ncyBreadcrumb:{
                        label:"�ҵĹ��ﳵ",
                        parent:"home.main"
                    }
                })
        }
    ])