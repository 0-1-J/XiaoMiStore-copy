angular.module('breadcrumbsMd', ["ui.router"])
    .directive('breadcrumbs', function factory($rootScope, $state, $stateParams, $interpolate) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<ol class="breadcrumb">' +
            '<li ng-repeat="step in steps" ng-class="{active:$last}" ng-switch="$last">' +
            '<a ng-switch-when="false" ui-sref="{{step.link}}">{{step.label}}</a>' +
            '<span ng-switch-when="true">{{step.label}}</span>' +
            '</li></ol>',
            scope: {},
            link: function (scope) {
                scope.$on('$stateChangeSuccess',
                    function () {
                        scope.steps = updateBreadcrumbs();
                    });
            }

        };
        function updateBreadcrumbs() {
            var breadcrumbs = [];
            for (var curState = $state.$current.name; curState; curState = breadcrumbParentState(curState))
            {
                generateBreadcrumbs(breadcrumbs, curState);
            }
            return breadcrumbs.reverse();
        }

        function generateBreadcrumbs(chain, stateName) {
            var skip = false;
            var displayName, breadcrumbLabel;
            //���״̬�Ѿ�����״̬���У�ֱ�ӷ���
            for (var i = 0; i < chain.length; i++) {
                if (chain[i].name === stateName) {
                    return;
                }
            }
            var state = $state.get(stateName);
            if (state.ncyBreadcrumb && state.ncyBreadcrumb.label)
            {
                breadcrumbLabel = state.ncyBreadcrumb.label;
                displayName = $interpolate(breadcrumbLabel)($rootScope);
            } else {
                displayName = state.name;
            }
            if (state.ncyBreadcrumb) {
                if (state.ncyBreadcrumb.skip) {
                    skip = true;
                }
            }
            if (!state.abstract && !skip) {
                //�����ǰ״̬���ǳ���ģ�����skipΪfalse
                if (state.ncyBreadcrumb && state.ncyBreadcrumb.param) {
                    chain.push({
                        link: stateName,
                        label: $stateParams[state.ncyBreadcrumb.param],
                        abstract: false
                    });
                }
                chain.push({
                    link: stateName,
                    label: displayName,
                    abstract: false
                });
            }
        }
        function breadcrumbParentState(stateName) {
            var curState = $state.get(stateName);
            if (curState.abstract)return;
            //���״̬���������м���󣬲���������parent����
            if (curState.ncyBreadcrumb && curState.ncyBreadcrumb.parent) {
                // Handle the "parent" property of the breadcrumb, override the parent/child relation of the state
                var isFunction = typeof curState.ncyBreadcrumb.parent === 'function';
                //�жϸ�״̬�����������Ƿ��Ǻ���
                var parentStateRef = isFunction ? curState.ncyBreadcrumb.parent($rootScope) : curState.ncyBreadcrumb.parent;
                if (parentStateRef) {
                    return parentStateRef;
                }
            }
            //���ص�ǰ״̬�ĸ�״̬
            var parent = curState.parent || (/^(.+)\.[^.]+$/.exec(curState.name) || [])[1];
            var isObjectParent = typeof parent === "object";
            return isObjectParent ? parent.name : parent;
        }
    })

