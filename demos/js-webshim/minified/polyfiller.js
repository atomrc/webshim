(function(b){var t=document,j=b.support,v=b.event.special,D=Object.prototype.hasOwnProperty;"abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section source summary time track video".replace(/\w+/g,function(a){t.createElement(a)});j.dynamicHTML5=!!b("<video><div></div></video>")[0].innerHTML;b("html").addClass("js-on").removeClass("js-off");b.webshims={version:"pre1.1.1",useImportantStyles:true,fix:{},implement:{},fixHTML5:function(a){return a},
createReadyEvent:function(){var a=function(c,e){if(u[e]||k.features[e])c+="Ready";if(!(v[c]&&v[c].add)){v[c]=b.extend(v[c]||{},{add:function(d){d.handler.call(this,b.Event(c))}});b.event.trigger(c)}};return function(c,e){if(c){b.isArray(c)||(c=[c]);b.each(c,function(d,f){if(!(e&&u[f]&&u[f].noAutoCallback)){a(f+"SYS",f,e);a(f,f,e)}})}}}(),moduleList:[],modules:{},features:{},featureList:[],loader:{basePath:function(){var a=b("script");a=a[a.length-1].src.split("?")[0];return a.slice(0,a.lastIndexOf("/")+
1)}(),combinations:{},addModule:function(a,c){u[a]=c},loadList:function(){var a=[];return function(c){var e=[];b.each(c,function(d,f){var g=u[f];if("test"in g&&g.test(c))y(f);else{g.css&&p.loadCSS(g.css);e.push(f);g.loadInit&&g.loadInit()}});k.debug||b.each(p.combinations||[],function(d,f){var g=true;b.each(f,function(h,l){if(b.inArray(l,e)===-1||b.inArray(l,a)!==-1)return g=false});if(g){a=a.concat(f);p.loadScript(d,false,f);return false}});b.each(e,function(d,f){if(b.inArray(f,a)==-1)p.loadScript(u[f].src||
f,false,f)})}}(),makePath:function(a){if(a.indexOf("://")!=-1||a.indexOf("/")===0)return a;if(a.indexOf(".")==-1)a+=".js";return p.basePath+a},loadCSS:function(){var a,c=[];return function(e){e=this.makePath(e);if(b.inArray(e,c)==-1){a=a||t.getElementsByTagName("head")[0]||t.body;c.push(e);b('<link rel="stylesheet" />').prependTo(a).attr({href:e})}}}(),loadScript:function(){var a,c=[];return function(e,d,f){e=p.makePath(e);if(b.inArray(e,c)==-1){a=a||t.getElementsByTagName("head")[0]||t.body;if(!a||
!a.appendChild)setTimeout(function(){p.loadScript(e,d,f)},9);else{var g=t.createElement("script"),h=function(l){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){g.onload=null;g.onerror=null;g.onreadystatechange=null;d&&d(l,this);y(f,true);g=null}};g.setAttribute("async","async");g.src=e;g.onload=h;g.onerror=h;g.onreadystatechange=h;a.appendChild(g);g.async=true;c.push(e)}}}}()},ready:function(a,c,e,d){if(typeof a=="string")a=a.split(" ");d||(a=b.map(a,function(g){var h=
g;if(e&&h!="ready")h+="SYS";if(u[g]||k.features[g])h+="Ready";return h}));if(a.length){d=a.shift();var f=function(){k.ready(a,c,e,true)};d=="ready"?b(f):b(t).one(d,f)}else c(b,k,window,document)},capturingEvents:function(a,c){if(t.addEventListener){if(typeof a=="string")a=[a];b.each(a,function(e,d){var f=function(g){g=b.event.fix(g);if(c){var h=g.preventDefault;g.preventDefault=function(){h.apply(this,arguments);clearTimeout(b.data(g.target,"maybePrevented"+g.type));b.data(g.target,"maybePrevented"+
g.type,setTimeout(function(){b.removeData(g.target,"maybePrevented"+g.type)},90))}}return b.event.handle.call(this,g)};v[d]=v[d]||{};v[d].setup||v[d].teardown||b.extend(v[d],{setup:function(){this.addEventListener(d,f,true)},teardown:function(){this.removeEventListener(d,f,true)}})})}},defineNodeNamesProperty:function(a,c,e){if(typeof a=="string")a=a.split(/\s*,\s*/);b.each(a,function(d,f){k.defineNodeNameProperty(f,c,e)})},contentAttr:function(a,c,e){if(a.nodeName){if(e===void 0){e=a.getAttribute(c);
return e==null?void 0:e}if(typeof e=="boolean")e?a.setAttribute(c,c):a.removeAttribute(c);else a.setAttribute(c,e)}},defineNodeNamesBooleanProperty:function(a,c,e){k.defineNodeNamesProperty(a,c,{set:function(d,f){f=!!f;d[c]=f;k.contentAttr(d,c,f);return f},get:function(d){return j.contentAttr&&c in d?!!d[c]:k.contentAttr(d,c)!=null}});e&&k.onNodeNamesPropertyModify(a,c,e)},addMethodName:function(a){b.fn[a]&&"shim"in b.fn[a]||(b.fn[a]=function(){var c=arguments,e;this.each(function(){var d=b.attr(this,
a);if(d&&d.apply){e=d.apply(this,c);if(e!==void 0)return false}});return e!==void 0?e:this})},addPolyfill:function(a,c){c=c||{};var e=c.feature||a,d=k;if(!d.features[e]){d.features[e]=[];d.featureList.push(e)}d.features[e].push(a);p.addModule(a,c);d.moduleList.push(a);b.each(c.combination||[],function(f,g){if(A[g])A[g].push(a);else A[g]=[a]});if(c.methodNames){if(!b.isArray(c.methodNames))c.methodNames=[c.methodNames];b.each(c.methodNames,function(f,g){k.addMethodName(g)})}},polyfill:function(a,c){var e=
this,d=e.loader,f=[],g=function(){b("html").removeClass("loading-polyfills long-loading-polyfills polyfill-remove-fouc");b(window).unbind("load.loadingPolyfills error.loadingPolyfills");clearTimeout(h)},h;c=c||b.noop;a=a||e.featureList;if(a=="lightweight")a=k.light;if(typeof a=="string")a=a.split(" ");if(!b.isReady){k.removeFOUC&&b("html").addClass("polyfill-remove-fouc");b("html").addClass("loading-polyfills");b(window).bind("load.loadingPolyfills error.loadingPolyfills",g);h=setTimeout(function(){b("html").addClass("long-loading-polyfills")},
400)}k.ready(a,function(){g();c(b,k,window,document)});b.each(a,function(l,i){i!==e.features[i][0]&&e.ready(e.features[i],function(){y(i)},true);f=f.concat(e.features[i])});k.useImportantStyles&&b("html").addClass("polyfill-important");d.loadCSS("shim.css");d.loadList(f);b(function(){d.loadList(["html5a11y"])})},getID:function(){var a=(new Date).getTime();return function(c){c=b(c);var e=c.attr("id");if(!e){a++;e="elem-id-"+a;c.attr("id",e)}return e}}(),activeLang:function(){var a=[navigator.browserLanguage||
navigator.language||""],c=b("html").attr("lang"),e;c&&a.push(c);return function(d,f,g){if(d)if(!f||!g){if(d!==a[0]){a[0]=d;clearTimeout(e);e=setTimeout(function(){b(t).triggerHandler("htmlExtLangChange",a)},9)}}else{f=u[f].options;var h=function(i){if(b.inArray(i,l)!==-1){p.loadScript(f.langSrc+i+".js",function(){d[i]&&g(d[i])});return true}return false},l=f&&f.availabeLangs;b.each(a,function(i,o){var m=o.split("-")[0];if(d[o]||d[m]){g(d[o]||d[m]);return false}if(l&&f.langSrc&&(h(o)||h(m)))return false})}return a}}()};
var k=b.webshims,y=k.createReadyEvent,p=k.loader,u=k.modules,A=p.combinations,r=k.addPolyfill;(function(){var a=[],c=b([]);b.extend(k,{addReady:function(e){var d=function(f,g){b(function(){e(f,g)})};a.push(d);d(t,c)},triggerDomUpdate:function(e){if(e){var d=e!==document?b(e):c;b.each(a,function(f,g){g(e,d)})}}});k.defineNodeNameProperty=function(){var e=b.attr,d={},f={};b.attr=function(h,l,i,o,m){var q=(h.nodeName||"").toLowerCase();if(!q||h.nodeType!==1)return e(h,l,i,o,m);var n=d[q],x,s;if(n)n=
n[l];if(!n)if(n=d["*"])n=n[l];if(n)if(i===void 0){if(n.get)return n.get(h,i);return n.value}else if(n.set){s=n.set(h,i);x=true}x||(s=e(h,l,i,o,m));i!==void 0&&f[q]&&f[q][l]&&b.each(f[q][l],function(E,B){B(h,i)});return s};k.onNodeNamesPropertyModify=function(h,l,i){if(typeof h=="string")h=h.split(/\s*,\s*/);if(b.isFunction(i))i={set:i};b.each(h,function(o,m){f[m]||(f[m]={});f[m][l]||(f[m][l]=[]);i.set&&f[m][l].push(i.set);i.init&&g(m,l)})};var g=function(){var h={},l={},i;k.addReady(function(o,m){h=
{};b.each(l,function(q,n){h[q]=b(o.getElementsByTagName(q));if(m[0]&&b.nodeName(m[0],q))h[q]=h[q].add(m);b.each(n,function(x,s){h[q].filter("["+s+"]").attr(s,function(E,B){return B})})});i=true});return function(o,m){if(l[o])l[o].push(m);else l[o]=[m];if(i){h[o]=h[o]||b(document.getElementsByTagName(o));h[o].filter("["+m+"]").attr(m,function(q,n){return n})}}}();return function(h,l,i){i=b.extend({writeable:true},i);d[h]||(d[h]={});var o=d[h][l],m=function(q,n){if(n&&n[q])return n[q];return q=="value"?
function(x){var s=e(x,l);if(s&&s.apply)return s.apply(x,arguments)}:function(x,s){return e(x,l,s)}};d[h][l]=i;if(i.value===void 0){if(!i.set)i.set=i.writeable?m("set",i):function(){throw l+"is readonly on "+h;};if(!i.get)i.get=m("get",i)}b.each(["value","get","set"],function(q,n){if(i[n])i[n]._polyfilled=m(n,o)});i.init&&g(h,l);return i}}()})();b.fn.htmlWebshim=function(a){a=this.html(a?k.fixHTML5(a):a);a===this&&b.isReady&&this.each(function(){k.triggerDomUpdate(this)});return a};b.each(["after",
"before","append","prepend"],function(a,c){b.fn[c+"Webshim"]=function(e){e=b(k.fixHTML5(e));this[c](e);b.isReady&&e.each(function(){k.triggerDomUpdate(this)});return this}});y("htmlExtLangChange",true);var z=parseFloat(b.browser.version,10);p.addModule("html5a11y",{src:"html5a11y",test:function(){return!(b.browser.msie&&z<10&&z>7||b.browser.mozilla&&z<2||b.browser.webkit&&z<540)}});p.addModule("jquery-ui",{src:"http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js",test:function(){return!!(b.widget&&
b.Widget)}});p.addModule("input-widgets",{src:"",test:function(){return!(b.widget&&!(b.datepicker||b.fn.slider))}});p.addModule("swfobject",{src:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",test:function(){return"swfobject"in window}});var C=b("<div />")[0],w=[];w.push(!!(Array.isArray&&Object.keys&&Object.create&&Function.prototype.bind&&Object.defineProperties&&!isNaN(Date.parse("T00:00"))));w.push(!!(String.prototype.trim&&Date.now&&Date.prototype.toISOString));w[1]&&b.each(["filter",
"map","every","reduce","reduceRight","lastIndexOf"],function(a,c){if(!Array.prototype[c])return w[1]=false});j.es5=w[0]&&w[1];j.objectAccessor=!!(Object.create&&Object.defineProperties&&Object.getOwnPropertyDescriptor||Object.prototype.__defineGetter__&&Object.prototype.__lookupSetter__);j.domAccessor=!!(Object.prototype.__defineGetter__&&Object.prototype.__lookupSetter__||Object.defineProperty&&Object.getOwnPropertyDescriptor);C.setAttribute("dataHttpAttr",":-)");j.contentAttr=!C.dataHttpAttr;(function(){var a=
["configurable","enumerable","writable"],c=function(d){for(var f=0;f<3;f++)a[f]in d||(d[a[f]]=true)},e=function(d){if(d)for(var f in d)D.call(d,f)&&c(d[f])};k.objectCreate=function(d,f,g){e(f);d=Object.create(d,f);d._create&&b.isFunction(d._create)&&d._create(g);return d};k.defineProperty=function(d,f,g){c(g);return Object.defineProperty(d,f,g)};k.defineProperties=function(d,f){e(f);return Object.defineProperties(d,f)};k.getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor})();r("es5-1",{feature:"es5",
test:function(){return w[1]&&w[0]},combination:["combined-ie7","combined-ie8","combined-ff3","combined-ie7-light","combined-ie8-light","combined-ff3-light","combined-webkit"]});r("es5-2",{feature:"es5",test:function(){return w[1]},combination:["combined-ie7","combined-ie8","combined-ie7-light","combined-ie8-light"]});j.geolocation="geolocation"in navigator;r("geolocation",{test:function(){return j.geolocation},options:{destroyWrite:true},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ie7-light",
"combined-ie8-light","combined-ie9-light"]});j.canvas="getContext"in b("<canvas />")[0];r("canvas",{test:function(){return j.canvas},noAutoCallback:true,methodNames:["getContext"],combination:["combined-ie7","combined-ie8","combined-ie7-light","combined-ie8-light"]});k.validityMessages=[];k.inputTypes={};(function(){var a=b('<form action="#"><fieldset><input name="a" required /><select><option>y</option></select></fieldset></form>'),c=b("fieldset",a)[0],e=b('<input type="range" />')[0],d=b('<input type="date" />')[0];
j.validity="checkValidity"in a[0];j.validationMessage=!!b("input",a).attr("validationMessage");j.fieldsetValidation=!!(c.elements&&c.checkValidity&&"disabled"in c&&!c.checkValidity());j.output=!!("value"in t.createElement("output"));j.datalistProp="list"in b("input",a)[0]&&"options"in document.createElement("datalist");j.datalist=j.datalistProp&&window.HTMLDataListElement;j.numericDateProps=e.type=="range"&&d.type=="date";j.requiredSelect="required"in b("select",a)[0];j.rangeUI=j.numericDateProps;
j.dateUI=j.numericDateProps;if(window.Modernizr){j.rangeUI=Modernizr.inputtypes.range;j.dateUI=Modernizr.inputtypes.date}})();r("form-core",{feature:"forms",noAutoCallback:true,loadInit:function(){setTimeout(function(){k.polyfill(["es5"])},0)},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ff4","combined-ie7-light","combined-ie8-light","combined-ie9-light","combined-ff3-light","combined-webkit"]});r("form-message",{feature:"forms",test:function(){return j.validity&&
j.validationMessage&&k.implement.customValidationMessage&&u["form-extend"]()},options:{},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ff4","combined-ie7-light","combined-ie8-light","combined-ie9-light","combined-ff3-light","combined-webkit"]});if(j.validity){k.capturingEvents(["input"]);k.capturingEvents(["invalid"],true);r("form-extend",{feature:"forms",src:"form-native-extend",noAutoCallback:true,test:function(a){return j.requiredSelect&&j.validationMessage&&
(j.numericDateProps||b.inArray("form-number-date",a)==-1)&&!k.overrideValidationMessages},loadInit:function(){setTimeout(function(){p.loadList(["form-message"])},0)},methodNames:["setCustomValidity","checkValidity"],combination:["combined-ff4","combined-webkit"]});r("form-native-fix",{feature:"forms",test:function(){return j.requiredSelect&&!b.browser.webkit},combination:["combined-webkit"]})}else r("form-extend",{feature:"forms",src:"form-shim-extend",noAutoCallback:true,test:function(){return false},
methodNames:["setCustomValidity","checkValidity"],combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ie7-light","combined-ie8-light","combined-ie9-light","combined-ff3-light"]});r("form-number-date",{feature:"forms-ext",noAutoCallback:true,test:function(){return j.numericDateProps},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ff4"],options:{stepArrows:{number:1,time:1},calculateWidth:true}});r("inputUI",{feature:"forms-ext",src:"form-date-range-ui",
test:function(){return j.rangeUI&&j.dateUI&&!u.inputUI.options.replaceNative},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ff4"],noAutoCallback:true,loadInit:function(){p.loadList(["jquery-ui"]);u["input-widgets"].src&&p.loadList(["input-widgets"])},options:{slider:{},datepicker:{},langSrc:"http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/i18n/jquery.ui.datepicker-",availabeLangs:"af ar az bg bs cs da de el en-GB eo es et eu fa fi fo fr fr-CH he hr hu hy id is it ja ko it lt lv ms nl no pl pt-BR ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" "),
recalcWidth:true,replaceNative:false}});r("form-output-datalist",{feature:"forms",noAutoCallback:true,test:function(){return j.output&&j.datalist},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ie7-light","combined-ie8-light","combined-ie9-light","combined-ff3-light"]});b.support.datalistProp&&b.webshims.defineNodeNameProperty("input","list",{set:function(a,c){if(c&&c.getAttribute)c=b.webshims.getID(c);a.list=c}});j.placeholder=b('<input type="text" />').attr("placeholder")!=
null;r("form-placeholder",{feature:"forms",test:function(){return j.placeholder},combination:["combined-ie7","combined-ie8","combined-ie9","combined-ff3","combined-ie7-light","combined-ie8-light","combined-ie9-light","combined-ff3-light"]});j.jsonStorage="JSON"in window&&"localStorage"in window&&"sessionStorage"in window;r("json-storage",{test:function(){return j.jsonStorage},loadInit:function(){p.loadList(["swfobject"])},noAutoCallback:true,combination:["combined-ie7","combined-ie7-light"]});r("html5shiv",
{test:function(){return j.dynamicHTML5},combination:["combined-ie7","combined-ie8","combined-ie7-light","combined-ie8-light"]});k.light=["es5","html5shiv","canvas","geolocation","forms","json-storage"]})(jQuery);
