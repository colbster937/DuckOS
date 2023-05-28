$(document).keydown(function(e) {
    if (e.altKey) {
        // Alt key was pressed.
        if ($('#searchbar').length) {
            // If the searchbar already exists, give it focus.
            $('#searchbar').focus();
        } else {
            // If the searchbar doesn't exist, create it.
            const $searchbar = $(`
                <input type="text" id="searchbar" placeholder="Search for an app..." style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            `);

            $searchbar.on('keydown', function(e) {
                if (e.key === 'Enter') {
                    // When Enter is pressed, find the first button whose text includes the search input and click it.
                    const searchText = $(this).val().toLowerCase();
                    const $matchingButton = $('.buttondefault').filter(function() {
                        return $(this).text().toLowerCase().includes(searchText);
                    }).first();
                    $matchingButton.click();
                }
            });

            $('body').append($searchbar);
            $searchbar.focus();
        }
    }
});

$(document).click(function(e) {
    if ($(e.target).closest('#searchbar').length === 0) {
        // If you click outside the searchbar, remove it.
        $('#searchbar').remove();
    }
});
