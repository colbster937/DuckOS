$(document).on('keydown', function (event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        $('#search-container').show();
        $('#search-bar').focus();
    }
});

$('#search-bar').on('blur', function () {
    $('#search-container').hide();
});
const searchApps = (query) => {
    const filteredApps = config.buttons.filter((app) => app.buttonText.toLowerCase().includes(query.toLowerCase()));
    const $searchResults = $('#search-results');
    $searchResults.empty();

    if (query.length > 0) {
        filteredApps.forEach((app) => {
            const $listItem = $('<li></li>');
            const $button = createButton(app);
            $listItem.append($button);
            $searchResults.append($listItem);
        });
    }
};

$('#search-bar').on('input', function () {
    const query = $(this).val();
    searchApps(query);
});

$('#search-bar').on('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = $(this).val();
        const matchingApp = config.buttons.find((app) => app.buttonText.toLowerCase() === query.toLowerCase());

        if (matchingApp) {
            const $existingWindow = $(`#appwindow-${matchingApp.id}`);
            if ($existingWindow.length) {
                $existingWindow.show();
            } else {
                createIFrameWindow(matchingApp);
            }
            $('#search-container').hide();
        }
    }
});
