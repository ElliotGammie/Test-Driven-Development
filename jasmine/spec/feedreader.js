
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


         //  a test similar to the first to check if each object has a url which is defined in the app.js file
         it('URLs are included', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


         //  a test similar to the first to check if each object has a name which is defined in the app.js file
         it('name is shown', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


      // Test that ensures the menu elemlement is
      // hidden by default. You'll have to analyze the HTML and
      // the CSS to determine how we're performing the hiding/showing of the menu element
    describe('The menu', function() {


         // first I query select the body from the DOM as this menu is listed within the HTMl there,
        // I then check if it has the menu hidden with reference to the css
         it('hamburger list hidden', function () {
           expect(document.body.classList).toContain('menu-hidden');
         });

          // test that ensures the menu changes
           // visibility when the menu icon is clicked. This test
           // should have two expectations: does the menu display when
           // clicked and does it hide when clicked again.


          // I then toggle the menu twice to check if the menu is in fact toggling the hidden status once clicked correctly
          it('menu click function', function (){
            const bodyCheck = document.querySelector('body');
            const iconCheck = document.querySelector('.menu-icon-link');

            iconCheck.click();
            expect(bodyCheck.classList.contains('menu-hidden')).toBe(false);
            // toggle on/off check
            iconCheck.click();
            expect(bodyCheck.classList.contains('menu-hidden')).toBe(true);
          });
        });


        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
        */
         // I am checking here if the function loadFeed contains at least one entry
    describe('Intial Entries', function() {
         beforeEach(function(done) {
           loadFeed(0, function(){
             done ();
           });
         });

         // We then create the second part of the test to check if the html has at least one feed with an entry
         it('loadFeed Test', function(){
           const checkFeed = document.querySelectorAll('.feed .entry').length;
           expect(checkFeed).toBeGreaterThan(0);
         });
    });

    /* test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

  describe('New Feed Selection', function() {

         // Store the feeds in two variables for further use
         var firstCall;
         var secondCall;

         //  we are using done to handle the asynchronous functions within beforeEach. We load both feeds with thw two calls within the statement below.
      beforeEach(function(done){
        loadFeed(0, function(){
          firstCall = $('.feed').html();
          loadFeed(1,function(){
            done();
          });
        });
      });

// In the test below I test if the first call is defined and loaded then test this against new feed that is loaded.
// Once loaded I test whether or not the second and first feed match. Indicating that they should not.
      it('content changes when new feed is loaded', function(){
        expect(firstCall).toBeDefined();
        expect(secondCall).not.toBeDefined();
        secondCall = $('.feed').html();
        expect(secondCall).toBeDefined();
        expect(firstCall).not.toBe(secondCall);
      });
  });
}());
