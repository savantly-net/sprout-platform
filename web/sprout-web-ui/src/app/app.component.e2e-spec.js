describe('App', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual("Sprout");
  });

  it('should have <header>', function () {
    expect(element(by.css('my-app header')).isPresent()).toEqual(true);
  });

  it('should have <main>', function () {
    expect(element(by.css('my-app main')).isPresent()).toEqual(true);
  });

  it('should have a main title', function () {
    expect(element(by.css('main h1')).getText()).toEqual('Sprout Application');
  });

  it('should have <footer>', function () {
    expect(element(by.css('my-app footer')).getText()).toEqual("http://savantly.net");
  });
 
});
