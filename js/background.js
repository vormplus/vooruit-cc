$(document).ready(function(){

	$("#corner1").click( function() {
        $("#message1").show();
    });

    $("#corner2").click( function() {
        $("#message2").show();
    });

    $("#corner3").click( function() {
        $("#message3").show();
    });

    $("#corner4").click( function() {
        $("#message4").show();
    });

    $("#close1").click( function() {
        $("#message1").hide();
    });

    $("#close2").click( function() {
        $("#message2").hide();
    });

    $("#close3").click( function() {
        $("#message3").hide();
    });

    $("#close4").click( function() {
        $("#message4").hide();
    });

    /* SKETCH */

     // ----------------------------------------
    // Particle
    // ----------------------------------------

    var SHAPES = ['rect', 'circ'];

    function Particle( x, y, radius ) {
        this.init( x, y, radius );
    }

    Particle.prototype = {

        init: function( x, y, radius ) {

            this.alive = true;

            this.radius = radius || 10;
            this.wander = 0.15;
            this.theta = random( TWO_PI );
            this.drag = 0.092;
            this.color = '#fff';

            this.x = x || 0.0;
            this.y = y || 0.0;

            this.vx = 0.0;
            this.vy = 0.0;

            this.shape = random( SHAPES );
        },

        move: function() {

            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.1;
            this.vy += cos( this.theta ) * 0.1;

            this.radius *= 0.98;
            this.alive = this.radius > 0.5;

        },

        draw: function( ctx ) {

            ctx.beginPath();
            
            if(this.shape === 'circ') ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
            if(this.shape === 'rect') ctx.rect(this.x - (this.radius * 0.5), this.y, this.radius, this.radius);

            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };

    // ----------------------------------------
    // Example
    // ----------------------------------------

    var MAX_PARTICLES = 200;
    var COLOURS = [ '#009BDB', '#F7E822', '#E42321', '#FFFFFF', '#000000' ];

    var particles = [];
    var pool = [];

    var demo = Sketch.create({
        container: document.getElementById( 'background' ),
        autoclear: false
    });

    demo.setup = function() {
    };

    demo.spawn = function( x, y ) {

        if ( particles.length >= MAX_PARTICLES )
            pool.push( particles.shift() );

        particle = pool.length ? pool.pop() : new Particle();
        particle.init( x, y, random( 30, 80 ) );

        particle.wander = random( 0.5, 2 );
        particle.color = random( COLOURS );
        particle.drag = random( 0.9, 0.99 );

        theta = random( TWO_PI );
        force = random( 0.2, 0.8 );

        particle.vx = sin( theta ) * force;
        particle.vy = cos( theta ) * force;

        particles.push( particle );
    };

    demo.update = function() {

        var i, particle;

        for ( i = particles.length - 1; i >= 0; i-- ) {

            particle = particles[i];

            if ( particle.alive ) particle.move();
            else pool.push( particles.splice( i, 1 )[0] );
        }
    };

    demo.draw = function() {
        for(var i = particles.length - 1; i >= 0; i--)
        {
            particles[i].draw(demo); 
        }

        demo.shadowOffsetX = 0;
        demo.shadowOffsetY = 0;
        demo.shadowBlur = 35;
        demo.shadowColor = 'rgba( 0, 0, 0, .05 )';

        demo.strokeStyle = 'rgba(200, 200, 200, .3)';

        for(var i = particles.length - 1; i > 3; i--)
        {
            demo.moveTo(particles[i].x, particles[i].y);
            
            //demo.lineTo(particles[i-1].x, particles[i-1].y);
            //demo.quadraticCurveTo(particles[i-2].x, particles[i-2].y, particles[i-4].x, particles[i-4].y);
        }
        demo.stroke();
    };

    demo.mousemove = function() {

        var particle, theta, force, touch, max, i, j, n;

        for ( i = 0, n = demo.touches.length; i < n; i++ ) {

            touch = demo.touches[i], max = random( 1, 4 );
            for ( j = 0; j < max; j++ ) {
              demo.spawn( touch.x, touch.y );
            }

        }
    };
});