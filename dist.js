!function(n){"undefined"!=typeof module&&module.exports?module.exports=n:n(jQuery)}(function(n){function o(n,o,t,l,r){var e;n>o?e=t:n<o&&(e=l),e&&e.forEach(function(n){n.call(r)})}var t=[];"up down left right".split(" ").forEach(function(l){n.fn["scroll"+l]=function(r,e){var f=this,u=t.filter(function(n){return n.el===f})[0];return u||(u=new function(t){var l=this;l.el=t,l.up=[],l.down=[],l.left=[],l.right=[];var r=n(t),e=r.scrollLeft(),f=r.scrollTop();r.on("scroll",function(){var n=r.scrollLeft(),u=r.scrollTop();o(e,n,l.left,l.right,t),o(f,u,l.up,l.down,t),e=n,f=u})}(f),t.push(u)),u[l].push(r),e&&e(function(){u[l].splice(u[l].indexOf(r),1)}),f}})});