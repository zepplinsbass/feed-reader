/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has URL', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has name', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });
  });


  /* TODO: Write a new test suite named "The menu" */
  describe('The Menu', function() {
    const menuIcon = document.body.querySelector('.menu-icon-link');
    const slide = document.body.querySelector('.slide-menu');
    const style = window.getComputedStyle(slide);
    const transform = style.transform;
    let x = -192;

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden', function() {
      expect(transform).toBe(`matrix(1, 0, 0, 1, ${x}, 0)`);
    });

     /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
    it('is clicked and hidden', function() {
      menuIcon.click();
      expect(document.body.className).not.toBe('menu-hidden');

      menuIcon.click();
      expect(document.body.className).toBe('menu-hidden');
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    const feed = document.body.querySelector('.feed');
    const entry = feed.getElementsByClassName('entry');

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    //Load the feed and check the number of entries in the feed.
    beforeEach(function(done) {
      loadFeed(0, () => done());
    });

    it('loads an entry', function(done) {
      expect(entry.length).toBeGreaterThan(0);
      done();
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    const feed = document.body.querySelector('.feed');
    const entry = feed.getElementsByClassName('entry');
    let oldFeed = null

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    //Load the feed and save the HTML to the oldFeed variable.
    beforeEach(function(done) {
      loadFeed(0, () => {
        oldFeed = feed.innerHTML;
        loadFeed(1, () => done());
      });
    });

    //After the feed loads again, compare the current HTML with the HTML saved
    //in oldFeed.
    it('changes content', function(done) {
      const newFeed = feed.innerHTML;
      expect(oldFeed).not.toBe(newFeed);
      done();
    });
  });
}());
