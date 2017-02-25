define([
  'angular',
  'donation/donation-services'
], function(angular) {
  'use strict';
  angular.module('fredra.donation', ['ui.router', 'donation-services']);
});
