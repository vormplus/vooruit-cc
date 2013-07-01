//
// SETUP UTILITY NAMESPACE -----------------------------------------------------------
//
// Setup a global namespace for all utilities
// All utility snippets are part of the global 'Utils' namespace
// Important: add this snippet before adding any other utilities
//
// http://addyosmani.com/blog/essential-js-namespacing
//
var Utils=Utils||(Utils={});Utils.client={init:function(){this.isIE=!("__proto__"in{});this.isTouch="ontouchstart"in document||!1;this.isPhone=this.isTouch&&window.innerWidth<768;this.isTablet=this.isTouch&&!this.isPhone;this.isStandalone=navigator.standalone||!1;this.hasCSSTransition=this.checkSupport("Transition");this.hasCSSTransform=this.checkSupport("Transform");this.hasCSSBackgroundSize=this.checkSupport("backgroundSize");this.hasCSSLineClamp=this.checkSupport("webkitLineClamp")},checkSupport:function(e){var t=["webkit","Moz","O","ms",""],n=t.length;while(n--)if(t[n]+e in document.body.style)return!0;return!1}};Utils.client.init();require.config({deps:["app-require.min"],paths:{dom:Utils.client.isIE?["//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.0/jquery.min","libs/jquery-1.10.0.min"]:["//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min","libs/zepto.min"]},shim:{dom:{exports:Utils.client.ieIE?"jQuery":"Zepto"}}});