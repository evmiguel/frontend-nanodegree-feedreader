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
                expect(feed.url).not.toBe('')
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
            let feedItems = $('.feed .entry')
            // check for more than one item
            expect(feedItems.length > 0).toBe(true)

            // check that the first item is defined
            expect(feedItems[0]).toBeDefined()
            done()
         })
    })

    /* This test suite is all about new feed selection */
    describe('New Feed Selection', function() {
        /*
         * Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let firstFeed, secondFeed

         // Compare initial feed load to another feed lopad
         beforeEach((done)=> {
            // Load the initial page feed
            loadFeed(0, function() {
                firstFeed = $('.feed').children()
                // Simulate loading a different feed
                loadFeed(1, function() {
                    secondFeed = $('.feed').children()
                    done()
                });
            });
        });

        afterEach(() => {
            // Return page to original feed
            loadFeed(0)
        })

         it('changes content when a new feed is loaded', function(done){
            // make sure that the feeds produce different content by comparing
            // each entry's titles (via inner HTML)
            for (let i=0; i<firstFeed.length; i++){
                expect(firstFeed[i].innerHTML === secondFeed[i].innerHTML).toBe(false)
            }

            done()
         })
    })
}());
