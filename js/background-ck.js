$(document).ready(function(){function t(e,t,n){this.init(e,t,n)}$("#corner1").click(function(){$("#message1").show()});$("#corner2").click(function(){$("#message2").show()});$("#corner3").click(function(){$("#message3").show()});$("#corner4").click(function(){$("#message4").show()});$("#close1").click(function(){$("#message1").hide()});$("#close2").click(function(){$("#message2").hide()});$("#close3").click(function(){$("#message3").hide()});$("#close4").click(function(){$("#message4").hide()});var e=["rect","circ"];t.prototype={init:function(t,n,r){this.alive=!0;this.radius=r||10;this.wander=.15;this.theta=random(TWO_PI);this.drag=.092;this.color="#fff";this.x=t||0;this.y=n||0;this.vx=0;this.vy=0;this.shape=random(e)},move:function(){this.x+=this.vx;this.y+=this.vy;this.vx*=this.drag;this.vy*=this.drag;this.theta+=random(-0.5,.5)*this.wander;this.vx+=sin(this.theta)*.1;this.vy+=cos(this.theta)*.1;this.radius*=.98;this.alive=this.radius>.5},draw:function(e){e.beginPath();this.shape==="circ"&&e.arc(this.x,this.y,this.radius,0,TWO_PI);this.shape==="rect"&&e.rect(this.x-this.radius*.5,this.y,this.radius,this.radius);e.fillStyle=this.color;e.fill()}};var n=200,r=["#009BDB","#F7E822","#E42321","#FFFFFF","#000000"],i=[],s=[],o=Sketch.create({container:document.getElementById("background"),autoclear:!1});o.setup=function(){};o.spawn=function(e,o){i.length>=n&&s.push(i.shift());particle=s.length?s.pop():new t;particle.init(e,o,random(30,80));particle.wander=random(.5,2);particle.color=random(r);particle.drag=random(.9,.99);theta=random(TWO_PI);force=random(.2,.8);particle.vx=sin(theta)*force;particle.vy=cos(theta)*force;i.push(particle)};o.update=function(){var e,t;for(e=i.length-1;e>=0;e--){t=i[e];t.alive?t.move():s.push(i.splice(e,1)[0])}};o.draw=function(){for(var e=i.length-1;e>=0;e--)i[e].draw(o);o.shadowOffsetX=0;o.shadowOffsetY=0;o.shadowBlur=35;o.shadowColor="rgba( 0, 0, 0, .05 )";o.strokeStyle="rgba(200, 200, 200, .3)";for(var e=i.length-1;e>3;e--)o.moveTo(i[e].x,i[e].y);o.stroke()};o.mousemove=function(){var e,t,n,r,i,s,u,a;for(s=0,a=o.touches.length;s<a;s++){r=o.touches[s],i=random(1,4);for(u=0;u<i;u++)o.spawn(r.x,r.y)}}});