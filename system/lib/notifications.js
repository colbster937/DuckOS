window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'notification') {
        const { title, message, delay } = event.data;
        showNotification(title, message, delay);
      }
    });
function showNotification(title, message, delay) {
      const timestamp = new Date().toLocaleTimeString();

      const notification = document.createElement('div');
      notification.classList.add('notification');

      const closeButton = document.createElement('span');
      closeButton.classList.add('close-button');
      closeButton.textContent = '✖';

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

      setTimeout(() => {
        notification.classList.add('show');
      }, 100);

      setTimeout(() => {
        notification.classList.add('hide');

        setTimeout(() => {
          notification.remove();
        }, 500);
      }, delay);
    }
    showNotification('Welcome to DuckOS!', 'Only the best web operating system ever. Hope you have a great time!', 5000);
