function activeXDetect(b){componentVersion=document.body.getComponentVersion("{"+b+"}","ComponentID");
return(componentVersion!==null)?componentVersion:false
}function stripIllegalChars(f){t="";
f=f.toLowerCase();
var e=f.length;
for(var h=0;
h<e;
h++){var g=f.charAt(h);
if(g!="\n"&&g!="/"&&g!="\\"){t+=g
}else{if(g=="\n"){t+="n"
}}}return t
}function stripFullPath(r,l,k){var n=l;
var m=k;
var j=r;
var q=j.lastIndexOf(n);
if(q>=0){filenameLen=j.length;
j=j.substring(q+n.length,filenameLen)
}var o=j.indexOf(m);
if(o>=0){j=j.slice(0,o)
}return j
}var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"an unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS"
},searchString:function(h){var o=h.length;
for(var l=0;
l<o;
l++){var m=h[l];
var k=m.string;
var j=m.prop;
var n=m.identity;
this.versionSearchString=m.versionSearch||n;
if(k){if(k.toLowerCase().indexOf(m.subString.toLowerCase())!==-1){return n
}}else{if(j){return n
}}}},searchVersion:function(f){var d=f.toLowerCase().indexOf(this.versionSearchString.toLowerCase());
if(d===-1){return
}var e=f.substring(d+this.versionSearchString.length);
if(e.indexOf(" ")===0||e.indexOf("/")===0){e=e.substring(1)
}return parseFloat(e)
},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.userAgent.toLowerCase(),subString:"opera",identity:"Opera",versionSearch:"version"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{string:navigator.userAgent,subString:"mobile safari",identity:"Mobile Safari",versionSearch:"mobile safari"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent.toLocaleLowerCase(),subString:"blackberry",identity:"BlackBerry",versionSearch:"0/"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.userAgent,subString:"BlackBerry",identity:"BlackBerry"},{string:navigator.userAgent.toLowerCase(),subString:"android",identity:"Android"},{string:navigator.userAgent,subString:"Symbian",identity:"Symbian"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"},{string:navigator.userAgent,subString:"Windows CE",identity:"Windows CE"},{string:navigator.platform,subString:"Win",identity:"Windows"}]};
function convertTimestampToGMT(c){var d=c;
if(!(c instanceof Date)){d=new Date(c)
}offsetFromGmt=d.getTimezoneOffset()*60000;
return d.getTime()+offsetFromGmt
}function getTimestampInMillis(c){var d=c;
if(c instanceof Date){d=c.getTime()
}return d
}function debug(b){}function Hashtable(){var f={__indexToValue:[],__indexToKeys:[]};
var h=[];
var k=0;
var g=this;
function j(c){var b=null;
var a=0;
while(typeof h[a]=="number"){a+=1
}h[a]=0;
this.hasNext=this.hasMoreElements=function(){if(h[a]<k){return true
}else{if(typeof h[a]=="number"){h[a]=null
}return false
}};
this.next=this.nextElement=function(){if(this.hasNext){b=h[a];
return f[c][h[a]++]
}else{return null
}};
this.remove=function(){if(typeof b=="number"){g.remove(f.__indexToKeys[b]);
b=null
}}
}this.get=function(a){if(typeof f[a]=="number"){return f.__indexToValue[f[a]]
}else{return null
}};
this.put=function(b,a){if(typeof f[b]=="number"){f.__indexToValue[f[b]]=a
}else{f[b]=k;
f.__indexToValue[k]=a;
f.__indexToKeys[k++]=b
}};
this.remove=function(c){var a=f[c];
if(typeof a=="number"){var b=0;
delete f[c];
k-=1;
for(b=a;
b<k;
b++){f.__indexToValue[b]=f.__indexToValue[b+1];
f[(f.__indexToKeys[b]=f.__indexToKeys[b+1])]=b
}for(b=0;
b<h.length;
b++){if((h[b])&&(a<h[b])){h[b]-=1
}}}};
this.size=function(){return k
};
this.__enumerate=function(a){return new j(a)
};
Hashtable.prototype.elements=function(){return this.__enumerate("__indexToValue")
};
Hashtable.prototype.keys=function(){return this.__enumerate("__indexToKeys")
};
Hashtable.prototype.clear=function(){var a=this.keys();
while(a.hasNext()){this.remove(a.next())
}};
Hashtable.prototype.toString=function(){var b=" =&gt; ";
var e="\r\n";
var d,a=this.keys();
var c="";
while(a.hasNext()){d=a.next();
c+=d+b+this.get(d)+e
}return c
};
Hashtable.prototype.contains=function(b){var a=this.elements();
while(a.hasNext()){if(a.next()==b){return true
}}return false
};
Hashtable.prototype.containsValue=Hashtable.prototype.contains;
Hashtable.prototype.containsKey=function(a){return(this.get(a)!==null)
};
Hashtable.prototype.isEmpty=function(){return(this.size()===0)
};
Hashtable.prototype.putAll=function(c){if(c.constructor==Hashtable){var b,a=c.keys();
while(a.hasNext()){b=a.next();
this.put(b,c.get(b))
}}};
Hashtable.prototype.clone=function(){var a=new Hashtable();
a.putAll(this);
return a
};
Hashtable.prototype.equals=function(a){return(a==this)
}
}function startsWith(c,d){return(c.indexOf(d)===0)
}function DomDataCollection(k){var n=this;
n.config={recursion_level:1,collection_mode:"partial",functionsToExclude:[],function_list_size:2048,json_script:k?k:"json2.js"};
n.emptyDomData=function(){n.dom_data={functions:{names:[],excluded:{size:0,count:0},truncated:false},inputs:[],iFrames:[],scripts:[],collection_status:DomDataCollection.NotStarted}
};
n.startInspection=function(){var c=false;
var a=true;
try{n.inspectJSFunctions();
a=false
}catch(b){c=c||true
}try{n.inspectFrames();
a=false
}catch(b){c=c||true
}try{n.inspectScripts();
a=false
}catch(b){c=c||true
}try{n.inspectInputFields();
a=false
}catch(b){c=c||true
}if(c){if(a){n.dom_data.collection_status=DomDataCollection.Fail
}else{n.dom_data.collection_status=DomDataCollection.Partial
}}else{n.dom_data.collection_status=DomDataCollection.Success
}n.handleSizeLimit()
};
n.domDataAsJSON=function(){return JSON.stringify(n.dom_data)
};
n.recursiveGetAllFunctionNamesUnderElement=function(g,c,f){var x;
var b;
var e;
var E=n.config;
var A=E.recursion_level;
var F=E.collection_mode;
if(n.dom_data.functions===undefined||n.dom_data.functions.names===undefined){n.dom_data.functions={names:[],excluded:{size:0,count:0},truncated:false}
}var d=n.dom_data.functions;
var a=d.excluded;
for(var B in c){try{var C=c[B];
x=""+C;
if(g.length>0){prefix=g+"."
}else{prefix=""
}b=prefix+B;
if(o(C)){if(n.functionShouldBeCollected(C,B)){var D=d.names;
e=D.length;
D[e]=b
}else{if(F=="partial"){a.size+=x.length;
a.count++
}}}if(f+1<A){n.recursiveGetAllFunctionNamesUnderElement(b,C,f+1)
}else{d.names.sort()
}}catch(G){if(!window.console){window.console={};
window.console.info=l;
window.console.log=l;
window.console.warn=l;
window.console.error=l
}if(console&&console.log){console.log("error counting functions: "+G.toString())
}}}};
function l(){}function o(a){return typeof a=="function"
}function m(a){return a.length
}var h=new Hashtable();
n.initFunctionsToExclude=function(){if(h){h.clear()
}var a=n.config.functionsToExclude;
var b=a.length;
while(b--){h.put(a[b],"")
}};
n.functionShouldBeCollected=function j(a,b){if(n.config.collection_mode=="full"){return true
}else{if(h.size()===0){n.initFunctionsToExclude()
}if(h.containsKey(b)){return false
}else{return true
}}};
n.inspectJSFunctions=function(){n.dom_data.functions=[];
n.recursiveGetAllFunctionNamesUnderElement("",window,0)
};
n.handleSizeLimit=function(){var a=n.dom_data;
var w=n.config;
var x=w.function_list_size;
var g=a.functions;
g.names.sort();
var c=JSON.stringify(a);
if(x<0){x=0
}var b=0;
if(w.colllection_mode!="full"&&c.length>x){var e=g.names;
var f=e.toString();
var d=c.length-JSON.stringify(e).length+"[]".length;
var v=false;
var y=e.length;
while(!v){if(b++==1000){v=true
}lastComma=f.lastIndexOf(",");
if(lastComma>=0&&y>0){if(d+lastComma>x){f=f.substring(0,lastComma-1);
y--
}else{v=true
}}else{v=true
}}if(y>1){g.truncated=true;
g.names=g.names.slice(0,y-1);
a.functions.truncated=true
}else{n.emptyDomData();
a=n.dom_data;
a.collection_status=DomDataCollection.Partial;
a.functions.truncated=true
}}};
n.inspectFrames=function(){n.countElements("iframe")
};
n.countElements=function(c){var b;
var a=document.getElementsByTagName(c);
if(n.dom_data.iFrames===undefined){n.dom_data.iFrames=[]
}var e=n.dom_data.iFrames;
var d=e.length;
for(i=0;
i<a.length;
i++){e[d+i]=""+a[i].src
}e.sort()
};
n.inspectScripts=function(){var b=document.getElementsByTagName("script");
n.dom_data.scripts=[];
for(var a=0;
a<b.length;
a++){n.dom_data.scripts[a]=b[a].text.length
}};
n.collectFields=function(e){var b=document.getElementsByTagName(e);
if(n.dom_data.inputs===undefined){n.dom_data.inputs=[]
}var r=n.dom_data.inputs;
var c=r.length;
var d=b.length;
while(d--){var f=b[d];
var g=f.name;
var a=f.id;
if(g&&g.length>0){element_name=g
}else{if(a&&a.length>0){element_name=a
}else{element_name="NO_NAME"
}}r[c+d]=element_name
}r.sort()
};
n.inspectInputFields=function(){n.collectFields("input");
n.collectFields("textarea");
n.collectFields("select");
n.collectFields("button")
};
loadJSON=function(){if(!window.JSON){var a=document.getElementsByTagName("head")[0];
var b=document.createElement("script");
b.type="text/javascript";
b.src=n.config.json_script;
a.appendChild(b)
}};
n.emptyDomData();
loadJSON()
}DomDataCollection.Success=0;
DomDataCollection.Fail=1;
DomDataCollection.Partial=2;
DomDataCollection.NotStarted=3;
function IE_FingerPrint(){this.deviceprint_browser=function(){var a=navigator.userAgent.toLowerCase();
t=a+SEP+navigator.appVersion+SEP+navigator.platform;
t+=SEP+navigator.appMinorVersion+SEP+navigator.cpuClass+SEP+navigator.browserLanguage;
t+=SEP+ScriptEngineBuildVersion();
return t
};
this.deviceprint_software=function(){var j="";
var b=true;
document.body.addBehavior("#default#clientCaps");
var a;
var h=d.length;
for(i=0;
i<h;
i++){a=activeXDetect(d[i]);
var k=c[i];
if(a){if(b===true){j+=k+PAIR+a;
b=false
}else{j+=SEP+k+PAIR+a
}}else{j+="";
b=false
}}return j
};
var c=["abk","wnt","aol","arb","chs","cht","dht","dhj","dan","dsh","heb","ie5","icw","ibe","iec","ieh","iee","jap","krn","lan","swf","shw","msn","wmp","obp","oex","net","pan","thi","tks","uni","vtc","vnm","mvm","vbs","wfd"];
var d=["7790769C-0471-11D2-AF11-00C04FA35D02","89820200-ECBD-11CF-8B85-00AA005B4340","47F67D00-9E55-11D1-BAEF-00C04FC2D130","76C19B38-F0C8-11CF-87CC-0020AFEECF20","76C19B34-F0C8-11CF-87CC-0020AFEECF20","76C19B33-F0C8-11CF-87CC-0020AFEECF20","9381D8F2-0288-11D0-9501-00AA00B911A5","4F216970-C90C-11D1-B5C7-0000F8051515","283807B5-2C60-11D0-A31D-00AA00B92C03","44BBA848-CC51-11CF-AAFA-00AA00B6015C","76C19B36-F0C8-11CF-87CC-0020AFEECF20","89820200-ECBD-11CF-8B85-00AA005B4383","5A8D6EE0-3E18-11D0-821E-444553540000","630B1DA0-B465-11D1-9948-00C04F98BBC9","08B0E5C0-4FCB-11CF-AAA5-00401C608555","45EA75A0-A269-11D1-B5BF-0000F8051515","DE5AED00-A4BF-11D1-9948-00C04F98BBC9","76C19B30-F0C8-11CF-87CC-0020AFEECF20","76C19B31-F0C8-11CF-87CC-0020AFEECF20","76C19B50-F0C8-11CF-87CC-0020AFEECF20","D27CDB6E-AE6D-11CF-96B8-444553540000","2A202491-F00D-11CF-87CC-0020AFEECF20","5945C046-LE7D-LLDL-BC44-00C04FD912BE","22D6F312-B0F6-11D0-94AB-0080C74C7E95","3AF36230-A269-11D1-B5BF-0000F8051515","44BBA840-CC51-11CF-AAFA-00AA00B6015C","44BBA842-CC51-11CF-AAFA-00AA00B6015B","76C19B32-F0C8-11CF-87CC-0020AFEECF20","76C19B35-F0C8-11CF-87CC-0020AFEECF20","CC2A9BA0-3BDD-11D0-821E-444553540000","3BF42070-B3B1-11D1-B5C5-0000F8051515","10072CEC-8CC1-11D1-986E-00A0C955B42F","76C19B37-F0C8-11CF-87CC-0020AFEECF20","08B0E5C0-4FCB-11CF-AAA5-00401C608500","4F645220-306D-11D2-995D-00C04F98BBC9","73FA19D0-2D75-11D2-995D-00C04F98BBC9"]
}IE_FingerPrint.prototype=new FingerPrint();
function Mozilla_FingerPrint(){}Mozilla_FingerPrint.prototype=new FingerPrint();
function Opera_FingerPrint(){}Opera_FingerPrint.prototype=new FingerPrint();
function Timer(){this.startTime=new Date().getTime()
}Timer.prototype.start=function(){this.startTime=new Date().getTime()
};
Timer.prototype.duration=function(){return(new Date().getTime())-this.startTime
};
function getRandomPort(){return Math.floor(Math.random()*60000+4000)
}var ProxyCollector={};
ProxyCollector.internalIP="127.0.0.1";
ProxyCollector.externalIP;
ProxyCollector.internalPingTime;
ProxyCollector.externalPingTime;
ProxyCollector.setInternalPingTime=function(b){ProxyCollector.internalPingTime=b
};
ProxyCollector.setExternalPingTime=function(b){ProxyCollector.externalPingTime=b
};
ProxyCollector.doAjax=function(l,g){var m=window.XDomainRequest?true:false;
var k="http://"+l+":"+getRandomPort();
var j=new Timer();
var h;
if(m){h=new window.XDomainRequest();
h.onerror=function(){g.call(this,j.duration())
};
h.open("GET",k,true);
h.send()
}else{h=new XMLHttpRequest();
h.open("GET",k,true);
h.onreadystatechange=function(){if(h.readyState==4){g.call(this,j.duration())
}};
h.send()
}};
ProxyCollector.collect=function(){ProxyCollector.doAjax(ProxyCollector.externalIP,ProxyCollector.setExternalPingTime);
ProxyCollector.doAjax(ProxyCollector.internalIP,ProxyCollector.setInternalPingTime)
};
ProxyCollector.isValidIPAddress=function(f){var g=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
if(g.test(f)){var e=f.split(".");
if(parseInt(parseFloat(e[0]))==0){return false
}for(var h=0;
h<e.length;
h++){if(parseInt(parseFloat(e[h]))>255){return false
}}return true
}else{return false
}};
ProxyCollector.initProxyCollection=function(){if(ProxyCollector.isValidIPAddress(ProxyCollector.externalIP)&&ProxyCollector.isValidIPAddress(ProxyCollector.internalIP)){ProxyCollector.collect()
}};
function BlackberryLocationCollector(){var k=this;
var n=null;
this.getGeolocationWatchId=function(){return n
};
var l=null;
this.getGeolocationLastPosition=function(){return l
};
var o=4;
this.getGeolocationStatusCode=function(){return o
};
var j="";
this.getGeolocationErrorMessage=function(){return j
};
var r={aidMode:2,timeout:180,relevancy:120,expiration:48,alertDebug:false};
var m=-1;
var q=0;
this.getInvokeCount=function(){return q
};
this.handleBlackBerryLocationTimeout=function(){if(m!=-1){k.stopWatch();
o=3;
if(q===0&&r.aidMode!==0){q++;
k.startLocationWatch()
}}};
this.handlePosition=function(){clearTimeout(m);
m=-1;
var a=false;
if(blackberry.location.latitude===0&&blackberry.location.longitude===0){if(r.alertDebug){alert("Got empty position")
}if(l===null){o=2
}}else{var c=null;
if(blackberry.location.timestamp){c=getTimestampInMillis(blackberry.location.timestamp)
}else{c=new Date().getTime()
}var d=new Date().getTime();
if((d-c)<=(r.expiration*60*60*1000)){if(l===null||c>l.timestamp){var b=l===null?0:l.timestamp;
if(r.alertDebug){alert("Saved new position. New timestamp: "+c+" Old: "+b)
}l={timestamp:c,coords:{latitude:blackberry.location.latitude,longitude:blackberry.location.longitude}};
o=0
}else{if(r.alertDebug){alert("New position is not saved. New timestamp: "+c+" Old: "+l.timestamp)
}}}else{if(r.alertDebug){alert("New position is not saved. It is expired: "+((d-c)*1000*60*60)+" hours old")
}}}if(l!==null){var d=new Date().getTime();
a=(d-l.timestamp)<(r.relevancy*1000)
}k.stopWatch();
if(r.alertDebug){alert("Relevant position? "+a)
}if((q===0&&r.aidMode!==0)||!a){q++;
k.startLocationWatch()
}};
this.init=function(c,d,b,a){if(c>=0&&c<=2){r.aidMode=c
}if(d!==null&&d>=90&&d<=300){r.timeout=d
}if(b!==null&&b>=60&&b<=240){r.relevancy=b
}if(a!==null&&a>=24&&a<=60){r.expiration=a
}};
this.startLocationWatch=function(){if(q===0){blackberry.location.setAidMode(0)
}else{blackberry.location.setAidMode(r.aidMode)
}var a=r.timeout*1000;
m=setTimeout("geoLocator.handleBlackBerryLocationTimeout()",a);
blackberry.location.onLocationUpdate(k.handlePosition);
blackberry.location.refreshLocation();
n=1;
return true
};
this.stopWatch=function(){try{blackberry.location.removeLocationUpdate(k.handlePosition)
}catch(a){}n=-2
};
this.generateGeolocationJSONStruct=function(){var b=null;
if(l!==null){var a=convertTimestampToGMT(l.timestamp);
b={GeoLocationInfo:[{Status:o,Longitude:l.coords.longitude,Latitude:l.coords.latitude,Timestamp:a}]}
}else{b={GeoLocationInfo:[{Status:o}]}
}return JSON.stringify(b)
}
}function detectFields(){var m="form";
var s="input";
var q=document.getElementsByTagName("form");
var o=q.length;
var r;
var n;
var v=[];
v.push("url="+window.location.href);
for(var w=0;
w<o;
w++){v.push(m+"="+q[w].name);
r=q[w].getElementsByTagName("input");
n=r.length;
for(var j=0;
j<n;
j++){if(r[j].type!="hidden"){v.push(s+"="+r[j].name)
}}}var u=v.join("|");
return u
}var SEP="|";
var PAIR="=";
var DEV="~";
function FingerPrint(){var d="3.0.0.0_5";
var c=new Hashtable();
c.put("npnul32","def");
c.put("npqtplugin6","qt6");
c.put("npqtplugin5","qt5");
c.put("npqtplugin4","qt4");
c.put("npqtplugin3","qt3");
c.put("npqtplugin2","qt2");
c.put("npqtplugin","qt1");
c.put("nppdf32","pdf");
c.put("NPSWF32","swf");
c.put("NPJava11","j11");
c.put("NPJava12","j12");
c.put("NPJava13","j13");
c.put("NPJava32","j32");
c.put("NPJava14","j14");
c.put("npoji600","j61");
c.put("NPJava131_16","j16");
c.put("NPOFFICE","mso");
c.put("npdsplay","wpm");
c.put("npwmsdrm","drm");
c.put("npdrmv2","drn");
c.put("nprjplug","rjl");
c.put("nppl3260","rpl");
c.put("nprpjplug","rpv");
c.put("npchime","chm");
c.put("npCortona","cor");
c.put("np32dsw","dsw");
c.put("np32asw","asw");
this.deviceprint_version=function(){return d
};
this.deviceprint_browser=function(){var a=navigator.userAgent.toLowerCase();
var b=a+SEP+navigator.appVersion+SEP+navigator.platform;
return b
};
this.deviceprint_software=function(){var m="";
var s=true;
var n="";
var q="";
var a=navigator.plugins;
var r=navigator.mimeTypes;
if(a.length>0){var u="";
var b="Plugins";
var o=a.length;
for(i=0;
i<o;
i++){plugin=a[i];
u=stripFullPath(plugin.filename,b,".");
if(s===true){q=c.containsKey(u);
if(q){n+=c.get(u);
s=false
}else{n="";
s=false
}}else{q=c.containsKey(u);
if(q){n+=SEP+c.get(u)
}else{n+=""
}}}m=stripIllegalChars(n)
}else{if(r.length>0){q="";
for(i=0;
i<r.length;
i++){mimeType=r[i];
if(s===true){q=c.containsKey(mimeType);
if(q){m+=c.get(mimeType)+PAIR+mimeType;
s=false
}else{m+="unknown"+PAIR+mimeType;
s=false
}}else{q=c.containsKey(mimeType);
if(q){m+=SEP+c.get(mimeType)+PAIR+mimeType
}else{n+=""
}}}}}return m
};
this.deviceprint_display=function(){var a="";
if(self.screen){a+=screen.colorDepth+SEP+screen.width+SEP+screen.height+SEP+screen.availHeight
}return a
};
this.deviceprint_all_software=function(){var q="";
var m=true;
var l=navigator.plugins;
var r=l.length;
if(r>0){var b="";
var n="";
var a="";
for(i=0;
i<r;
i++){var o=l[i];
n=o.filename;
n=stripFullPath(n,"Plugins",".");
if(m===true){b+=n;
m=false
}else{b+=SEP+n
}}q=stripIllegalChars(b)
}return q
};
this.deviceprint_timezone=function(){var a=(new Date().getTimezoneOffset()/60)*(-1);
return a
};
this.deviceprint_language=function(){var b;
var j=navigator.language;
var h=navigator.browserLanguage;
var k=navigator.systemLanguage;
var a=navigator.userLanguage;
if(typeof(j)!=="undefined"){b="lang"+PAIR+j+SEP
}else{if(typeof(h)!=="undefined"){b="lang"+PAIR+h+SEP
}else{b="lang"+PAIR+""+SEP
}}if((typeof(k)!=="undefined")){b+="syslang"+PAIR+k+SEP
}else{b+="syslang"+PAIR+""+SEP
}if((typeof(a)!=="undefined")){b+="userlang"+PAIR+a
}else{b+="userlang"+PAIR+""
}return b
};
this.deviceprint_java=function(){var a=(navigator.javaEnabled())?1:0;
return a
};
this.deviceprint_cookie=function(){var a=(navigator.cookieEnabled)?1:0;
if(typeof navigator.cookieEnabled==="undefined"&&!a){document.cookie="testcookie";
a=(document.cookie.indexOf("testcookie")!==-1)?1:0
}return a
};
this.deviceprint_appName=function(){var a=navigator.appName;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_appCodeName=function(){var a=navigator.appCodeName;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_online=function(){var a=navigator.onLine;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_opsProfile=function(){var a=navigator.opsProfile;
return((typeof(a)!="undefined")&&(a!==null))?a:""
};
this.deviceprint_userProfile=function(){var a=navigator.userProfile;
return((typeof(a)!="undefined")&&(a!==null))?a:""
};
this.deviceprint_screen_availWidth=function(){var a=screen.availWidth;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_pixelDepth=function(){var a=screen.pixelDepth;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_bufferDepth=function(){var a=screen.bufferDepth;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_deviceXDPI=function(){var a=screen.deviceXDPI;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_deviceYDPI=function(){var a=screen.deviceYDPI;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_logicalXDPI=function(){var a=screen.logicalXDPI;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_logicalYDPI=function(){var a=screen.logicalYDPI;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_fontSmoothingEnabled=function(){var a=screen.fontSmoothingEnabled;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_screen_updateInterval=function(){var a=screen.updateInterval;
return(typeof(a)!="undefined")?a:""
};
this.deviceprint_timezone=function(){var a=(new Date().getTimezoneOffset()/60)*(-1);
return a
};
this.deviceprint_ping_in=function(){if(ProxyCollector&&ProxyCollector.internalPingTime){return ProxyCollector.internalPingTime
}else{return""
}};
this.deviceprint_ping_ex=function(){if(ProxyCollector&&ProxyCollector.externalPingTime){return ProxyCollector.externalPingTime
}else{return""
}}
}function urlEncode(c){var d=escape(c).replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/-/g,"%2D").replace(/\./g,"%2E").replace(/\//g,"%2F").replace(/_/g,"%5F").replace(/@/g,"%40");
return d
}function encode_deviceprint(){var b=add_deviceprint();
return urlEncode(b)
}function decode_deviceprint(){return unescape(encode_deviceprint())
}function post_deviceprint(){document.forms[0].pm_fp.value=encode_deviceprint();
return true
}function post_fingerprints(b){b.deviceprint.value=encode_deviceprint()
}function add_deviceprint(){BrowserDetect.init();
var d;
switch(BrowserDetect.browser){case"Explorer":d=new IE_FingerPrint();
break;
case"Firefox":d=new Mozilla_FingerPrint();
break;
case"Opera":d=new Opera_FingerPrint();
break;
default:d=new FingerPrint()
}var c="version="+d.deviceprint_version()+"&pm_fpua="+d.deviceprint_browser()+"&pm_fpsc="+d.deviceprint_display()+"&pm_fpsw="+d.deviceprint_software()+"&pm_fptz="+d.deviceprint_timezone()+"&pm_fpln="+d.deviceprint_language()+"&pm_fpjv="+d.deviceprint_java()+"&pm_fpco="+d.deviceprint_cookie();
c=c+"&pm_fpasw="+d.deviceprint_all_software();
c=c+"&pm_fpan="+d.deviceprint_appName()+"&pm_fpacn="+d.deviceprint_appCodeName()+"&pm_fpol="+d.deviceprint_online()+"&pm_fposp="+d.deviceprint_opsProfile()+"&pm_fpup="+d.deviceprint_userProfile()+"&pm_fpsaw="+d.deviceprint_screen_availWidth()+"&pm_fpspd="+d.deviceprint_screen_pixelDepth()+"&pm_fpsbd="+d.deviceprint_screen_bufferDepth()+"&pm_fpsdx="+d.deviceprint_screen_deviceXDPI()+"&pm_fpsdy="+d.deviceprint_screen_deviceYDPI()+"&pm_fpslx="+d.deviceprint_screen_logicalXDPI()+"&pm_fpsly="+d.deviceprint_screen_logicalYDPI()+"&pm_fpsfse="+d.deviceprint_screen_fontSmoothingEnabled()+"&pm_fpsui="+d.deviceprint_screen_updateInterval();
c=c+"&pm_os="+BrowserDetect.OS+"&pm_brmjv="+parseInt(BrowserDetect.version,10)+"&pm_br="+BrowserDetect.browser;
c=c+"&pm_inpt="+d.deviceprint_ping_in()+"&pm_expt="+d.deviceprint_ping_ex();
return c
}function form_add_data(f,d,e){if(f&&f.length>0){f+="&"
}else{f=""
}f+=d+"="+escape(e.toString());
return f
}function form_add_deviceprint(f,d,e){f=form_add_data(f,d+"d",e);
return f
}var HTML5="HTML5";
var BLACKBERRY="blackberry";
var UNDEFINED="undefined";
var geoLocator=null;
var geoLocatorStatus=false;
function detectDeviceCollectionAPIMode(){if(typeof(navigator.geolocation)!=UNDEFINED){return HTML5
}else{if(typeof(window.blackberry)!=UNDEFINED&&blackberry.location.GPSSupported){return BLACKBERRY
}else{return UNDEFINED
}}}function init(l,m,k,j,g){var h=detectDeviceCollectionAPIMode();
if(h==HTML5){geoLocator=new HTML5LocationCollector();
geoLocator.init(l,m,k,j);
return true
}else{if(h==BLACKBERRY){geoLocator=new BlackberryLocationCollector();
geoLocator.init(g,m,k,j);
return true
}}return false
}function startCollection(k,f,j,h,g){geoLocatorStatus=init(k,f,j,h,g);
if(geoLocatorStatus){return geoLocator.startLocationWatch()
}else{return false
}}function stopCollection(){if(geoLocatorStatus){geoLocator.stopWatch()
}}function getGeolocationStruct(){if(geoLocatorStatus){return geoLocator.generateGeolocationJSONStruct()
}else{return'{"GeoLocationInfo":[{"Status":4}]'
}}function HTML5LocationCollector(){var m=this;
var h=-1;
this.getGeolocationWatchId=function(){return h
};
var g=null;
this.getGeolocationLastPosition=function(){return g
};
var j=4;
this.getGeolocationStatusCode=function(){return j
};
var l="";
this.getGeolocationErrorMessage=function(){return l
};
var k={accuracy:100,timeout:180,relevancy:120,expiration:48};
this.getGeolocationConfig=function(){return k
};
this.startLocationWatch=function(){var a={enableHighAccuracy:true,timeout:(k.timeout*1000),maximumAge:k.expiration};
if(navigator.geolocation){h=navigator.geolocation.watchPosition(this.handlePosition,this.handleError,a);
return true
}else{j=4
}return false
};
this.init=function(c,d,b,a){if(c!==null&&c>=0&&c<=200){k.accuracy=c
}if(d!==null&&d>=90&&d<=300){k.timeout=d
}if(b!==null&&b>=60&&b<=240){k.relevancy=b
}if(a!==null&&a>=24&&a<=60){k.expiration=a
}};
this.handlePosition=function(b){var a=new Date().getTime();
var d=getTimestampInMillis(b.timestamp);
if((a-d)<=(k.expiration*60*60*1000)){if(g===null||b.timestamp>g.timestamp||b.coords.accuracy<g.coords.accuracy){g=b;
j=0
}}if(g!==null){var c=a-g.timestamp;
if(c<=(k.relevancy*1000)&&g.coords.accuracy<=k.accuracy){m.stopWatch()
}}};
this.generateGeolocationJSONStruct=function(){var b=null;
if(g!==null){var a=convertTimestampToGMT(g.timestamp);
b={GeoLocationInfo:[{Status:j,Longitude:g.coords.longitude,Latitude:g.coords.latitude,Altitude:Math.round(g.coords.altitude),HorizontalAccuracy:Math.round(g.coords.accuracy),AltitudeAccuracy:Math.round(g.coords.altitudeAccuracy),Heading:Math.round(g.coords.heading),Speed:Math.round(g.coords.speed),Timestamp:a}]}
}else{b={GeoLocationInfo:[{Status:j}]}
}return JSON.stringify(b)
};
this.handleError=function(a){switch(a.code){case a.TIMEOUT:m.stopWatch();
j=3;
break;
case a.POSITION_UNAVAILABLE:j=2;
l=a.message;
break;
case a.PERMISSION_DENIED:j=1;
break;
case a.UNKNOWN_ERROR:j=2;
l=a.message;
break
}};
this.stopWatch=function(){navigator.geolocation.clearWatch(h);
h=-2
}
}var UIEventCollector=(function(){var J=null;
var O=null;
var Z=null;
var N=null;
var E=["output_size_limit"];
P();
S();
function P(c){N={output_size_limit:1024,collection_mode:"partial"};
if(c){for(p in c){if(c.hasOwnProperty(p)){var b=false;
for(var a=E.length-1;
a>=0;
a--){if(E[a]==p){found=true;
continue
}}if(!b){N[p]=c[p]
}}}}Z=false;
O=Y();
J={elements:new UIElementList(),events:[],collection_status:0,toString:function(){return"RecordedData: {elements: "+this.elements+", events: "+this.events+"}"
}};
S()
}function I(){var a=W();
for(var b=0,c=a.length;
b<c;
b++){U(a[b])
}}function W(){var d=[];
var c=document.getElementsByTagName("input");
for(var e=0,a=c.length;
e<a;
e++){var b=c[e];
if(F(b)){d.push(b)
}}return d
}function F(b){if(b.tagName&&b.tagName.toLowerCase()=="input"){var a=b.getAttribute("type");
if(a=="text"||a=="checkbox"||a=="checkbox"){return true
}}return false
}function Y(){var a=(document.createEvent)?document.createEvent("Event"):document.createEventObject();
var b=a.timeStamp||new Date();
b=new Date(b);
if(b.getYear()>2100){b=new Date(b/1000)
}b=b.getTime();
return b
}function U(d){var e=null;
var a=J.elements;
var b=a.size();
var c=aa(d);
if(!J.elements.containsKey(c)){e=new InteractionElement();
e.id(c);
e.type(C(d));
e.length(d.value?d.value.length:0);
a.put(e)
}else{e=a.get(c)
}return e
}function Q(a){var c=a||window.event;
var d=U(X(c));
var e=new UIEvent();
e.index(d.index());
e.type(K(c));
var b=H(c);
e.offset(b-O);
J.events.push(e);
return true
}function D(b){var c=b||window.event;
if(G(c)){var a={target:X(c),type:"paste"};
return Q(a)
}else{return Q(c)
}}function G(c){if(c.type=="keydown"){var b=c.which||c.charCode||c.keyCode;
var a=(typeof KeyboardEvent!="undefined"&&b==KeyboardEvent.DOM_VK_V)||b==118||b==86;
if(a&&(c.ctrlKey||c.metaKey)){return true
}}return false
}function X(a){return a.target?a.target:a.srcElement
}function H(b){var a;
if(b.timeStamp&&b.timeStamp!==0){a=b.timeStamp;
if(new Date(a).getYear()>2100){a=a/1000
}}else{a=new Date().getTime()
}return a
}function L(a){}function R(){I();
var f=J.elements;
for(var c=f.size();
c>=1;
c--){var a=f.getByIndex(c);
var b=a.id();
var e=document.getElementById(b);
if(!e){var d=document.getElementsByName(b);
if(d.length>0){e=d[0]
}}if(e&&e.value){a.length(e.value.length)
}}}function T(b){var d=b||window.event;
var e=b.target;
if(e.nodeType==1){var a=e.getElementsByTagName("form");
for(var c=a.length-1;
c>=0;
c--){var f=a[c];
f.onsubmit=recordFormSubmitEvent
}}}function S(){var a=Q;
var b=document;
if(b.addEventListener){b.addEventListener("keydown",D,false);
b.addEventListener("paste",a,false);
b.addEventListener("focus",a,true);
b.addEventListener("blur",a,true)
}else{if(b.attachEvent){b.onkeydown=D;
b.onfocusin=a;
b.onfocusout=a
}}}function V(){return private_config
}function K(a){if(a.type=="keydown"){return UIEvent.KeyDown
}else{if(a.type=="submit"){return UIEvent.Submit
}else{if(a.type=="paste"){return UIEvent.Paste
}else{if(a.type=="focus"||a.type=="focusin"){return UIEvent.Focus
}else{if(a.type=="blur"||a.type=="focusout"){return UIEvent.Blur
}else{return UIEvent.Unknown
}}}}}}function M(a){if(a==UIEvent.KeyDown){return"keydown"
}else{if(a==UIEvent.Submit){return"submit"
}else{if(a==UIEvent.Focus){return"focus"
}else{if(a==UIEvent.Blur){return"blur"
}else{if(a==UIEvent.Paste){return"paste"
}else{return"unknown"
}}}}}}function C(a){return a.nodeName+(a.type?(":"+a.type):"")
}function aa(a){return a.id?a.id:(a.name?a.name:a.nodeName)
}return{addElement:function(a){return U(a)
},getEventType:function(a){return K(a)
},getEventCode:function(a){return M(a)
},getRecordedData:function(){return J
},getElementType:function(a){return C(a)
},getElementId:function(a){return aa(a)
},initEventCollection:function(a){P(a)
},getConfig:function(){return N
},serialize:function(){R();
var d=this.getRecordedData();
var j=d.elements;
var u=d.events;
var l=d.collection_status;
var a=this.getConfig().collection_mode=="partial";
var f=this.getConfig().output_size_limit;
var n=u.length;
var k="@";
var b=";";
var c=",";
var m="";
for(var e=j.size();
e>=1;
e--){m=j.getByIndex(e).serialize()+b+m
}if(m.length>0){m=m.substring(0,m.length-1)
}var s="";
var g=m.length+k.length;
var o=1;
g+=k.length+o+c.length+(""+O).length+c.length+(""+l).length;
while(n--){var q=u[n].serialize()+b;
if(a&&((g+s.length+q.length)>f)){Z=true;
break
}s=q+s
}if(s.length>0){s=s.substring(0,s.length-1)
}var h=Z?1:0;
var r=m+k+s+k+h+c+O+c+l;
return r
}}
})();
function UIEvent(){var b=(this===window)?{}:this;
b.index=function(a){if(arguments.length===0){return b._index
}else{b._index=arguments[0]
}};
b.offset=function(a){if(arguments.length===0){return b._offset
}else{b._offset=arguments[0]
}};
b.type=function(a){if(arguments.length===0){return b._type
}else{b._type=arguments[0]
}};
b.serialize=function(){var a=",";
return b.index()+a+b.type()+a+b.offset()
};
b.toString=function(){return"UIEvent: [index: "+b.index()+", type: "+b.type()+", offset: "+b.offset()+"]"
}
}UIEvent.Unknown=0;
UIEvent.KeyDown=1;
UIEvent.Submit=2;
UIEvent.Focus=3;
UIEvent.Blur=4;
UIEvent.Paste=5;
function InteractionElement(){var b=(this===window)?{}:this;
b.id=function(a){if(arguments.length===0){return b._id
}else{b._id=arguments[0]
}};
b.index=function(a){if(arguments.length===0){return b._index
}else{b._index=arguments[0]
}};
b.length=function(a){if(arguments.length===0){return b._length
}else{b._length=arguments[0]
}};
b.type=function(a){if(arguments.length===0){return b._type
}else{b._type=arguments[0]
}};
b.serialize=function(){var a=",";
return b.index()+a+b.id()+a+b.type()+a+b.length()
};
b.toString=function(){return"InteractionElement: [id: "+b.id()+", index: "+b.index()+", length: "+b.length()+", type: "+b.type()+"]"
}
}function UIElementList(){var d=(this===window)?{}:this;
var f=new Hashtable();
var e=new Hashtable();
d.get=function(a){return f.get(a)
};
d.getByIndex=function(a){return e.get(a)
};
d.containsKey=function(a){return f.containsKey(a)
};
d.indexByKey=function(a){return get(a).index()
};
d.size=function(){return f.size()
};
d.put=function(b){var c=b.id();
if(!f.containsKey(c)){f.put(c,b);
var a=f.size();
b.index(a);
e.put(a,b)
}};
d.toString=function(){return"[size: "+f.size()+", names: ["+f+"], indexes: ["+e+"]]"
}
};