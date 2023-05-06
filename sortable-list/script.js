const BILLIONARES_INDEX = [
  'Bernard Arnault',
  'Elon Musk',
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Larry Ellison',
  'Steve Ballmer',
  'Larry Page',
  'Francoise Bettencourt Meyers',
  'Sergey Brin',
];

const initializeList = () => {
  const list = document.querySelector('ul');
  let dragged;
  let entered;

  const addDragEventListener = (li) => {
    const draggable = li.querySelector('.draggable');

    draggable.addEventListener('dragstart', (e) => {
      dragged = e.target;
      e.target.classList.add('dragging');
    });

    draggable.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    li.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);

    li.addEventListener('dragenter', (e) => {
      if (entered === e.target.closest('li')) {
        return;
      }
      entered = e.target.closest('li');
      e.target.closest('li').querySelector('.draggable').classList.add('dragover');
    });

    li.addEventListener('dragleave', (e) => {
      if (entered === e.target.closest('li')) {
        return;
      }
      e.target.closest('li').querySelector('.draggable').classList.remove('dragover');
    });

    li.addEventListener('drop', (e) => {
      e.preventDefault();
      const droppable = e.target.closest('li').querySelector('div');

      droppable.classList.remove('dragover');

      const beforeParent = dragged.parentNode;
      const afterParent = droppable.parentNode;

      beforeParent.removeChild(dragged);
      afterParent.appendChild(dragged);
      afterParent.removeChild(droppable);
      beforeParent.appendChild(droppable);
    });
  };

  const createListEl = (name, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
  <span class="container">${idx + 1}</span>
  <div class="draggable" draggable="true">
    <p class="names">${name}</p>
    <i class="fa-solid fa-grip-lines"></i>
  </div>`;
    return li;
  };

  const init = () => {
    // Prevent replacing the original
    [...BILLIONARES_INDEX]
      .sort(() => Math.random() - 0.5)
      .forEach((name, idx) => {
        const li = createListEl(name, idx);
        addDragEventListener(li);
        list.appendChild(li);
      });
  };

  init();
};

const checkCorrectness = () => {
  Array.from(document.querySelectorAll('li'))
    .forEach((el, idx) => {
      const text = el.querySelector('div > p').textContent;
      if (text === BILLIONARES_INDEX[idx]) {
        el.classList.remove('wrong');
        el.classList.add('correct');
      } else {
        el.classList.remove('correct');
        el.classList.add('wrong');
      }
    });
};

window.addEventListener('load', initializeList);
document.querySelector('button').addEventListener('click', checkCorrectness);
