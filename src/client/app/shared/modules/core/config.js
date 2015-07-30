(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[HC-Panel Error] ', //Configure the exceptionHandler decorator
        appTitle: 'HeroCraft Admin Panel',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    function configure ($logProvider, $routeProvider, routehelperConfigProvider,
                        $locationProvider/*, exceptionHandlerProvider*/, $httpProvider, toastr) {

        $locationProvider.html5Mode(true);
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'HeroCraft Admin Panel: ';
        //var resolveAlways = { /* @ngInject */
        //    ready: function(dataservice) {
        //        return dataservice.ready();
        //    }
        // ready: ['dataservice', function (dataservice) {
        //    return dataservice.ready();
        // }]
        //};
        //routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        //  exceptionHandlerProvider.configure(config.appErrorPrefix);

        //
        $httpProvider.interceptors.push(function($q) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 0) {
                        toastr.error('Сервер не доступен.');
                        //window.location = "noresponse.html";
                        //return;
                    }
                    return $q.reject(rejection);
                }
            };
        });

    }
})();
