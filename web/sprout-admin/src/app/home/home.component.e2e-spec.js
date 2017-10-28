describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <div>', function () {
    var home = element(by.css('app-root app-home'));
    expect(home.isPresent()).toEqual(true);
  });

});
