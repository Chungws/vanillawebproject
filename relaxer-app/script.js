// 5, 3, 5 Breathing
// function changeText() {
//   const pTag = document.querySelector('main p');
//   pTag.textContent = 'Breathe In!';
//   const hold = setTimeout(() => {
//     pTag.textContent = 'Hold';
//     const out = setTimeout(() => {
//       pTag.textContent = 'Breathe Out!';
//       clearTimeout(out);
//     }, 3000);
//     clearTimeout(hold);
//   }, 5000);
// }
// changeText();
// setInterval(changeText, 13000);

let time = 0;
const ChangeText2 = () => {
  time %= 13000;
  const pTag = document.querySelector('main p');
  if (time === 0) {
    pTag.textContent = 'Breathe In!';
  } else if (time === 5000) {
    pTag.textContent = 'Hold';
  } else if (time === 8000) {
    pTag.textContent = 'Breathe Out!';
  }
  time += 1000;
};
ChangeText2();
setInterval(ChangeText2, 1000);

// function changeText3() {
//   const pTag = document.querySelector('main p');
//   let time = 0;
//   let mode = 'in';

//   function updateText() {
//     setTimeout(() => {
//       switch (mode) {
//         case 'in':
//           pTag.textContent = 'Breathe In!';
//           time = 5000;
//           mode = 'hold';
//           break;
//         case 'hold':
//           pTag.textContent = 'Hold';
//           time = 3000;
//           mode = 'out';
//           break;
//         case 'out':
//           pTag.textContent = 'Breathe Out!';
//           time = 5000;
//           mode = 'in';
//           break;
//         default:
//       }
//       requestAnimationFrame(updateText);
//     }, time);
//   }
//   requestAnimationFrame(updateText);
// }
// changeText3();
