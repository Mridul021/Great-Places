(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{41:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(48);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},48:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),c=a(47),l=a(8),o=a(0),s=a.n(o),i=a(1),u=a(41),m=a(43),d=a(9),p=a(50),E=(a(64),a(57)),f=(a(65),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){new window.ol.Map({target:t.current.id,layers:[new window.ol.layer.Tile({source:new window.ol.source.OSM})],view:new window.ol.View({center:window.ol.proj.fromLonLat([a.lng,a.lat]),zoom:n})})}),[a,n]),s.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style,id:"map"})}),h=a(49),v=a(13),w=function(e){var t=Object(p.a)(),a=t.isLoading,n=t.error,i=t.sendRequest,w=t.clearError,b=Object(o.useContext)(d.a),O=Object(o.useState)(!1),g=Object(l.a)(O,2),j=g[0],k=g[1],C=Object(o.useState)(!1),N=Object(l.a)(C,2),y=N[0],_=N[1],D=function(){return k(!1)},L=function(){_(!1)},I=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return _(!1),t.prev=1,t.next=4,i("https://great-places-mern.herokuapp.com/api"+"/places/".concat(e.id),"DELETE",null,{Authorization:"Bearer "+b.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{error:n,onClear:w}),s.a.createElement(E.a,{show:j,onCancel:D,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:s.a.createElement(m.a,{onClick:D},"CLOSE")},s.a.createElement("div",{className:"map-container"},s.a.createElement(f,{center:e.coordinates,zoom:16}))),s.a.createElement(E.a,{show:y,onCancel:L,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{inverse:!0,onClick:L},"CANCEL"),s.a.createElement(m.a,{danger:!0,onClick:I},"DELETE"))},s.a.createElement("p",null,"Do you really want to proceed and delete this place?")),s.a.createElement("li",{className:"place-item"},s.a.createElement(u.a,{className:"place-item__content"},a&&s.a.createElement(v.a,{asOverlay:!0}),s.a.createElement("div",{className:"place-item__image"},s.a.createElement("img",{src:"".concat("https://great-places-mern.herokuapp.com","/").concat(e.image),alt:e.title})),s.a.createElement("div",{className:"place-item__info"},s.a.createElement("h2",null,e.title),s.a.createElement("h3",null,e.address),s.a.createElement("p",null,e.description)),s.a.createElement("div",{className:"place-item__actions"},s.a.createElement(m.a,{inverse:!0,onClick:function(){return k(!0)}},"VIEW ON MAP"),b.userId===e.creatorId&&s.a.createElement(m.a,{to:"/places/".concat(e.id)},"EDIT"),b.userId===e.creatorId&&s.a.createElement(m.a,{danger:!0,onClick:function(){_(!0)}},"DELETE")))))},b=(a(66),function(e){return 0===e.items.length?s.a.createElement("div",{className:"place-list center"},s.a.createElement(u.a,null,s.a.createElement("h2",null,"No places found. Maybe create one?"),s.a.createElement(m.a,{to:"/places/new"},"Share Place"))):s.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return s.a.createElement(w,{key:t.id,id:t.id,image:t.image,title:t.title,descripton:t.descripton,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(o.useState)(),t=Object(l.a)(e,2),a=t[0],n=t[1],u=Object(p.a)(),m=u.isLoading,d=u.error,E=u.sendRequest,f=u.clearError,w=Object(i.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E("".concat("https://great-places-mern.herokuapp.com/api","/places/user/").concat(w));case 3:t=e.sent,n(t.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[E,w]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{error:d,onClear:f}),m&&s.a.createElement("div",{className:"='center"},s.a.createElement(v.a,null)),!m&&a&&s.a.createElement(b,{items:a,onDeletePlace:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.9ec4b1ff.chunk.js.map