/* eslint-disable max-len */
class Shape {
  constructor(ctx, x, y, color) {
    if (this.constructor === Shape) {
      throw new Error("Can't instantiate abstract class!");
    }
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    // eslint-disable-next-line
    console.log('abstract shape : ', this.x, this.y);
  }

  erase() {
    // eslint-disable-next-line
    console.log('abstract shape : ', this.x, this.y);
  }
}

class Ball extends Shape {
  constructor(ctx, x, y, color, radius) {
    super(ctx, x, y, color);
    this.radius = radius;
    this.vx = 5;
    this.vy = -5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  erase() {
    const x = this.x - this.radius;
    const y = this.y - this.radius;
    this.ctx.clearRect(x, y, this.radius * 2, this.radius * 2);
  }

  checkBoundaryCollision(height, width) {
    if (this.y + this.vy + this.radius > height || this.y + this.vy - this.radius < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx + this.radius > width || this.x + this.vx - this.radius < 0) {
      this.vx = -this.vx;
    }
    return true;
  }

  checkDefeat(height) {
    if (this.y + this.radius >= height) {
      return true;
    }
    return false;
  }

  checkBlockCollision({
    x, y, width, height,
  }) {
    const left = this.x + this.vx - this.radius;
    const right = this.x + this.vx + this.radius;
    const top = this.y + this.vy - this.radius;
    const bottom = this.y + this.vy + this.radius;

    const blockLeft = x;
    const blockRight = x + width;
    const blockTop = y;
    const blockBottom = y + height;

    const isLeftTopInBlock = (blockLeft < left && left < blockRight && blockTop < top && top < blockBottom);
    const isLeftBottomInBlock = (blockLeft < left && left < blockRight && blockTop < bottom && bottom < blockBottom);
    const isRightTopInBlock = (blockLeft < right && right < blockRight && blockTop < top && top < blockBottom);
    const isRightBottomInBlock = (blockLeft < right && right < blockRight && blockTop < bottom && bottom < blockBottom);

    if ((isLeftTopInBlock && isRightTopInBlock) || (isLeftBottomInBlock && isRightBottomInBlock)) {
      this.vy = -this.vy;
      return true;
    } if ((isLeftTopInBlock && isLeftBottomInBlock) || (isRightTopInBlock && isRightBottomInBlock)) {
      this.vx = -this.vx;
      return true;
    }

    if (isLeftTopInBlock) {
      if (this.vx < 0) {
        this.vx = -this.vx;
      }
      if (this.vy < 0) {
        this.vy = -this.vy;
      }
      return true;
    }

    if (isRightTopInBlock) {
      if (this.vx > 0) {
        this.vx = -this.vx;
      }
      if (this.vy < 0) {
        this.vy = -this.vy;
      }
      return true;
    }

    if (isLeftBottomInBlock) {
      if (this.vx < 0) {
        this.vx = -this.vx;
      }
      if (this.vy > 0) {
        this.vy = -this.vy;
      }
      return true;
    }

    if (isRightBottomInBlock) {
      if (this.vx > 0) {
        this.vx = -this.vx;
      }
      if (this.vy > 0) {
        this.vy = -this.vy;
      }
      return true;
    }

    return false;
  }
}

class Block extends Shape {
  constructor(ctx, x, y, color, width, height) {
    super(ctx, x, y, color);
    this.width = width;
    this.height = height;
    this.visible = true;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  erase() {
    this.visible = false;
  }
}

class Blocks {
  constructor(ctx, color) {
    this.blocks = [];
    this.ctx = ctx;
    const start = { x: 50, y: 60 };
    const width = 70;
    const height = 20;
    const gap = 10;
    const column = 9;
    const row = 5;

    [...Array(column).keys()].forEach((i) => {
      [...Array(row).keys()].forEach((j) => {
        const x = start.x + (width + gap) * i - gap;
        const y = start.y + (height + gap) * j - gap;
        const block = new Block(this.ctx, x, y, color, width, height);
        this.blocks.push(block);
      });
    });
  }

  getVisibleBlocks() {
    return this.blocks.filter((block) => block.visible);
  }

  draw() {
    this.getVisibleBlocks().forEach((block) => { block.draw(); });
  }

  erase() {
    this.blocks.forEach((block) => block.erase());
  }

  reset() {
    this.blocks.forEach((block) => { block.visible = true; });
  }

  checkCollision(check) {
    this.blocks
      .filter((block) => block.visible && check(block))
      .forEach((block) => {
        block.erase();
      });
  }

  countEliminated() {
    return this.blocks.filter((block) => !block.visible).length;
  }
}

class Bar extends Block {
  constructor(ctx, x, y, color, width, height) {
    super(ctx, x, y, color, width, height);
    this.speed = 0;
  }

  move(width) {
    this.x += this.speed;

    if (this.x + this.width > width) {
      this.x = width - this.width;
    }

    if (this.x < 0) {
      this.x = 0;
    }
  }

  left() {
    this.speed = 8;
  }

  right() {
    this.speed = -8;
  }

  stop() {
    this.speed = 0;
  }
}

class Text extends Shape {
  constructor(ctx, x, y, color, text) {
    super(ctx, x, y, color);
    this.text = text;
  }

  draw(num) {
    const text = `${this.text}: ${num}`;
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(text, this.x, this.y);
  }
}

export {
  Ball, Block, Blocks, Bar, Text,
};
