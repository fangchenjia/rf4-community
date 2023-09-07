import { fabric } from 'fabric';

const Arrow = fabric.Arrow = fabric.util.createClass(fabric.Line, {
  type: 'arrow',
  superType: 'drawing',
  initialize(points, options) {
    if (!points) {
      const { x1, x2, y1, y2 } = options;
      points = [x1, y1, x2, y2];
    }
    options = options || {};
    this.callSuper('initialize', points, options);
  },
  _render(ctx) {
    this.callSuper('_render', ctx);
    ctx.save();
    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    const angle = Math.atan2(yDiff, xDiff);
    ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    const { strokeWidth } = this;
    const arrowWidth = strokeWidth * 2;
    ctx.moveTo(arrowWidth, 0);
    ctx.lineTo(-arrowWidth, arrowWidth);
    ctx.lineTo(-arrowWidth, -arrowWidth);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },
});

fabric.Arrow.fromObject = (options, callback) => {
  const { x1, x2, y1, y2 } = options;
  return callback(new fabric.Arrow([x1, y1, x2, y2], options));
};

export default Arrow;
