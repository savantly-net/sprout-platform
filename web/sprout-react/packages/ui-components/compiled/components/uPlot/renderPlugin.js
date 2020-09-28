import uPlot from 'uplot';
export function renderPlugin(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.spikes, spikes = _c === void 0 ? 4 : _c, _d = _b.outerRadius, outerRadius = _d === void 0 ? 8 : _d, _e = _b.innerRadius, innerRadius = _e === void 0 ? 4 : _e;
    outerRadius *= devicePixelRatio;
    innerRadius *= devicePixelRatio;
    // https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
    function drawStar(ctx, cx, cy) {
        var rot = (Math.PI / 2) * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (var i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }
    function drawPointsAsStars(u, i, i0, i1) {
        var ctx = u.ctx;
        var _a = u.series[i], stroke = _a.stroke, scale = _a.scale;
        ctx.fillStyle = stroke;
        var j = i0;
        while (j <= i1) {
            var val = u.data[i][j];
            var cx = Math.round(u.valToPos(u.data[0][j], 'x', true));
            var cy = Math.round(u.valToPos(val, scale, true));
            drawStar(ctx, cx, cy);
            ctx.fill();
            // const zy = Math.round(u.valToPos(0, scale as string, true));
            // ctx.beginPath();
            // ctx.lineWidth = 3;
            // ctx.moveTo(cx, cy - outerRadius);
            // ctx.lineTo(cx, zy);
            // ctx.stroke();
            // ctx.fill();
            j++;
        }
    }
    return {
        opts: function (u, opts) {
            opts.series.forEach(function (s, i) {
                if (i > 0) {
                    uPlot.assign(s, {
                        points: {
                            show: drawPointsAsStars,
                        },
                    });
                }
            });
        },
        hooks: {},
    };
}
//# sourceMappingURL=renderPlugin.js.map