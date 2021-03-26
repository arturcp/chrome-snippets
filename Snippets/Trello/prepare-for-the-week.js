
/*
  At the end of each week, I need to clean up the board on Trello to make room
  for new tasks, and this is a very repetitive task.

  Thinking on that, I created this snippet to automate this process for me. It
  accomplishes two things:

  * In the list `Recurrent`, uncheck all the checked items
  * Archive all cards in the `Done` list.
*/
function findList(listName) {
  const xpath = "//h2[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '" + listName.toLowerCase() + "')]";

  return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null ).iterateNext().parentElement.parentElement;
};

function resetRecurrentList() {
  console.log('---- Cleaning checklists from the Recurrent list ----')
  const uncheckAll = () => {
      const overlay = document.querySelector('.window');
      const checkboxes = overlay.querySelectorAll('.checklist-item-state-complete .checklist-item-checkbox');

      checkboxes.forEach(function(checkbox) {
         checkbox.click();
      });

      const closeButton = overlay.querySelector('.js-close-window');
      if (closeButton) {
          closeButton.click();
      }
  };

  const recurrentList = findList('Recurrent');
  const listCards = recurrentList.querySelectorAll('.list-card');

  listCards.forEach(function(element, index, array) {
      setTimeout(function() {
          const listTitle = element.querySelector('.list-card-title.js-card-name');
          console.log('Reseting checkboxes from', listTitle.innerText);
          element.click();

          setTimeout(function() {
              uncheckAll();
          }, 1000);
      },

      (1500 * index) + 1200);
  });
};

function clearDoneList() {
  console.log('---- Archiving cards from the Done list ----')
  const doneList = findList('Done');
  const menu = doneList.querySelector('.list-header-extras-menu');
  menu.click();
  setTimeout(function() {
      const popover = document.querySelector('.pop-over.is-shown');
      const archiveAllLink = popover.querySelector('.js-archive-cards');
      archiveAllLink.click();

      setTimeout(function() {
          const confirmationButton = popover.querySelector('.js-confirm');
          confirmationButton.click();
      }, 800);
  }, 800);

}

function resetWeek() {
  const url = window.location.hostname;
  if (url === 'trello.com') {
    clearDoneList();

    setTimeout(function() {
        resetRecurrentList();
    }, 2000);
  } else {
    alert('You are not on trello');
  }
}

resetWeek();
