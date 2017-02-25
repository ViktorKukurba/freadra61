define([
  'angular',
  'home/home'
], function(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  return angular.module('fredra', [
    'fredra.home',
    'ui.router',
    'ui.bootstrap',
    'scrollspy',
    'pascalprecht.translate'
  ]);
});
