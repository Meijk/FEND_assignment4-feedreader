$(function() {

    /* Suite to test if all RSS feeds in the allFeeds array have
    a defined name and destination */
    describe('RSS Feeds', () => {
        // Checks if allFeeds array is defined and not empty
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through all feeds and checks for defined URL
        it('have defined URL', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            })
        });

        // Tests if all feeds have a defined name
        it('have defined name', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });
    });


    /* Test suite to check main menu functionality */
    describe('The menu', () => {
        var body = document.querySelector('body');

        // Tests DOM event to make sure main menu is hidden by default
        it('is hidden by default', () => {
            expect(body.classList).toContain('menu-hidden');
        });
        // Sets click triggers to simulate user interaction & checks functionality
        it ('shows and hides on menu icon click', () => {
            $('.menu-icon-link').trigger('click');
            expect(body.classList).not.toContain('menu-hidden');

            $('.menu-icon-link').trigger('click');
            expect(body.classList).toContain('menu-hidden');
        });
    });

    /* Test suite to examine initial entries */
    describe('Initial Entries', () => {
        // Load first feed in allFeeds array
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        // Checks for the presence of .entry elements, i.e. feed entries have been loaded
        it('are present', (done) => {
            expect(document.querySelectorAll('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* Test suite to make sure new feeds load upon selection via main menu */
    describe('New Feed Selection', () => {

        var entriesFeed1,
            entriesFeed2,
            feed = document.querySelector('.feed');

        // Load 2 different feeds and store their content
        beforeEach((done) => {
            loadFeed(0, () => {
                entriesFeed1 = feed.innerText;
                loadFeed(1, () => {
                    entriesFeed2 = feed.innerText;
                    done();
                });
            });
        });
        // Compare variables to assure reader successfully loads Feed2 entries
        it('gets loaded', (done) => {
            expect(entriesFeed1).not.toBe(entriesFeed2);
            done();
        });
    });
}());
