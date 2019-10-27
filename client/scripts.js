
// module aliases
var Engine = Matter.Engine
var Render = Matter.Render
var World = Matter.World
var Bodies = Matter.Bodies
var Composites = Matter.Composites
var Composite = Matter.Composite
var Mouse = Matter.Mouse
var MouseConstraint = Matter.MouseConstraint
var Runner = Matter.Runner

// create
var engine = Engine.create();
var runner = Runner.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 1200,
        wireframes: false
    }
});
var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: document.body,
    constraint: {
        render: {
            visible: false
        },
        stiffness: 0.2
    }
});

runner.isFixed = true
runner.delta = 5

var blocks = []

var stack1 = Composites.pyramid(0, 100, 11, 5, 60, 60, function (x, y) {
    return Bodies.circle(x, y, 10, {
        isStatic: true,
        restitution: 0.2,
        render: {
            fillStyle: 'white'
        }
    });
});

var stack2 = Composites.pyramid(120, 80, 8, 5, 60, 60, function (x, y) {
    return Bodies.circle(x, y, 10, {
        isStatic: true,
        restitution: 0.2,
        render: {
            fillStyle: 'white'
        }
    });
});

World.add(engine.world, [
    Bodies.rectangle(200, 230, 540, 10, {
        isStatic: true, angle: Math.PI * 0.75, render: {
            fillStyle: 'white'
        }
    }),
    Bodies.rectangle(620, 230, 540, 10, {
        isStatic: true, angle: Math.PI * -0.75, render: {
            fillStyle: 'white'
        }
    }),
    Bodies.rectangle(200, -145, 540, 10, {
        isStatic: true, angle: Math.PI * -0.75, render: {
            fillStyle: 'white'
        }
    }),
    Bodies.rectangle(620, -145, 540, 10, {
        isStatic: true, angle: Math.PI * 0.75, render: {
            fillStyle: 'white'
        }
    }),
]);

var wallStack0 = Composites.stack(82, 480, 9, 1, 69, 10, function (x, y) {
    return Bodies.rectangle(x, y, 700, 10, {
        isStatic: true,
        angle: Math.PI * -0.5,
        render: {
            fillStyle: 'white'
        }
    });
});

var ballStack0 = Composites.stack(500, -960, 9, 45, 1, 10, function (x, y) {
    return Bodies.circle(x, y, 4, { restitution: 0.4 });
});

var ballStack1 = Composites.stack(300, -960, 9, 45, 1, 10, function (x, y) {
    return Bodies.circle(x, y, 4, { restitution: 0.4 });
});

var wallLeft = Bodies.rectangle(0, 600, 50, 1200, {
    isStatic: true,
    restitution: 0.4,
    render: {
        fillStyle: 'white'
    }
});

var wallLeft = Bodies.rectangle(0, 600, 50, 1200, {
    isStatic: true,
    restitution: 0.4,
    render: {
        fillStyle: 'white'
    }
});
var wallRight = Bodies.rectangle(800, 600, 50, 1200, {
    isStatic: true,
    restitution: 0.4,
    render: {
        fillStyle: 'white'
    }
});
var ground = Bodies.rectangle(400, 1200, 1200, 50, {
    isStatic: true,
    restitution: 0.4,
    render: {
        fillStyle: 'white'
    }
});


engine.world.gravity.y = 1
engine.timing.timeScale = 0.2;

World.add(engine.world, mouseConstraint);
// add rest of the bodies to the world
World.add(engine.world, [ground, wallLeft, wallRight, stack1, stack2, ballStack0, ballStack1, wallStack0]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
