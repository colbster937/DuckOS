document.addEventListener('DOMContentLoaded', function() {
    const statscenter = document.querySelector('#statscenter');
    const statscenterBtn = document.querySelector('#statscenterbtn');

    statscenterBtn.addEventListener('click', function() {
        statscenter.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        const isClickInside = statscenter.contains(event.target) || statscenterBtn.contains(event.target);
        if (!isClickInside && statscenter.classList.contains('open')) {
            statscenter.classList.remove('open');
        }
    });

    statscenter.addEventListener('mouseleave', function() {
        if (statscenter.classList.contains('open')) {
            statscenter.classList.remove('open');
        }
    });
});