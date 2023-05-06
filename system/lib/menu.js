$(document).ready(function () {
  const appMenu = $("#appmenu");
  const appList = $("<ul></ul>");

  // Create app menu items
  config.buttons.forEach((buttonConfig) => {
    const menuItem = $(`<li class="appmenubtn">${buttonConfig.windowTitle}</li>`);
    menuItem.on("click", function () {
      $("#" + buttonConfig.id).trigger("click");
      appMenu.hide();
    });
    appList.append(menuItem);
  });

  appMenu.append(appList);

  // Toggle app menu with Alt key
  $(document).on("keydown", function (e) {
    if (e.key === "Alt") {
      appMenu.toggle();
    }
  });

  // Hide app menu when clicked outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#appmenu").length) {
      appMenu.hide();
    }
  });
});
