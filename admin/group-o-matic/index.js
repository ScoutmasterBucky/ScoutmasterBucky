function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var a,n,i,s,o=[],u=!0,c=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(a=i.call(r)).done)&&(o.push(a.value),o.length!==t);u=!0);}catch(e){c=!0,n=e}finally{try{if(!u&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(c)throw n}}return o}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,_toPropertyKey(a.key),a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:e+""}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}function _createForOfIteratorHelper(e,t){var r,a,n,i,s="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(s)return n=!(a=!0),{s:function(){s=s.call(e)},n:function(){var e=s.next();return a=e.done,e},e:function(e){n=!0,r=e},f:function(){try{a||null==s.return||s.return()}finally{if(n)throw r}}};if(Array.isArray(e)||(s=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return s&&(e=s),i=0,{s:t=function(){},n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r={}.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=Array(t);r<t;r++)a[r]=e[r];return a}var ROUTE_RESTART="/restart",ROUTE_REPORT="/report",ROUTE_START="/start",ROUTE_CONFIGURE="/configure",ROUTE_SEARCH="/search",SS_CSV="csv",SS_SESSIONS="sessions",SS_PARAMS="params",ACTIONS={N:"Do not weigh groupings with this field",M:"Matching values in the group",D:"Distance from the mean numerical value",S:"Distance from the mean, squared"};function parseCsv(e){return Papa.parse(e,{dynamicTyping:!0,header:!0})}function parseNumber(e){var t=parseInt(e);return t==t?t:e}function getFieldData(e,t,r,a){var n,i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,o=0,u=0,c=_createForOfIteratorHelper(r);try{for(c.s();!(n=c.n()).done;){var l=n.value[t];"number"==typeof l&&(l<i&&(i=l),s<l&&(s=l),o+=l,u+=1)}}catch(e){c.e(e)}finally{c.f()}return{index:e,name:t,min:i,max:s,sum:o,mean:o/u,numericalValues:u,action:getParam("f".concat(e,"a"),"N",Object.keys(ACTIONS)),weight:getParam("f".concat(e,"w"),0)}}function getParam(e,t,r){e=m.route.param(e);return r?-1===r.indexOf(e)?t:e:void 0!==e&&(r=parseInt(e))==r?r:t}var Restart={render:function(){sessionStorage.getItem(SS_SESSIONS)?m.route.set(ROUTE_REPORT):sessionStorage.getItem(SS_CSV)?m.route.set(ROUTE_CONFIGURE):m.route.set(ROUTE_START)}},Start=(()=>_createClass(function e(){_classCallCheck(this,e),sessionStorage.removeItem(SS_CSV)},[{key:"dragEnter",value:function(e){e.stopPropagation(),e.preventDefault()}},{key:"dragOver",value:function(e){e.stopPropagation(),e.preventDefault()}},{key:"drop",value:function(e){e.stopPropagation(),e.preventDefault();e=e.dataTransfer.files;e[0]?this.read(e[0]):alert("No files were dragged to the page - try again and wait a couple seconds before letting go")}},{key:"read",value:function(e){var r=new FileReader;r.onabort=function(){alert("Read aborted")},r.onerror=function(){alert("Read error")},r.onload=function(){var e=r.result.replace(/\r/g,"\n").replace(/\n\n+/g,"\n").replace(/$/,"\n").replace(/\n(( *,)+\n)+/g,"\n").replace(/\n+$/,""),t=(console.log(e),Papa.parse(e,{dynamicTyping:!0,header:!0}));t.errors.length?(alert("Error parsing CSV file"),console.log(t.errors)):(sessionStorage.setItem(SS_CSV,e),m.route.set(ROUTE_CONFIGURE))},r.readAsText(e)}},{key:"view",value:function(){var t=this;return[m("div",{class:"Bdw(3px) Bdc(#7f7f7f) Bds(da) P(1em)",ondragenter:function(e){return t.dragEnter(e)},ondragover:function(e){return t.dragOver(e)},ondrop:function(e){return t.drop(e)}},[m("p","Drag CSV of participants here to start grouping")]),m("p","The CSV file will be scanned for fields that you can use to make your groupings.")]}}]))(),Configure=(()=>_createClass(function e(){var t=this,r=(_classCallCheck(this,e),sessionStorage.getItem(SS_CSV)),r=(this.parsed=parseCsv(r),this.participants=this.parsed.data.length,_toConsumableArray(this.parsed.meta.fields.entries()));this.fields=r.map(function(e){return getFieldData((e=_slicedToArray(e,2))[0],e[1],t.parsed.data)}),this.sessions=getParam("s",1),this.groups=getParam("g",1),this.newPeopleWeight=getParam("np",1),this.calculate(),this.setRouteParams()},[{key:"getParams",value:function(){var e,t={s:this.sessions,g:this.groups,np:this.newPeopleWeight},r=_createForOfIteratorHelper(this.fields);try{for(r.s();!(e=r.n()).done;){var a=e.value;t["f".concat(a.index,"a")]=a.action,t["f".concat(a.index,"w")]=a.weight}}catch(e){r.e(e)}finally{r.f()}return t}},{key:"setRouteParams",value:function(){m.route.set(ROUTE_CONFIGURE,this.getParams(),!0)}},{key:"setGroups",value:function(e){this.groups=parseNumber(e),this.setRouteParams(),this.calculate()}},{key:"setNewPeople",value:function(e){this.newPeopleWeight=parseNumber(e),this.setRouteParams(),this.calculate()}},{key:"setSessions",value:function(e){this.sessions=parseNumber(e),this.setRouteParams(),this.calculate()}},{key:"isValidGroupInput",value:function(){return!("number"!=typeof this.groups||this.groups<1||"number"!=typeof this.sessions||this.sessions<1)}},{key:"calculate",value:function(){var e;this.isValidGroupInput()?(e=this.participants/this.groups,this.participantsPerGroupMax=Math.ceil(e),this.participantsPerGroupMin=Math.floor(e)):(this.participantsPerGroupMax=null,this.participantsPerGroupMin=null)}},{key:"showParticipantsPerGroup",value:function(){return this.participantsPerGroupMax===this.participantsPerGroupMin?this.participantsPerGroupMax:"".concat(this.participantsPerGroupMin," - ").concat(this.participantsPerGroupMax)}},{key:"startSearch",value:function(){m.route.set(ROUTE_SEARCH,this.getParams())}},{key:"view",value:function(){var t=this;return[m(m.route.Link,{href:ROUTE_START},"Start over"),m("table",[m("tr",[m("td","Number of Sessions"),m("input[type=text]",{class:"W(3em)",value:this.sessions,oninput:function(e){return t.setSessions(e.target.value)}})]),m("tr",[m("td","Number of Groups"),m("input[type=text]",{class:"W(3em)",value:this.groups,oninput:function(e){return t.setGroups(e.target.value)}})]),m("tr",[m("td","Weight for new people in a group"),m("input[type=text]",{class:"W(3em)",value:this.newPeopleWeight,oninput:function(e){return t.setNewPeople(e.target.value)}})])]),m("hr"),m("table",[m("tr",[m("td","Number of Participants"),this.participants]),m("tr",[m("td","Participants per Group"),this.showParticipantsPerGroup()])]),m("hr"),m("table",[m("tr",[m("th","Field Name"),m("th","Mapping"),m("th","Weight")]),this.fields.map(function(e){return t.viewField(e)})]),m("div",m("button",{disabled:!this.isValidGroupInput(),onclick:function(){return t.startSearch()}},"Start Searching For Good Groupings")),m("p","When matching values in a group, the weight is applied for each match. So, if your group had A B B C C, it would get the score of (weight * 2) because of the B+B and C+C pairs. If you want items to not match, use a negative weight."),m("p","The distance from the mean numerical value is a sum of each member of the group and how far it is off from the mean. This sum is then scored as (weight * sum). This score can also be squared on a per-member basis, which provides tighter grouping. The distance calculations will skip comparisons against empty values."),m("p","Positive weights mean you want that type of mapping to happen. Negative weights will try to avoid that type of mapping. Empty or non-weighted items are skipped.")]}},{key:"viewField",value:function(r){var t=this;return m("tr",[m("td",r.name),m("td",m("select",{value:r.action,onchange:function(e){r.action=e.target.value,t.setRouteParams()}},Object.entries(ACTIONS).map(function(e){var e=_slicedToArray(e,2),t=e[0];return m("option",{value:t,selected:r.action===t},e[1])}))),m("td",m("input[type=text]",{class:"W(3em)",value:r.weight,oninput:function(e){r.weight=parseNumber(e.target.value),t.setRouteParams()}}))])}}]))(),Search=(()=>_createClass(function e(){var t=this,r=(_classCallCheck(this,e),sessionStorage.getItem(SS_CSV)),r=(this.parsed=parseCsv(r),this.participants=this.parsed.data.length,_toConsumableArray(this.parsed.meta.fields.entries()));this.fields=r.map(function(e){return getFieldData((e=_slicedToArray(e,2))[0],e[1],t.parsed.data)}),this.sessions=getParam("s",1),this.groups=getParam("g",1),this.newPeopleWeight=getParam("np",1),this.attempts=0,this.bestScore=Number.NEGATIVE_INFINITY,this.bestSeries=null,this.scheduleNextAttempt()},[{key:"scheduleNextAttempt",value:function(){var t=this;setTimeout(function(){for(var e=Date.now();Date.now()-e<45&&t.attempts<25e4;)t.attemptNewGroupings();m.redraw(),t.attempts<25e4&&t.scheduleNextAttempt()})}},{key:"attemptNewGroupings",value:function(){this.attempts+=1;var e=new Series(this.sessions,this.groups,this.parsed.data,this.fields,this.newPeopleWeight),t=e.getScore();this.bestScore<t&&(this.bestScore=t,this.bestSeries=e)}},{key:"getParams",value:function(){var e,t={s:this.sessions,g:this.groups,np:this.newPeopleWeight},r=_createForOfIteratorHelper(this.fields);try{for(r.s();!(e=r.n()).done;){var a=e.value;t["f".concat(a.index,"a")]=a.action,t["f".concat(a.index,"w")]=a.weight}}catch(e){r.e(e)}finally{r.f()}return t}},{key:"commit",value:function(){sessionStorage.setItem(SS_PARAMS,m.buildQueryString(this.getParams())),sessionStorage.setItem(SS_SESSIONS,JSON.stringify(this.bestSeries.toData(this.parsed.data))),m.route.set(ROUTE_REPORT)}},{key:"view",value:function(){var e=this;return[m("div",[m(m.route.Link,{href:ROUTE_START},"Start over")," - ",m(m.route.Link,{href:ROUTE_CONFIGURE+"?"+m.buildQueryString(this.getParams())},"Reconfigure")]),m("table",[m("tr",[m("td","Best Total Score"),m("td",this.bestScore)]),m("tr",[m("td","Attempts"),m("td",this.attempts)])]),m("div",m("button",{onclick:function(){return e.commit()}},"Commit Groupings")),this.bestSeries?this.bestSeries.view():null]}}]))(),Series=(()=>_createClass(function e(t,r,a,n,i){_classCallCheck(this,e),_defineProperty(this,"sessions",[]),_defineProperty(this,"dataMap",new Map),this.newPeopleWeight=i;for(var s=0;s<a.length;s+=1)this.dataMap.set(a[s],s);for(;this.sessions.length<t;)this.sessions.push(new Session(this.sessions.length+1,r,a,n))},[{key:"toData",value:function(t){return this.sessions.map(function(e){return e.toData(t)})}},{key:"getScore",value:function(){var r=this;return this.sessions.reduce(function(e,t){return e+t.getScore(r)},this.scoreNewPeople())}},{key:"scoreNewPeople",value:function(){var e,t=new Map,r=_createForOfIteratorHelper(this.sessions);try{for(r.s();!(e=r.n()).done;){var a,n=_createForOfIteratorHelper(e.value.groups);try{for(n.s();!(a=n.n()).done;)for(var i=a.value,s=i.members.length,o=0;o<s;o+=1)for(var u=this.dataMap.get(i.members[o]),c=o+1;c<s;c+=1){var l=this.dataMap.get(i.members[c]),p=u<l?"".concat(u," ").concat(l):"".concat(l," ").concat(u);t.set(p,!0)}}catch(e){n.e(e)}finally{n.f()}}}catch(e){r.e(e)}finally{r.f()}return t.size*this.newPeopleWeight}},{key:"view",value:function(){return[m("p","Series: ".concat(this.getScore()," overall, ").concat(this.scoreNewPeople()," for new people")),this.sessions.map(function(e){return e.view()})]}}]))(),Session=(()=>_createClass(function e(t,r,a,n){_classCallCheck(this,e),_defineProperty(this,"groups",[]),this.sessionNumber=t,this.fields=n;for(var i=_toConsumableArray(a);this.groups.length<r;)this.groups.push(this.makeGroup(i,r-this.groups.length))},[{key:"toData",value:function(t){return this.groups.map(function(e){return e.toData(t)})}},{key:"makeGroup",value:function(e,t){for(var r=e.length/t,a=new Group(this.groups.length+1,this.fields);0<r;){var n=Math.floor(Math.random()*e.length),n=e.splice(n,1);a.addMember(n[0]),--r}return a}},{key:"getScore",value:function(){return this.groups.reduce(function(e,t){return e+t.getScore()},0)}},{key:"view",value:function(){return[m("p",{class:"Fw(b)"},"Session ".concat(this.sessionNumber,": ").concat(this.getScore())),m("div",{class:"Pstart(1em)"},this.groups.map(function(e){return e.view()}))]}}]))(),Group=(()=>_createClass(function e(t,r){_classCallCheck(this,e),_defineProperty(this,"members",[]),this.groupNumber=t,this.fields=r},[{key:"toData",value:function(t){return this.members.map(function(e){return t.indexOf(e)})}},{key:"addMember",value:function(e){this.members.push(e)}},{key:"getScore",value:function(){var r=this;return Object.values(this.fields).reduce(function(e,t){return e+r.scoreField(t)},0)}},{key:"scoreField",value:function(e){if(0!==e.weight&&"N"!==e.action)switch(e.action){case"M":return this.scoreFieldMatching(e);case"D":return this.scoreFieldDistance(e,!1);case"S":return this.scoreFieldDistance(e,!0)}return 0}},{key:"scoreFieldMatching",value:function(e){for(var t=0,r=this.members.length,a=0;a<r;a+=1)for(var n=this.members[a],i=a+1;i<r;i+=1){var s=this.members[i];n[e.name]===s[e.name]&&(t+=1)}return t*e.weight}},{key:"scoreFieldDistance",value:function(e,t){var r,a=0,n=0,i=_createForOfIteratorHelper(this.members);try{for(i.s();!(r=i.n()).done;){var s=r.value[e.name];"number"==typeof s&&(a+=s,n+=1)}}catch(e){i.e(e)}finally{i.f()}var o,u=a/n,c=0,l=_createForOfIteratorHelper(this.members);try{for(l.s();!(o=l.n()).done;){var p,m=o.value[e.name];"number"==typeof m&&(p=Math.abs(u-m)*e.weight,c+=t?p*p*(p<0?-1:1):p)}}catch(e){l.e(e)}finally{l.f()}return c}},{key:"view",value:function(){var t=this;return[m("p","Group ".concat(this.groupNumber,": ").concat(this.getScore())),m("table",[this.viewFieldHeadings(),this.members.map(function(e){return t.viewMember(e)})])]}},{key:"viewFieldHeadings",value:function(){return m("tr",[Object.values(this.fields).map(function(e){return m("th",e.name)})])}},{key:"viewMember",value:function(t){return m("tr",[Object.values(this.fields).map(function(e){return m("td",t[e.name])})])}}]))(),Report=(()=>_createClass(function e(){_classCallCheck(this,e);var t=sessionStorage.getItem(SS_CSV);this.parsed=parseCsv(t),this.sessions=JSON.parse(sessionStorage.getItem(SS_SESSIONS)),this.paramsQueryString=sessionStorage.getItem(SS_PARAMS),this.labels={},this.groupsForParticipant=this.buildGroupsForParticipant();for(var r=0;r<this.sessions.length;r+=1)for(var a=0;a<this.sessions[r].length;a+=1){var n="".concat(r,"_").concat(a);this.labels[n]=m.route.param(n)||""}},[{key:"buildGroupsForParticipant",value:function(){var e,u=this,c=new Map,t=_createForOfIteratorHelper(this.parsed.data);try{for(t.s();!(e=t.n()).done;){var r=e.value;c.set(r,[])}}catch(e){t.e(e)}finally{t.f()}return _toConsumableArray(this.sessions.entries()).forEach(function(e){var e=_slicedToArray(e,2),o=e[0];_toConsumableArray(e[1].entries()).forEach(function(e){var t,e=_slicedToArray(e,2),r=e[0],e=e[1],a="".concat(o,"_").concat(r),n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var i=t.value,s=u.parsed.data[i];(c.get(s)||[]).push(a)}}catch(e){n.e(e)}finally{n.f()}})}),c}},{key:"updateRoute",value:function(){m.route.set(ROUTE_REPORT,this.labels,!0)}},{key:"view",value:function(){return[m("div",{class:"D(n)--p"},[m(m.route.Link,{href:ROUTE_START},"Start over")," - ",m(m.route.Link,{href:ROUTE_CONFIGURE+"?"+this.paramsQueryString},"Reconfigure")]),m("div",{class:"D(n)--p"},this.viewSessionLabels()),this.viewParticipantReport(),this.viewGroupLabelSummary(),this.viewSessionLeaderReports()]}},{key:"viewSessionLabels",value:function(){var r=this;return _toConsumableArray(this.sessions.entries()).map(function(e){var e=_slicedToArray(e,2),t=e[0],e=e[1];return[m("p",{class:"Fw(b)"},"Session ".concat(t+1)),m("table",r.viewGroupLabels(t,e))]})}},{key:"viewGroupLabels",value:function(r,e){var a=this;return _toConsumableArray(e.entries()).map(function(e){var e=_slicedToArray(e,2),e=e[0],t="".concat(r,"_").concat(e);return m("tr",[m("td","Group ".concat(e+1)),m("td",m("input[type=text]",{class:"W(6em)",value:a.labels[t]||"",oninput:function(e){a.labels[t]=e.target.value,a.updateRoute()}}))])})}},{key:"viewParticipantReport",value:function(){return[m("h1","Participants"),this.viewMembers(this.parsed.data)]}},{key:"viewGroupLabelSummary",value:function(){var r=this,e=_toConsumableArray(this.sessions.entries()).map(function(e){return e[0]}),t=_toConsumableArray(this.sessions[0].entries()).map(function(e){return e[0]});return[m("h1","Group Labels"),m("table",[m("tr",[m("td"),e.map(function(e){return m("th","Session ".concat(e+1))})]),t.map(function(t){return m("tr",[m("th","Group ".concat(t+1)),e.map(function(e){return m("td",r.labels["".concat(e,"_").concat(t)])})])})])]}},{key:"viewMembers",value:function(e){var r=this,a=this.parsed.meta.fields;return m("table",[m("tr",[a.map(function(e){return m("th",e)}),m("th","Groups")]),e.map(function(t){return m("tr",[a.map(function(e){return m("td",t[e])}),m("td",r.getGroupLabelsForParticipant(t))])})])}},{key:"getGroupLabelsForParticipant",value:function(e){var t=this;return this.groupsForParticipant.get(e).map(function(e){return t.labels[e]}).join(" ")}},{key:"viewSessionLeaderReports",value:function(){var e,r=this,t=[],a=_createForOfIteratorHelper(this.sessions);try{for(a.s();!(e=a.n()).done;){var n,i=_createForOfIteratorHelper(e.value.entries());try{for(i.s();!(n=i.n()).done;){var s=_slicedToArray(n.value,2),o=s[0],u=s[1];t[o]||(t[o]=[]),t[o].push(u)}}catch(e){i.e(e)}finally{i.f()}}}catch(e){a.e(e)}finally{a.f()}return _toConsumableArray(t.entries()).map(function(e){var e=_slicedToArray(e,2),t=e[0];return r.viewSessionLeaderReport(t,e[1])})}},{key:"viewSessionLeaderReport",value:function(r,e){var a=this;return m("div",{style:"page-break-before: always"},[m("h1","Sessions for Group ".concat(r+1)),_toConsumableArray(e.entries()).map(function(e){var e=_slicedToArray(e,2),t=e[0];return a.viewSessionReport(t,r,e[1])})])}},{key:"viewSessionReport",value:function(e,t,r){var a=this,t="".concat(e,"_").concat(t),r=r.map(function(e){return a.parsed.data[e]});return[m("p","Session ".concat(e+1,": ").concat(this.labels[t])),this.viewMembers(r)]}}]))();window.addEventListener("load",function(){m.route(document.getElementById("module"),ROUTE_RESTART,_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({},ROUTE_RESTART,Restart),ROUTE_START,Start),ROUTE_CONFIGURE,Configure),ROUTE_SEARCH,Search),ROUTE_REPORT,Report))});