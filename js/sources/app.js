//
// @INCLUDES -------------------------------------------------------------------------
//

// @codekit-prepend "__sketch.js"








//
// PARTICLE CLASS --------------------------------------------------------------------
//

var Particle = function(x, y, radius)
{
    this.init(x, y, radius);
};


Particle.prototype =
{
    init: function(x, y, radius)
    {
        this.alive  = true;
        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta  = random(TWO_PI);
        this.drag   = 0.092;

        this.shape = 'cicle';
        this.color = '#F0F';
        
        this.x  = x || 0.0;
        this.y  = y || 0.0;
        this.vx = sin(this.theta) * random(0.2, 0.8);
        this.vy = cos(this.theta) * random(0.2, 0.8);
    },

    move: function()
    {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.theta += random(-0.5, 0.5) * this.wander;
        this.vx += sin(this.theta) * 0.1;
        this.vy += cos(this.theta) * 0.1;

        this.radius *= 0.98;
        this.alive = this.radius > 1;
    },

    draw: function(ctx)
    {
        ctx.beginPath();
        
        if(this.shape === 'circle') ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        if(this.shape === 'rectangle') ctx.rect(this.x - (this.radius * 0.5), this.y, this.radius, this.radius);

        ctx.fillStyle = this.color;
        ctx.fill();
    }
};




//
// GENERATIVE CANVAS -----------------------------------------------------------------
//

var Canvas = (function()
{
    var

    SHAPES = [ 'rectangle', 'circle' ],
    COLORS = [ '#009BDB', '#F7E822', '#E42321', '#FDFDFD', '#000' ],

    MAX_PARTICLES = 200,

    particles = [],
    pool = [],

    bg = Sketch.create({
        container: document.getElementById( 'background' ),
        autoclear: false
    });


    //
    // CORE METHODS -----------------------------------------------------
    //

    bg.addParticle = function(x, y)
    {
        if(particles.length > MAX_PARTICLES) pool.push(particles.shift());
        var particle = pool.length ? pool.pop() : new Particle();

        particle.init(x, y, random(30, 80));

        particle.wander = random(0.5, 2);
        particle.drag   = random(0.9, 0.99);
        particle.color  = random(COLORS);
        particle.shape  = random(SHAPES);

        particles.push(particle);
    };


    bg.init = function()
    {
        var i = 150;
        while(i--) bg.addParticle(window.innerWidth * 0.5, random(180, 220));
    };


    bg.setup = function()
    {
        bg.init();
    };


    bg.update = function()
    {
        var i = particles.length, particle;
        while(i--)
        {
            particle = particles[i];
            particle.alive ? particle.move() : pool.push( particles.splice( i, 1 )[0] );
        }
    };


    bg.draw = function()
    {
        bg.strokeStyle = 'rgba(200, 200, 200, .5)';
        
        var i = particles.length;
        while(i--)
        {
            particles[i].draw(bg);
            if(i%4 === 0) bg.stroke();
        }
    };


    //
    // EVENT HANDLERS ---------------------------------------------------
    //

    bg.mousemove = function()
    {
        var touch, max, j;
        for(var i=0, n=bg.touches.length; i<n; i++)
        {
            touch = bg.touches[i];
            for(j=0, max=random(1, 2); j<max; j++) bg.addParticle(touch.x, touch.y);
        }
    };


    bg.click = function()
    {
        bg.clear();
    };


    bg.resize = function()
    {
        bg.init();
    };


}());




//
// EVENT HANDLERS --------------------------------------------------------------------
//

var App = (function()
{
    var

    buttons = document.getElementsByClassName('button'),
    panels  = document.getElementsByClassName('panel');


    // Add event listeners for button events
    // which trigger visibility of the panels
    document.body.addEventListener('click', function(e)
    {
        var target = e.target;

        if(target.className !== 'button') return;
        e.preventDefault();


        if(target.id === 'left-button')
        {
            panels[0].className = 'panel active';
            buttons[0].className = 'button hidden';
            buttons[1].className = 'button hidden';
        }


        if(target.id === 'right-button')
        {
            panels[1].className = 'panel active';
            buttons[0].className = 'button hidden';
            buttons[1].className = 'button hidden';
        }


        if(target.id === 'close-left')
        {
            panels[0].className = 'panel';
            buttons[0].className = 'button';
            buttons[1].className = 'button';
        }


        if(target.id === 'close-right')
        {
            panels[1].className = 'panel';
            buttons[0].className = 'button';
            buttons[1].className = 'button';
        }


    }, false);


}());



