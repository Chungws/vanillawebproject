import { Ball, Bar, Blocks, Text } from './Shapes.js'; // eslint-disable-line

document.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
  const rules = document.querySelector('div.rules');
  rules.classList.toggle('open');
}));

function startGame() {
  const canvas = document.getElementById('game');

  const ctx = canvas.getContext('2d');
  const color = '#0095dd';

  const text = new Text(ctx, 710, 30, color, 'Score');
  const ball = new Ball(ctx, 400, 550, color, 10);
  const blocks = new Blocks(ctx, color);
  const bar = new Bar(ctx, 400 - 100 / 2, 550, color, 100, 10);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      bar.left();
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      bar.right();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
      bar.stop();
    }
  });

  function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    text.draw(blocks.countEliminated());

    bar.move(canvas.width);
    bar.draw();

    ball.move();
    ball.draw();
    ball.checkBlockCollision(bar);
    ball.checkBoundaryCollision(canvas.height, canvas.width);

    blocks.draw();
    blocks.checkCollision((block) => ball.checkBlockCollision(block));
    if (ball.checkDefeat(canvas.height)) {
      blocks.reset();
    }
    if (blocks.getVisibleBlocks().length === 0) {
      const timer = setTimeout(() => {
        blocks.reset();
        clearTimeout(timer);
      }, 1000);
    }

    window.requestAnimationFrame(game);
  }

  game();
}

window.addEventListener('load', startGame);
