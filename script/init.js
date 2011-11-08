// from: http://www.javascriptworkshop.com/2006/12/05/waiting-for-the-dom-to-load/
function addLoadEvent(func) {
     var oldonload = window.onload;

     if (typeof window.onload != 'function') {
          window.onload = func;
     } else {
          window.onload = function() {
               if (oldonload) {
                    oldonload();
               }
               func();
          };
     }
}