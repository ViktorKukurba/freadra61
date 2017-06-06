define(['angular'], function(angular) {
    angular.module('fbStream', []).factory('fbStreamInitializer', function() {
        return {
            init: function() {
                FB.ui({
                    display: 'popup',
                    method: 'live_broadcast',
                    phase: 'create',
                }, function (response) {
                    if (!response.id) {
                        alert('dialog canceled');
                        return;
                    }
                    alert('stream url:' + response.secure_stream_url);
                    FB.ui({
                        display: 'popup',
                        method: 'live_broadcast',
                        phase: 'publish',
                        broadcast_data: response,
                    }, function (response) {
                        alert("video status: \n" + response.status);
                    });
                });
            }
        };
    });
});