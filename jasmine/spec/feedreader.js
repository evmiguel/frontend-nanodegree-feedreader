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

        /* Ensure that each feed in the allFeeds object
         * has a URL defined and that the URL is not empty.
         */
         it('each feed has a URL defined', function () {
            for (let feed of allFeeds) {
                expect(feed.hasOwnProperty('url')).toBe(true)
                expect(feed.url).toBeDefined()
            }
         })


        /* Ensure that each feed in the allFeeds object
         * has a name defined and that the name is not empty.
         */
         it('each feed has a name defined', function(){
            for (let feed of allFeeds) {
                expect(feed.hasOwnProperty('name')).toBe(true)
                expect(feed.name).not.toBe('')
                expect(feed.name).toBeDefined()
            }
         })
    });


    /* This test suite is all about the menu */
    describe('The menu', function(){

        /*
         * Ensure the menu element is hidden by default.
         */
         it('is hidden by default', function(){
            expect(document.body.classList.contains('menu-hidden')).toBe(true)
         })

         /*
          * Ensures the menu changes visibility when the menu icon is clicked.
          */
          it('is visible after the menu icon is clicked', function(){
            // Simulate a click event on the menu icon using jasmine-jquery library
            // Click to display the menu
            spyOnEvent($('.menu-icon-link'), 'click')
            $('.menu-icon-link').click()
            expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'))
            expect(document.body.classList.contains('menu-hidden')).toBe(false)

            // Return the menu back to hidden
            $('.menu-icon-link').click()
            expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'))
            expect(document.body.classList.contains('menu-hidden')).toBe(true)
          })


    })


    /* This test suite is all about the initial entries */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            // Get the first feed
            loadFeed(0, function() {
                done()
            })
        })

        /*
         * Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('has at least one entry element in a feed', function(done) {
            let feedItems = $('.feed').children()
            let firstEntry = feedItems[0].getElementsByClassName('entry')[0]
            expect(feedItems.length > 0).toBe(true)
            expect(firstEntry).toBeDefined()
            done()
         })
    })

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
