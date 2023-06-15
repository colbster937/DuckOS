window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'notification') {
    const { title, message, waitTime, link, showDelay } = event.data;
    showNotification(title, message, waitTime, link, showDelay);
  }
});

function showNotification(title, message, waitTime, link, showDelay) {
  const timestamp = new Date().toLocaleTimeString();

  const notification = document.createElement('div');
  notification.classList.add('notification');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  const titleElement = document.createElement('div');
  titleElement.classList.add('title');
  titleElement.textContent = title;

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('timestamp');
  timestampElement.textContent = timestamp;

  closeButton.addEventListener('click', () => {
    notification.classList.add('hide');

    setTimeout(() => {
      notification.remove();
    }, 500);
  });

  notification.appendChild(closeButton);
  notification.appendChild(titleElement);
  notification.appendChild(messageElement);
  notification.appendChild(timestampElement);
  const container = document.getElementById('notification-container');
  container.appendChild(notification);
  let timeoutId;
  container.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
  });
  container.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
      notification.classList.add('hide');

      setTimeout(() => {
        notification.remove();
      }, 500);
    }, waitTime);
  });

  setTimeout(() => {
    setTimeout(() => {
      notification.classList.add('show');
    }, showDelay);
  }, 100);

  // Set the initial timeout
  timeoutId = setTimeout(() => {
    notification.classList.add('hide');

    setTimeout(() => {
      notification.remove();
    }, 500);
  }, waitTime);

  if (link) {
    notification.addEventListener('click', () => {
      window.location.href = link;
    });
  }
}

showNotification('Welcome to DuckOS!', 'Only the best web operating system ever. Hope you have a great time!', 2500);
