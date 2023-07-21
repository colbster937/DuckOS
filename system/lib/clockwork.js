    (function() {
      var clockwork = document.querySelector('.clockwork');
      var isDragging = false;
      var offset = { x: 0, y: 0 };

      clockwork.addEventListener('mousedown', function(event) {
        isDragging = true;
        offset.x = event.clientX - clockwork.offsetLeft;
        offset.y = event.clientY - clockwork.offsetTop;
      });

      document.addEventListener('mouseup', function() {
        isDragging = false;
      });

      document.addEventListener('mousemove', function(event) {
        if (isDragging) {
          clockwork.style.left = event.clientX - offset.x + 'px';
          clockwork.style.top = event.clientY - offset.y + 'px';
        }
      });

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var date = new Date();
      var day = date.getDay();
      var formattedDate = date.toDateString();

      document.querySelector('.day').textContent = days[day];
      document.querySelector('.date').textContent = formattedDate;

      var centerButton = document.querySelector('.centerclockworkbtn');
      centerButton.addEventListener('click', function() {
        clockwork.style.top = '20%';
        clockwork.style.left = '50%';
      });

      var slider = document.querySelector('.slider');
      slider.addEventListener('input', function() {
        var value = this.value;
        clockwork.style.transform = 'translate(-50%, -50%) scale(' + (value / 100) + ')';
      });

      var colorPicker = document.querySelector('#color-picker');
      colorPicker.addEventListener('input', function() {
        var colorValue = this.value;
        var rgbValues = colorValue.split(',').map(function(item) {
          return parseInt(item.trim());
        });

        var red = rgbValues[0];
        var green = rgbValues[1];
        var blue = rgbValues[2];

        var h1Element = document.querySelector('.clockwork h1.day');
        var pElement = document.querySelector('.clockwork p.date');

        h1Element.style.color = 'rgb(' + red + ',' + green + ',' + blue + ')';
        pElement.style.color = 'rgb(' + red + ',' + green + ',' + blue + ')';
      });
    })();
    function toggleClockwork() {
      var clockworkDiv = document.querySelector(".clockwork");
      if (clockworkDiv.style.display === "none") {
        clockworkDiv.style.display = "block";
      } else {
        clockworkDiv.style.display = "none";
      }
    }
      document.addEventListener("keydown", function(event) {
  if (event.key === "`") {
    const redirectURL = document.getElementById("panicInput").value;
    const finalRedirectURL = redirectURL ? redirectURL : "https://bing.com";
    window.location.href = finalRedirectURL;
  }
});
