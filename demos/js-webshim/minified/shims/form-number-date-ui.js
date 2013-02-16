jQuery.webshims.register("form-number-date-ui",function(e,t,n,r,i,s){"use strict";var o,u=function(e){return e?(e+="",e.length==1?"0"+e:e):""};(function(){var t=e.webshims.formcfg;t.de={numberFormat:{",":".",".":","},timeSigns:":. ",numberSigns:",",dateSigns:".",dFormat:".",patterns:{d:"dd.mm.yy"},date:{close:"schlie\u00dfen",prevText:"zur\u00fcck",nextText:"Vor",currentText:"heute",monthNames:["Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","M\u00e4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayNamesMin:["So","Mo","Di","Mi","Do","Fr","Sa"],weekHeader:"KW",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},t.en={numberFormat:{".":".",",":","},numberSigns:".",dateSigns:"/",timeSigns:":. ",dFormat:"/",patterns:{d:"mm/dd/yy"},date:{closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},t["en-US"]=t["en-US"]||t.en,t[""]=t[""]||t["en-US"],o=t[""];var n=function(t){if(!t.date.monthkeys){var n=function(e,n){var r,i=e+1;r=i<10?"0"+i:""+i,t.date.monthkeys[i]=r,t.date.monthkeys[n]=r};t.date.monthkeys={},e.each(t.date.monthNames,n),e.each(t.date.monthNamesShort,n)}};n(o),e.webshims.ready("dom-extend",function(){e.webshims.activeLang({register:"form-core",callback:function(){e.each(arguments,function(i,s){if(t[s])return o=t[s],n(o),e(r).triggerHandler("wslocalechange"),!1})}})})})(),function(){var t=function(t){e(this)[t.type=="mousepressstart"?"addClass":"removeClass"]("mousepress-ui")},n=function(e,t){return typeof e=="number"||e&&e==e*1?e*1:t},i=["step","min","max","readonly","title","disabled","tabindex","placeholder","value"],s=function(t){if(!o.patterns[t+"Obj"]){var n={};e.each(o.patterns[t].split(o[t+"Format"]),function(e,t){n[t]=e}),o.patterns[t+"Obj"]=n}},a={number:function(e){return(e+"").replace(/\,/g,"").replace(/\./,o.numberFormat["."])},time:function(e){return e},month:function(e,t){var n,r=e.split("-");return r[0]&&r[1]&&(n=o.date[t.monthNames]||o.date.monthNames,r[1]=n[r[1]*1-1],r[1]&&(e=o.date.showMonthAfterYear?r.join(" "):r[1]+" "+r[0])),e},date:function(e){var t=(e+"").split("-");return t[2]&&t[1]&&t[0]&&(e=o.patterns.d.replace("yy",t[0]||""),e=e.replace("mm",t[1]||""),e=e.replace("dd",t[2]||"")),e}},f={number:function(e){return(e+"").replace(o.numberFormat[","],"").replace(o.numberFormat["."],".")},time:function(e){return e},month:function(e){var t=e.trim().split(/[\s-\/\\]+/);return t.length==2&&(t[0]=o.date.monthkeys[t[0]]||t[0],t[1]=o.date.monthkeys[t[1]]||t[1],t[1].length==2?e=t[0]+"-"+t[1]:t[0].length==2&&(e=t[1]+"-"+t[0])),e},date:function(e){s("d");var t,n=o.patterns.dObj;return e=e.split(o.dFormat),e.length==3?[u(e[n.yy]),u(e[n.mm]),u(e[n.dd])].join("-"):""}},l={number:{step:1},time:{step:60},month:{step:1,start:new Date},date:{step:1,start:new Date}},c=function(){var t={};return function(n){var r;return t[n]||(r=e('<input type="'+n+'" />'),t[n]=function(e){var t=typeof e=="object"?"valueAsDate":"value";return r.prop(t,e).prop("valueAsNumber")}),t[n]}}();l.range=l.number;var h={_create:function(){var t;this.type=this.options.type,this.orig=this.options.orig,this.elemHelper=e('<input type="'+this.type+'" />'),this.asNumber=c(this.type),this.buttonWrapper=e('<span class="input-buttons '+this.type+'-input-buttons"><span unselectable="on" class="step-controls"><span class="step-up"></span><span class="step-down"></span></span></span>').insertAfter(this.element),typeof l[this.type].start=="object"&&(l[this.type].start=this.asNumber(l[this.type].start));for(t=0;t<i.length;t++)this[i[t]](this.options[i[t]]);var n=this.element.attr("autocomplete","off").data("wsspinner",this);this.addBindings(),this._init=!0},parseValue:function(e){return f[this.type](e)},formatValue:function(e){return a[this.type](e,this.options)},placeholder:function(e){var t;this.options.placeholder=e,this.type=="date"&&(t=(e||"").split("-"),t.length==3&&(this.options.placeholder=o.patterns.d.replace("yy",t[0]).replace("mm",t[1]).replace("dd",t[2]))),this.element.prop("placeholder",this.options.placeholder)},addZero:u,_setStartInRange:function(){var e=l[this.type].start||0;!isNaN(this.minAsNumber)&&e<this.minAsNumber?e=this.minAsNumber:!isNaN(this.maxAsNumber)&&e>this.maxAsNumber&&(e=this.maxAsNumber),this.elemHelper.prop("valueAsNumber",e).prop("value"),this.options.defValue=this.elemHelper.prop("value")},value:function(e){this.valueAsNumber=this.asNumber(e),this.options.value=e,isNaN(this.valueAsNumber)?this._setStartInRange():this.elemHelper.prop("value",e),this.element.prop("value",a[this.type](e,this.options))},list:function(e){this.options.options=e||{}},readonly:function(e){this.options.readonly=!!e,this.element.prop("readonly",this.options.readonly),(this.options.readonly||this._init)&&this.buttonWrapper[this.options.readonly?"addClass":"removeClass"]("ws-readonly")},disabled:function(e){this.options.disabled=!!e,this.element.prop("disabled",this.options.disabled),(this.options.disabled||this._init)&&this.buttonWrapper[this.options.readonly?"addClass":"removeClass"]("ws-disabled")},tabindex:function(e){this.options.tabindex=e,this.element.prop("tabindex",this.options.tabindex)},title:function(e){this.options.title=e,this.element.prop("tabindex",this.options.title)},min:function(e){this.elemHelper.prop("min",e),this.minAsNumber=this.asNumber(e),this.valueAsNumber!=null&&isNaN(this.valueAsNumber)&&this._setStartInRange()},max:function(e){this.elemHelper.prop("max",e),this.maxAsNumber=this.asNumber(e),this.valueAsNumber!=null&&isNaN(this.valueAsNumber)&&this._setStartInRange()},step:function(e){var t=l[this.type];this.elemHelper.prop("step",n(e,t.step))},addBindings:function(){var n,i=this,s=this.options,u=function(){var t={};return{init:function(n,r,s){t[n]||(t[n]={fn:s},e(i.orig).on(n,function(){t[n].val=e.prop(i.orig,"value")})),t[n].val=r},call:function(e,n){t[e]&&t[e].val!=n&&(clearTimeout(t[e].timer),t[e].val=n,t[e].timer=setTimeout(function(){t[e].fn(n,i)},0))}}}(),a={},l=function(e){if(l.prevent)return e.preventDefault(),i.element.focus(),e.stopImmediatePropagation(),!0},c=function(){return!s.disabled&&!n&&i.element[0].focus(),l.set(),!1};l.set=function(){var e,t=function(){l.prevent=!1};return function(){clearTimeout(e),l.prevent=!0,setTimeout(t,9)}}(),["stepUp","stepDown"].forEach(function(e){a[e]=function(t){if(!s.disabled&&!s.readonly){n||c();var r=!1;t||(t=1);try{i.elemHelper[e](t),r=i.elemHelper.prop("value"),i.value(r),u.call("input",r)}catch(o){}return r}}}),this.buttonWrapper.on("mousedown",c),this.setChange=function(e){i.value(e),u.call("input",e),u.call("change",e)},this.element.on({blur:function(t){!l(t)&&!s.disabled&&!s.readonly&&(u.call("input",e.prop(i.orig,"value")),u.call("change",e.prop(i.orig,"value")),l.prevent||(n=!1))},focus:function(){u.init("input",e.prop(i.orig,"value"),i.options.input),u.init("change",e.prop(i.orig,"value"),i.options.change),n=!0},change:function(){var t=f[i.type](e.prop(this,"value"));e.prop(i.orig,"value",t),u.call("input",t),u.call("change",t)},mousewheel:function(e,t){t&&n&&!s.disabled&&(a[t>0?"stepUp":"stepDown"](),e.preventDefault())},keypress:function(e){var t,n=!0,r=e.keyCode;r==38?a.stepUp():r==40?a.stepDown():!e.ctrlKey&&!e.metaKey&&o[i.type+"Signs"]?(t=String.fromCharCode(e.charCode==null?r:e.charCode),n=!(t<" "||(o[i.type+"Signs"]+"0123456789").indexOf(t)>-1)):n=!1,n&&e.preventDefault()}}),e(r).on("wslocalechange",function(){i.value(i.options.value)}),e(".step-up",this.buttonWrapper).on({"mousepressstart mousepressend":t,"mousedown mousepress":function(e){a.stepUp()}}),e(".step-down",this.buttonWrapper).on({"mousepressstart mousepressend":t,"mousedown mousepress":function(e){a.stepDown()}})}};e.fn.spinbtnUI=function(t){return t=e.extend({monthNames:"monthNamesShort",size:1,startAt:0,selectNav:!1,openOnFocus:!1},t),this.each(function(){e.webshims.objectCreate(h,{element:{value:e(this)}},t)})}}(),function(){var n={},i={},s=function(e){return[e.getFullYear(),u(e.getMonth()+1),u(e.getDate())]},a=s(new Date);n.getYearList=function(e,t){var r,i,s,o,u,f,l,c,h;e=e[0]*1;var p=t.options.size||1,d=e%(12*p),v=e-d,m=t.options.max.split("-"),g=t.options.min.split("-"),y=t.options.value.split("-"),b=0,w="";for(r=0;r<p;r++){r?v+=12:f=n.isInRange([v-1],m,g)?{"data-action":"setYearList",value:v-1}:!1,w+='<div class="year-list"><h3>'+v+" - "+(v+11)+"</h3>",u=[];for(i=0;i<12;i++)s=v+i,h=[],n.isInRange([s],m,g)?(o="",b++):o=' disabled="disabled"',s==a[0]&&h.push("this-year"),y[0]==s&&h.push("selected-value"),c=h.length?' class="'+h.join(" ")+'"':"",u.push('<li><button type="button"'+o+c+' data-action="setMonthList" value="'+s+'">'+s+"</button></li>");r==p-1&&(l=n.isInRange([s+1],m,g)?{"data-action":"setYearList",value:s+1}:!1),w+='<ul class="year-list">'+u.join("")+"</ul></div>"}return{enabled:b,main:w,next:l,prev:f}},n.getMonthList=function(e,t){var r,i,s,u,f,l,c,h,p,d,v,m=t.options.size||1,g=t.options.max.split("-"),y=t.options.min.split("-"),b=t.options.value.split("-"),w=0,E="";e=e[0]-Math.floor((m-1)/2);for(r=0;r<m;r++){r?e++:h=n.isInRange([e-1],g,y)?{"data-action":"setMonthList",value:e-1}:!1,r==m-1&&(p=n.isInRange([e+1],g,y)?{"data-action":"setMonthList",value:e+1}:!1),l=[],!n.isInRange([e,"01"],g,y)&&!n.isInRange([e,"12"],g,y)?(f=' disabled="disabled"',c=!0):(c=!1,f=""),E+='<div class="month-list">',E+=t.options.selectNav?'<select data-action="setMonthList">'+n.createYearSelect(e,g,y).join("")+"</select>":'<button data-action="setYearList"'+f+' value="'+e+'">'+e+"</button>";for(i=0;i<12;i++)u=o.date.monthkeys[i+1],s=o.date.monthNames[i],v=[],c||!n.isInRange([e,u],g,y)?f=' disabled="disabled"':(f="",w++),e==a[0]&&a[1]==u&&v.push("this-month"),b[0]==e&&b[1]==u&&v.push("selected-value"),d=v.length?' class="'+v.join(" ")+'"':"",l.push('<li><button type="button"'+f+d+' data-action="'+(t.type=="month"?"changeInput":"setDayList")+'" value="'+e+"-"+u+'">'+s+"</button></li>");E+="<ul>"+l.join("")+"</ul></div>"}return{enabled:w,main:E,prev:h,next:p}},n.getDayList=function(e,t){var r,i,u,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N=t.options.size||1,C=t.options.max.split("-"),k=t.options.min.split("-"),L=t.options.value.split("-"),A=o.date[t.options.monthNames]||o.date.monthNames,O=0,M=[],_=new Date(e[0],e[1]-1,1);_.setMonth(_.getMonth()-Math.floor((N-1)/2));for(r=0;r<N;r++){g=_.getMonth(),r||(x=new Date(_.getTime()),x.setDate(-1),w=s(x),d=n.isInRange(w,C,k)?{"data-action":"setDayList",value:w[0]+"-"+w[1]}:!1),w=s(_),M.push('<div class="day-list">'),t.options.selectNav?(E=['<select data-action="setDayList">'+n.createMonthSelect(w,C,k,A).join("")+"</select>",'<select data-action="setDayList">'+n.createYearSelect(w[0],C,k,"-"+w[1]).join("")+"</select>"],o.date.showMonthAfterYear&&E.reverse(),M.push(E.join(" "))):(E=[A[w[1]*1-1],w[0]],o.date.showMonthAfterYear&&E.reverse(),M.push('<button data-action="setMonthList" value="'+w[0]+"-"+w[1]+'">'+E.join(" ")+"</button>")),M.push("<table><tr>");for(u=1;u<o.date.dayNamesShort.length;u++)M.push("<th>"+o.date.dayNamesShort[u]+"</th>");M.push("<th>"+o.date.dayNamesShort[0]+"</th>"),M.push("</tr><tr>");for(i=0;i<46;i++){m=i&&!(i%7),y=_.getMonth(),b=g!=y,T=[];if(m&&b){M.push("</tr>");break}m&&M.push("</tr><tr>"),i||(f=_.getDay()-1,f>-1&&f<6&&_.setDate(_.getDate()-f),y=_.getMonth(),b=g!=y),w=s(_),S='<td><button data-action="changeInput" value="'+w.join("-")+'"',b&&T.push("othermonth"),w[0]==a[0]&&a[1]==w[1]&&a[2]==w[2]&&T.push("this-day"),L[0]==w[0]&&w[1]==L[1]&&w[2]==L[2]&&T.push("selected-value"),T.length&&(S+=' class="'+T.join(" ")+'"'),n.isInRange(w,C,k)||(S+=' disabled=""'),M.push(S+">"+_.getDate()+"</button></td>"),_.setDate(_.getDate()+1)}M.push("</table></div>"),r==N-1&&(w=s(_),w[2]=1,v=n.isInRange(w,C,k)?{"data-action":"setDayList",value:w[0]+"-"+w[1]}:!1)}return{enabled:9,main:M.join(""),prev:d,next:v}},n.isInRange=function(e,t,n){var r,i=!0;for(r=0;r<e.length;r++){if(n[r]&&n[r]>e[r]){i=!1;break}if(!n[r]||n[r]!=e[r])break}if(i)for(r=0;r<e.length;r++){if(t[r]&&t[r]<e[r]){i=!1;break}if(!t[r]||t[r]!=e[r])break}return i},n.createMonthSelect=function(e,t,r,i){i||(i=o.date.monthNames);var s,a=0,f=[],l=e[1]-1;for(;a<i.length;a++)s=l==a?' selected=""':"",(s||n.isInRange([e[0],a+1],t,r))&&f.push('<option value="'+e[0]+"-"+u(a+1)+'"'+s+">"+i[a]+"</option>");return f},n.createYearSelect=function(e,t,r,i){var s,o=!0,u=!0,a=['<option selected="">'+e+"</option>"],f=0;i||(i="");while(f<8&&(o||u))f++,s=e-f,o&&n.isInRange([s],t,r)?a.unshift('<option value="'+(s+i)+'">'+s+"</option>"):o=!1,s=e+f,u&&n.isInRange([s],t,r)?a.push('<option value="'+(s+i)+'">'+s+"</option>"):u=!1;return a};var f={changeInput:function(e,t,n){n.setChange(e),t.hide()}};(function(){var t=function(e){return"get"+e+"List"},r={date:"Day",week:"Day",month:"Month"};e.each({setYearList:["Year","Month","Day"],setMonthList:["Month","Day"],setDayList:["Day"]},function(i,s){var o=s.map(t);f[i]=function(t,i,u,a){var f=t.split("-");a||(a=0),e.each(o,function(e,t){if(e>=a){var o=n[t](f,u);if(f.length<2||o.enabled>1||r[u.type]===s[e])return i.bodyElement.html(o.main),o.prev?i.prevElement.attr(o.prev).prop({disabled:!1}):i.prevElement.removeAttr("data-action").prop({disabled:!0}),o.next?i.nextElement.attr(o.next).prop({disabled:!1}):i.nextElement.removeAttr("data-action").prop({disabled:!0}),!1}})}})})(),n.commonInit=function(t,n){t.list=function(r){var i=this.options,s=[];i.options=r||{},e("div.ws-options",n.contentElement).remove(),e.each(i.options,function(e,n){s.push('<li><button value="'+e+'" data-action="changeInput">'+(n||t.formatValue(e))+"</button></li>")}),s.length&&n.bodyElement.after('<div class="ws-options"><ul>'+s.join("")+"</ul></div>")},n.contentElement.html('<button class="ws-prev"></button><button class="ws-next"></button><div class="ws-picker-body"></div><div class="ws-button-row"><button type="button" class="ws-current" data-text="current"></button> <button type="button" data-text="empty" class="ws-empty"></button></div>'),n.nextElement=e("button.ws-next",n.contentElement),n.prevElement=e("button.ws-prev",n.contentElement),n.bodyElement=e("div.ws-picker-body",n.contentElement),n.buttonRow=e("div.ws-button-row",n.contentElement),e(r).onTrigger("wslocalechange",function(){n.nextElement.text(o.date.nextText),n.prevElement.text(o.date.prevText),e("button",n.buttonRow).each(function(){e(this).text(e(this).data("text"))})}),t.list(t.options.options)},n.month=function(r){var i=t.objectCreate(t.wsPopover,{},{prepareFor:r.element}),s=e('<span class="popover-opener" />').appendTo(r.buttonWrapper),o=r.options,u=!1,a=function(){var n=e(this).attr("data-action");return f[n]?f[n](e(this).val(),i,r):t.warn("no action for "+n),!1},l=function(){!o.disabled&&!o.readonly&&(u||(n.commonInit(r,i),f.setYearList(o.value||o.defValue,i,r,r.options.startAt)),u=!0,i.show(r.element))};i.element.addClass(r.type+"-popover"),i.contentElement.on("click","button[data-action]",a).on("change","select[data-action]",a),s.on("mousedown",l),r.element.on({focus:function(){r.options.openOnFocus&&l()},mousedown:function(){r.element.is(":focus")&&l()}})},n.date=n.month,t.picker=n}(),function(){var n=Modernizr.inputtypes,i,o={},u=["disabled","readonly","value","min","max","step","title","placeholder"],a=["tabindex","data-placeholder"],f=function(e){};e.each(u.concat(a),function(e,n){var r=n.replace(/^data\-/,"");t.onNodeNamesPropertyModify("input",n,function(e){if(!i){var n=t.data(this,"shadowData");n&&n.data&&n.nativeElement===this&&n.data[r]&&n.data[r](e)}})});var l=function(){return function(t,n){o[t]=n,n.attrs=e.merge([],a,n.attrs),n.props=e.merge([],u,n.props)}}(),c=function(t,n){var r=e.prop(t,"list"),i={},s,o;return r&&e("option",r).each(function(){i[e.prop(this,"value")]=e.prop(this,"label")}),n&&(o=function(){n.shim&&(clearTimeout(s),s=setTimeout(function(){n.shim.list(c(t))},9))},e(r).on("updateDatalist",o),e(t).on("listdatalistchange",o)),i},h=function(e){e.stopImmediatePropagation(e)},p=function(){return e.css(this,"display")!="none"},d=function(t){var n,i=function(){e.style(t.orig,"display","");var r=.6;if(!n||t.orig.offsetWidth)t.element.css({marginLeft:e.css(t.orig,"marginLeft"),marginRight:e.css(t.orig,"marginRight")}),t.buttonWrapper&&t.buttonWrapper.filter(p).length&&(t.element.css({paddingRight:""}),(parseInt(t.buttonWrapper.css("marginLeft"),10)||0)<0?t.element.css({paddingRight:""}).css({paddingRight:(parseInt(t.element.css("paddingRight"),10)||0)+t.buttonWrapper.outerWidth()}):r=t.buttonWrapper.outerWidth(!0)+.6),t.element.outerWidth(e(t.orig).outerWidth()-r);n=!0,e.style(t.orig,"display","none")};e(r).onTrigger("updateshadowdom",i)},v=function(){var n=e.prop(this,"type"),r,f,l,p,v;if(o[n]){l={},p=n,f=e.extend({},s[n],e(e.prop(this,"form")).data(n)||{},e(this).data(n)||{},{orig:this,type:n,options:c(this,l),input:function(e){f._change(e,"input")},change:function(e){f._change(e,"change")},_change:function(t,n){i=!0,e.prop(f.orig,"value",t),i=!1,n&&e(f.orig).trigger(n)}});for(r=0;r<u.length;r++)f[u[r]]=e.prop(this,u[r]);for(r=0;r<a.length;r++)p=a[r].replace(/^data\-/,""),f[p]||(f[p]=e.attr(this,a[r]));l.shim=o[n]._create(f),t.addShadowDom(this,l.shim.element,{data:l.shim||{}}),e(this).on("change",function(t){!i&&t.originalEvent&&l.shim.value(e.prop(this,"value"))}),l.shim.element.on("change input",h),l.shim.element.on("focusin focusout",function(t){t.stopImmediatePropagation(t),e(f.orig).trigger(t)}),l.shim.element.on("focus blur",function(t){t.stopImmediatePropagation(t),e(f.orig).triggerHandler(t)}),v=f.calculateWidth!=null?f.calculateWidth:s.calculateWidth,v&&d(l.shim),e(this).css({display:"none"})}};(!n.range||s.replaceUI)&&l("range",{_create:function(t,n){return e("<span />").insertAfter(t.orig).rangeUI(t).data("rangeUi")}}),["number","time","month","date"].forEach(function(r){(!n[r]||s.replaceUI)&&l(r,{_create:function(n,i){var s=e('<input class="ws-'+r+'" type="text" />').insertAfter(n.orig).spinbtnUI(n).data("wsspinner");return t.picker&&t.picker[r]&&t.picker[r](s),s.buttonWrapper.addClass("input-button-size-"+s.buttonWrapper.children().filter(p).length),s}})}),t.addReady(function(t,n){e("input",t).add(n.filter("input")).each(v)})}()});