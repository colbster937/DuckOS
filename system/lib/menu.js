var altKeyPressed = false;

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Alt' && !altKeyPressed) {
        var appsmenu = document.getElementById('appsmenu');
        appsmenu.style.display = 'block';
        altKeyPressed = true;
      } else if (event.key === 'Alt' && altKeyPressed) {
        var appsmenu = document.getElementById('appsmenu');
        appsmenu.style.display = 'none';
        altKeyPressed = false;
      }
    });