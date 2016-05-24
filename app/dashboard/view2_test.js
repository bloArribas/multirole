'use strict';

describe('myApp.dashboard module', function() {

  beforeEach(module('myApp.dashboardAdmin'));

  describe('dashboard controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('DashboardCtrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});