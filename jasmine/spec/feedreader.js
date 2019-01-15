$(function() {

    /* Suite to test if all RSS feeds in the allFeeds array have
    a defined name and destination */
    describe('RSS Feeds', function() {
        // Checks if allFeeds array is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through all feeds and checks for defined URL
        it('have defined URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            })
        });

        // Tests if all feeds have a defined name
        it('have defined name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });
    });


    /* Test suite to check main menu functionality */
    describe('The menu', function() {
        var body = document.querySelector('body');

        // Tests DOM event to make sure main menu is hidden by default
        it('is hidden by default', function() {
            expect(body.classList.value).toBe('menu-hidden');
        });
        // Sets click triggers to simulate user interaction & checks functionality
        it ('shows and hides on menu icon click', function() {
            $('.menu-icon-link').trigger('click');
            expect(body.classList.value).not.toBe('menu-hidden');

            $('.menu-icon-link').trigger('click');
            expect(body.classList.value).toBe('menu-hidden');
        });
    });

    /* Test suite to examine initial entries */
    describe('Initial Entries', function() {
        // Load first feed in allFeeds array
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        // Checks for the presence of .entry elements, i.e. feed entries have been loaded
        it('are present', function(done) {
            expect(document.querySelectorAll('.entry').length).not.toBe(0);
            done();
        });
    });

    /* Test suite to make sure new feeds load upon selection via main menu */
    describe('New Feed Selection', function() {

        var entriesFeed1,
            entriesFeed2,
            feed = document.querySelector('.feed');

        // Load 2 different feeds and store their content
        beforeEach(function(done) {
            loadFeed(0, function() {
                entriesFeed1 = feed.innerText;
                loadFeed(1, function() {
                    entriesFeed2 = feed.innerText;
                });
                done();
            });
        });
        // Compare variables to assure reader successfully loads Feed2 entries
        it('gets loaded', function(done) {
            expect(entriesFeed1).not.toBe(entriesFeed2);
            done();
        });
    });
}());
