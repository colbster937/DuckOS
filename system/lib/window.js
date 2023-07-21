$(document).ready(function() {
    let zIndexCounter = 1;

  
    const createIFrameWindow = (config) => {
        const {
            iframeSrc,
            defaultWidth,
            defaultHeight,
            windowTitle
        } = config;

        const $window = $(`
      <div class="appwindow appwindow-opening" id="appwindow-${config.id}" style="width: ${defaultWidth}%; height: ${defaultHeight}%; top: calc(50% - ${defaultHeight / 2}%); left: calc(50% - ${defaultWidth / 2}%);">
        <div class="toolbar">
          <h4 class="window-title">${windowTitle}</h4>
          <div>
            <button class="minimize-btn">-</button>
            <button class="maximize-btn">+</button>
            <button class="close-btn">x</button>
          </div>
        </div>
        <iframe src="${iframeSrc}" class="appframe" frameborder="0" style="width: 100%; height: calc(100% - 28px);"></iframe>
      </div>
    `);
        const $closeButton = $window.find('.close-btn');
        $closeButton.on('click', function() {
    $window.addClass('appwindow-closing');
    $window.on('animationend', function() {
      $window.remove();
    });
  });
      
        const $iframe = $window.find('iframe');
        $iframe.on('load', function() {
            const iframeWindow = this.contentWindow;
            const handleMouseDown = function(event) {
                event.stopPropagation();
                iframeWindow.removeEventListener('mousedown', handleMouseDown);
            };
            iframeWindow.addEventListener('mousedown', handleMouseDown);

            const $window = $(this).closest('.appwindow');
            $('body').on('mousedown', '.appwindow', function() {
                const $clickedWindow = $(this);
                $clickedWindow.css('z-index', zIndexCounter++);
                $('.appwindow').not($clickedWindow).each(function() {
                    const $window = $(this);
                    if (!$window.find('.iframe-overlay').length) {
                        $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
                    }
                });
                $clickedWindow.find('.iframe-overlay').remove();
            });


            this.style.border = 'none';
        });



        $('body').append($window);

        $window.draggable({
            handle: '.toolbar',
            scroll: false,
            drag: function(event, ui) {
                if (ui.position.top < 0) {
                    ui.position.top = 0;
                }
            },
            start: function(event, ui) {
                if ($window.hasClass('maximized')) {
                    return false;
                }
                $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
            },

            stop: function(event, ui) {
                const $window = $(this);
                $window.find('.iframe-overlay').remove();
            }
        });

        $window.resizable({
            handles: 'all',
            minWidth: 200,
            minHeight: 100,
            start: function() {
                if ($window.hasClass('maximized')) {
                    return false;
                }
                $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
            },
            stop: function() {
                $window.find('.iframe-overlay').remove();
            }
        });
      




        $window.resizable({
            handles: 'all',
            start: function() {
                $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
            },
            stop: function() {
                $window.find('.iframe-overlay').remove();
            }
        });
        $window.css('z-index', zIndexCounter++);
      
        return $window;
    };


    const createButton = (buttonConfig) => {
        const buttonText = buttonConfig.imgSrc ? '' : buttonConfig.buttonText;
        const $button = $(`<button id="${buttonConfig.id}" class="buttondefault ${buttonConfig.id}">
                    ${buttonConfig.imgSrc ? `<img src="${buttonConfig.imgSrc}" alt="" style="width: 20px; height: 20px;">` : ''}
                    ${buttonText}
                  </button>`);

        if (buttonConfig.onStart) {
            createIFrameWindow(buttonConfig); 
        }

        $button.on('click', function() {
            const $existingWindow = $(`#appwindow-${buttonConfig.id}`);
    if ($existingWindow.length) {
        $existingWindow.show();
        $existingWindow.css('z-index', zIndexCounter++);
    } else {
        createIFrameWindow(buttonConfig);
    }
        });
        return $button;
    };




    config.buttons.forEach(buttonConfig => {
  const $button = createButton(buttonConfig);
  $('#apps').append($button);

  const $menuapps = createButton(buttonConfig);
  $('#menuapps').append($menuapps); 
      
});

    $('body').on('click', '.minimize-btn', function() {
        $(this).closest('.appwindow').hide();
    });

    $('body').on('click', '.maximize-btn', function() {
        const $window = $(this).closest('.appwindow');
        const isMaximized = $window.hasClass('maximized');

        if (isMaximized) {
            $window.removeClass('maximized');
            $window.css({
                top: $window.data('original-top'),
                left: $window.data('original-left'),
                width: $window.data('original-width'),
                height: $window.data('original-height')
            });
            $window.css('z-index', zIndexCounter++);
        } else {
            const wasPreviouslyMaximized = $window.data('original-top') !== undefined && $window.data('original-left') !== undefined;

            let maxZIndex = Math.max.apply(
                null,
                $.map($('body > *'), function(el) {
                    if ($(el).css('position') !== 'static') {
                        return parseInt($(el).css('z-index')) || 1;
                    }
                    return 1;
                })
            );

            $('.appwindow').not($window).css('z-index', zIndexCounter);
            $window.addClass('maximized');
            if (!wasPreviouslyMaximized) {
                $window.data({
                    'original-top': $window.css('top'),
                    'original-left': $window.css('left'),
                    'original-width': $window.css('width'),
                    'original-height': $window.css('height')
                });
            }
            $window.css({
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: maxZIndex + 1
            });
            zIndexCounter = maxZIndex + 2;
        }

        $window.css('z-index', zIndexCounter++);
    });




    $('body').on('mousedown', '.appwindow', function() {
        const $clickedWindow = $(this);

        if (!$clickedWindow.hasClass('maximized')) {
            $clickedWindow.css('z-index', zIndexCounter++);
            $('.appwindow').not($clickedWindow).each(function() {
                const $window = $(this);
                if (!$window.find('.iframe-overlay').length) {
                    $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
                }
            });
        }

        $clickedWindow.find('.iframe-overlay').remove();
    });

    $('body').on('dragstart', '.appwindow', function() {
        const $window = $(this);
        $window.append('<div class="iframe-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 28px); background-color: transparent;"></div>');
    });

    $('body').on('dragstop', '.appwindow', function() {
        const $window = $(this);
        $window.find('.iframe-overlay').remove();
    });
});
$('#multiplewindows').on('change', function() {
    const allowMultipleWindows = $(this).is(':checked');
    config.buttons.forEach(buttonConfig => {
      const $existingWindows = $(`.appwindow-${buttonConfig.id}`);
      if (allowMultipleWindows) {
        // Enable opening multiple windows
        $existingWindows.removeClass('appwindow-closing');
      } else {
        // Disable opening multiple windows
        $existingWindows.addClass('appwindow-closing');
        $existingWindows.on('animationend', function() {
          $(this).remove();
        });
      }
    });
  });