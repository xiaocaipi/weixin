define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,t,o){
"use strict";
function i(){
var e=s.indexOf("://")<0?"http://"+s:s;
if(-1!=e.indexOf("mp.weixin.qq.com/s")||-1!=e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t=e.split("#");
e=r.addParam(t[0],"scene",25,!0)+(t[1]?"#"+t[1]:""),e=e.replace(/#rd$/g,"#wechat_redirect");
}else e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(s);
var o={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(s)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
};
return o.timeout=2e3,o.complete=function(){
location.href=e;
},m(o),!1;
}
e("biz_common/utils/string/html.js");
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/url/parse.js"),m=e("biz_wap/utils/ajax.js"),c=msg_title.htmlDecode(),s=msg_source_url.htmlDecode(),a=document.getElementById("js_report_article3"),p=e("biz_wap/jsapi/core.js");
n.tap(a,function(){
var e=["/mp/infringement?url=",encodeURIComponent(location.href),"&title=",encodeURIComponent(c),"&__biz=",biz].join("");
return location.href=e+"#wechat_redirect",!1;
});
var l=document.getElementById("js_view_source");
n.on(l,"click",function(){
return i(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
for(var t=5381,o=0;o<e.length;o++)t=(t<<5)+t+e.charCodeAt(o),t&=2147483647;
return t;
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,d=0,m=e.length;m>d;++d)o=e[d],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(c[i[2]]=!0)));
}
function n(e){
for(var t=0,o=p.length;o>t;++t)if(p[t]==e)return!0;
return!1;
}
function i(){
c={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in c)c.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!_&&n(t)&&(_=!0),
e.push(t));
return c={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=document.getElementById("js_content"),n=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight||document.body.offsetHeight,d=Math.ceil(a/n),l=Math.ceil((o.scrollHeight||o.offsetHeight)/n),s=(window.logs.read_height||t)+n,w=document.getElementById("js_toobar3").offsetTop,c=o.getElementsByTagName("img")||[],p=Math.ceil(s/n)||1,f=document.getElementById("media"),u=50,h=0,y=0,b=0,v=0,T=s+u>w?1:0;
p>d&&(p=d);
var j=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
h++;
var a=i.getAttribute("src"),d=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(y++,a.isCDN()&&(b++,-1!=a.indexOf("tp=webp")&&v++),d&&(e["img_"+d+"_cnt"]=e["img_"+d+"_cnt"]||0,
e["img_"+d+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=v||0,e.download_img_cnt=y||0,e.download_cdn_img_cnt=b||0,
e.img_cnt=h||0;
},O=window.appmsgstat||{},x=window.logs.img||{},z=window.logs.pagetime||{},E=x.load||{},k=x.read||{},D=[],B=[],N=0,S=0,I=0;
for(var H in k)H&&0==H.indexOf("http")&&k.hasOwnProperty(H)&&B.push(H);
for(var H in E)H&&0==H.indexOf("http")&&E.hasOwnProperty(H)&&D.push(H);
for(var M=0,P=D.length;P>M;++M){
var Y=D[M];
Y&&Y.isCDN()&&(-1!=Y.indexOf("/0")&&N++,-1!=Y.indexOf("/640")&&S++,-1!=Y.indexOf("/300")&&I++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_height:n,
screen_num:l,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:window.logs.video_cnt||0,
read_screen_num:p||0,
is_finished_read:T,
scene:source,
content_len:g.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:S,
img_0_cnt:N,
img_300_cnt:I,
wtime:z.wtime||0,
ftime:z.ftime||0,
ptime:z.ptime||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:publish_time.replace(/-/g,"")
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=D.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var A=window.logs.webplog;
e.webp_total=1,e.webp_lossy=A.lossy,e.webp_lossless=A.lossless,e.webp_alpha=A.alpha,
e.webp_animation=A.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&window.__addIdKeyReport(27613,31,moon.mod_num)),window.logs.idkeys){
var R=window.logs.idkeys,C=[];
for(var J in R)if(R.hasOwnProperty(J)){
var K=R[J];
K.val>0&&C.push(J+"_"+K.val);
}
e.idkey=C.join(";");
}
j(!!f&&f.getElementsByTagName("img")),j(c);
var q=(new Date).getDay(),L=i();
(_||0!==user_uin&&Math.floor(user_uin/100)%7==q)&&(e.domain_list=L),_&&(e.html_content=r),
window.isSg&&(e.from="sougou"),m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
{
var d=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js");
e("biz_common/utils/cookie.js");
}
e("appmsg/cdn_img_lib.js");
var r,l=e("biz_wap/utils/storage.js"),s=new l("ad"),w=new l("page_pos"),g={};
!function(){
if(r=document.getElementsByTagName("html"),r&&1==!!r.length){
r=r[0].innerHTML;
var e=r.replace(/[\x00-\xff]/g,""),t=r.replace(/[^\x00-\xff]/g,"");
g.content_length=1*t.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=g;
}();
var c={},_=!1,p=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],f=null,u=0,h=msg_link.split("?").pop(),y=t(h);
!function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(d.on(window,"load",function(){
u=1*w.get(y);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var o=t.offsetTop;
window.scrollTo(0,o-25);
}else window.scrollTo(0,u);
}),d.on(window,"unload",function(){
if(w.set(o,u,+new Date+72e5),window.__ajaxtest="2",window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,o=[biz,sn,mid,idx].join("_");
s.set(o,{
info:e,
time:t
},+new Date+24e4);
}
a();
}),window.logs.read_height=0,d.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(f),f=setTimeout(function(){
u=window.pageYOffset,w.set(y,u,+new Date+72e5);
},500);
}),d.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(f),f=setTimeout(function(){
u=window.pageYOffset,w.set(y,u,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,o=100,a=document.getElementsByTagName("img"),s=a.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=a.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>o)){
var d=a[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),u=0;u<c.length;u++)if(f=c[u],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:a[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":""
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),o={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=o[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=g("js_content");
return e?(d._oElements=e.getElementsByTagName("mpvoice")||[],d._oElements.length<=0?!1:!0):!1;
}
function t(){
d.musicLen=d._oElements.length;
}
function n(){
for(var e=0,i=0;i<d.musicLen;i++){
var t=d._oElements[i],n={};
n.voiceid=a(decodeURIComponent(t.getAttribute("voice_encode_fileid")||"")),n.voiceid=n.voiceid.replace(/&#61;/g,"="),
n.src=d.srcRoot.replace("#meidaid#",n.voiceid),n.voiceid&&"undefined"!=n.voiceid&&(o(t,n,e),
e++);
}
}
function o(e,i,t){
i.duration=1*e.getAttribute("play_length")||0,i.duration_str=s(i.duration),i.posIndex=t,
i.title=a(decodeURIComponent(e.getAttribute("name")||"")),p.renderPlayer("voice_tpl",i,e,!0),
c(i),d.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,t=r(e.title);
e.player=p.init({
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
duration:1*(e.duration/1e3).toFixed(2),
title:t.length>8?t.substr(0,8)+"...":t,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"playing",
playCssDom:g("voice_main_"+i),
playArea:g("voice_main_"+i),
progress:g("voice_progress_"+i)
});
}
function r(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function a(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
function s(e){
if(isNaN(e))return"0:00";
var i=new Date(0),t=new Date(1*e),n=t.getHours()-i.getHours(),o=t.getMinutes()+60*n,c="i:ss".replace(/i|I/g,o).replace(/ss|SS/,l(t.getSeconds(),2));
return c;
}
function l(e,i){
for(var t=0,n=i-(e+"").length;n>t;t++)e="0"+e;
return e+"";
}
function g(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var p=e("pages/voice_component.js"),d={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
if(i())return t(),n(),d.musicList;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=o("js_content");
return e?(g._oElements=e.getElementsByTagName("qqmusic")||[],g._oElements.length<=0?!1:!0):!1;
}
function t(){
g.musicLen=g._oElements.length;
}
function n(){
for(var e=0,i=0;i<g.musicLen;i++){
var t=g._oElements[i],n={};
n.musicid=s(t.getAttribute("musicid")||""),n.comment_id=s(t.getAttribute("commentid")||""),
n.musicid&&"undefined"!=n.musicid&&n.comment_id&&"undefined"!=n.comment_id&&(m(t,n,e),
e++);
}
}
function m(e,i,t){
i.media_id=s(e.getAttribute("mid")||""),i.duration=e.getAttribute("play_length")||0,
i.posIndex=t,i.musicImgPart=s(e.getAttribute("albumurl")||""),i.music_img=g.imgroot+i.musicImgPart,
i.audiourl=s(e.getAttribute("audiourl")||""),i.singer=s(e.getAttribute("singer")||""),
i.music_name=s(e.getAttribute("music_name")||""),a.renderPlayer("qqmusic_tpl",i,e,!0),
c(i),g.musicList[i.musicid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.musicid+"_"+e.posIndex,t=e.comment_id+"_"+e.posIndex,n=["http://i.y.qq.com/v8/playsong.html?songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),m=u(e.music_name);
e.player=a.init({
type:0,
comment_id:e.comment_id,
mid:e.media_id,
songId:e.musicid,
duration:1*(e.duration/1e3).toFixed(2),
title:m.length>8?m.substr(0,8)+"...":m,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:e.music_img,
playingCss:"qqmusic_playing",
playCssDom:o("qqmusic_main_"+t),
playArea:o("qqmusic_play_"+i),
detailUrl:n,
detailArea:o("qqmusic_home_"+i)
});
}
function u(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function s(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
function r(){}
function o(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("pages/voice_component.js"),g={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
musicList:{},
musicLen:0
};
if(i())return t(),n(),r(),g.musicList;
});define("appmsg/iframe.js",["new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(e,t){
t===!0?(d.checkOriTime=0,d.orientation!=window.orientation?(d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1)):d.checkOriTime<=2&&(d.checkOriTime++,setTimeout(function(){
d.orientation!=window.orientation?(d.checkOriTime=0,d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1);
},150));
}
function o(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=d.video_top.length,i=e+d.innerHeight,n=0,c=0;t>c;c++){
var s=d.video_top[c];
s.reported?n++:i>=s.start&&i<=s.end&&(s.reported=!0,r.report({
step:1,
vid:s.vid
}));
}
n==t&&(m.off(window,"scroll",o),d.video_top=d.video_iframe=o=null);
}
{
var n,r=e("new_video/ctl.js"),d={
mpVideoBotH:37,
checkOri:"orientation"in window,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},c=e("pages/version4video.js"),s=e("biz_common/dom/attr.js"),a=s.setProperty,m=e("biz_common/dom/event.js"),p=document.getElementsByTagName("iframe");
/MicroMessenger/.test(navigator.userAgent);
}
window.__setOriginStatus=function(e){
for(var t=(document.getElementById("js_content").offsetWidth,Math.ceil(3*b/4)),i=0,o=p.length;o>i;++i){
n=p[i];
var r=n.getAttribute("src")||"",c=r.match(/[\?&]vid\=([^&]*)/);
if(c&&c[1]){
var s=c[1];
2==e.ori_status&&s==e.vid&&(n.setAttribute("height",t+d.mpVideoBotH),n.setAttribute("ori_status",2));
}
}
},window.reportVid=[];
for(var u=0,l=p.length;l>u;++u){
n=p[u];
var f=n.getAttribute("data-src")||"",h=n.className||"",v=n.getAttribute("src")||f;
if(!f||"#"==f){
var w=n.getAttribute("data-display-src");
if(w&&(0==w.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==w.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
w=w.replace(/&amp;/g,"&");
for(var g=w.split("&"),_=["/mp/newappmsgvote?action=show"],u=0;u<g.length;u++)(0==g[u].indexOf("__biz=")||0==g[u].indexOf("supervoteid="))&&_.push(g[u]);
_.length>1&&(f=_.join("&")+"#wechat_redirect");
}
}
if(c.isShowMpVideo()&&v&&(0==v.indexOf("http://v.qq.com/iframe/player.html")||0==v.indexOf("http://v.qq.com/iframe/preview.html")||0==v.indexOf("https://v.qq.com/iframe/player.html")||0==v.indexOf("https://v.qq.com/iframe/preview.html"))){
f=f.replace(/^https:/,location.protocol),f=f.replace(/^http:/,location.protocol),
f=f.replace(/preview.html/,"player.html");
var x=v.match(/[\?&]vid\=([^&]*)/);
if(!x||!x[1])continue;
var y=x[1],b=document.getElementById("js_content").offsetWidth,O=Math.ceil(3*b/4);
window.reportVid.push(y),d.video_iframe.push({
dom:n,
vid:y
}),v=["/mp/videoplayer?video_h=",O,"&scene=1&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),setTimeout(function(e,t,i,o){
return function(){
o.removeAttribute("style"),o.setAttribute("width",e),o.setAttribute("height",t),
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,O,v,n),0);
}else if(f&&(f.indexOf("newappmsgvote")>-1&&h.indexOf("js_editor_vote_card")>=0||0==f.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&h.indexOf("card_iframe")>=0||f.indexOf("appmsgvote")>-1||f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(f=f.replace(/^http:/,location.protocol),h.indexOf("card_iframe")>=0){
var k=f.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(k+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
n.setAttribute("src",k);
}else{
var A=f.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join(""):h.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx].join(""));
var k=A?f.replace("#wechat_redirect",j):f+j;
n.setAttribute("src",k);
}
-1==f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(n),n.appmsg_idx=u;
}
if(f&&f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var H=b,q=3*H/4;
n.width=H,n.height=q,n.style.setProperty&&(n.style.setProperty("width",H+"px","important"),
n.style.setProperty("height",q+"px","important"));
}
}
var T="onorientationchange"in window?"orientationchange":"resize";
if(m.on(window,T,function(){
for(var e=document.getElementsByTagName("iframe"),t=0,o=e.length;o>t;t++){
var n=e[t],r=n.getAttribute("src");
r&&-1!=r.indexOf("/mp/videoplayer")&&n.className.indexOf("iframe_full_video")>=0&&setTimeout(function(e){
return function(){
d.checkOri?i(e,!0):window.mpVideoFullScreent(e);
};
}(n),0);
}
},!1),m.on(window,"resize",function(){
for(var e=document.getElementsByTagName("iframe"),t=0,i=e.length;i>t;t++){
var o=e[t],n=o.getAttribute("src");
n&&-1!=n.indexOf("/mp/videoplayer")&&setTimeout(function(e){
return function(){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4);
2==e.getAttribute("ori_status")&&(i+=d.mpVideoBotH),e.setAttribute("width",t),e.setAttribute("height",i);
};
}(o),100);
}
},!1),window.resetMpVideoH=function(e){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4);
return 2==e.getAttribute("ori_status")&&(i+=d.mpVideoBotH),e.setAttribute("width",t),
e.setAttribute("height",i),a(e,"position","static","important"),!1;
},window.mpVideoFullScreent=function(e){
d.orientation=window.orientation||0;
var t=window.innerHeight,i=window.innerWidth,o=0;
if(d.checkOri&&90==Math.abs(d.orientation)){
var n=t;
t=i,i=n,o=0;
}
(e.getAttribute("height")!=t||e.getAttribute("width")!=i)&&setTimeout(function(){
a(e,"position","absolute","important"),e.setAttribute("width",i),e.setAttribute("height",t),
setTimeout(function(){
a(e,"position","fixed","important");
},20);
},0);
},window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
n=p[e];
var o=n.getAttribute("src");
o&&(o.indexOf("newappmsgvote")>-1||o.indexOf("appmsgvote")>-1)&&t(n);
}
},"getElementsByClassName"in document)for(var B,E=document.getElementsByClassName("video_iframe"),u=0;B=E.item(u++);)B.setAttribute("scrolling","no"),
B.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var r=e[i];
if(!r||!r.dom)return;
for(var c=r.dom,s=c.offsetHeight,a=0;c&&t!==c;)a+=c.offsetTop,c=c.offsetParent;
d.video_top.push({
start:a+s/2,
end:a+s/2+d.innerHeight,
reported:!1,
vid:r.vid
});
}
o(),m.on(window,"scroll",o);
},0);
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
a.invoke("imagePreview",{
current:e,
urls:t
},function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
});
}
function i(e){
var i=[],a=e.container,n=e.imgs||[];
if(a)for(var o=a.getElementsByTagName("img")||[],p=0,m=o.length;m>p;p++)n.push(o.item(p));
for(var p=0,m=n.length;m>p;p++){
var c=n[p],d=c.getAttribute("data-src")||c.getAttribute("src"),u=c.getAttribute("data-type");
if(d){
for(;-1!=d.indexOf("?tp=webp");)d=d.replace("?tp=webp","");
c.dataset&&c.dataset.s&&d.isCDN()&&(d=d.replace(/\/640$/,"/0"),d=d.replace(/\/640\?/,"/0?")),
d.isCDN()&&(d=s.addParam(d,"wxfrom","3",!0)),e.is_https_res&&(d=d.http2https()),
u&&(d=s.addParam(d,"wxtype",u,!0)),i.push(d),function(e){
r.on(c,"click",function(){
return t(e,i),!1;
});
}(d);
}
}
}
var r=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),s=e("biz_common/utils/url/parse.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
document.domain="qq.com";
var n=window.__moon_report||function(){},o=8,e={
ready:function(e){
var i=function(){
try{
e&&e();
}catch(i){
throw n([{
offset:o,
log:"ready",
e:i
}]),i;
}
};
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",i,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",i),
top.window.document.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(e,i,t){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,i,function(i){
try{
if(t){
t.apply(window,arguments);
var d=i&&i.err_msg?", err_msg-> "+i.err_msg:"";
console.debug("[jsapi] invoke->"+e+d);
}
}catch(r){
throw n([{
offset:o,
log:"invoke",
e:r
}]),r;
}
});
});
},
call:function(e){
this.ready(function(){
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(i){
throw n([{
offset:o,
log:"call",
e:i
}]),i;
}
});
},
on:function(e,i){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(e,function(){
try{
i&&i.apply(window,arguments);
}catch(e){
throw n([{
offset:o,
log:"on",
e:e
}]),e;
}
}):!1;
});
}
};
return e;
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
a.isPc||a.isWp?i(e,"click",o,t,n):i(e,"touchend",o,function(e){
if(-1==a.tsTime||+new Date-a.tsTime>200)return a.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(a.y-n.clientY)<=5&&Math.abs(a.x-n.clientX)<=5?t.call(this,e):void 0;
},n);
}
function t(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function n(e,n,i){
for(;e&&!t(e,n);)e=e!==i&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function i(t,i,o,r,c){
var s,d,u;
return"input"==i&&a.isPc,t?("function"==typeof o&&(c=r,r=o,o=""),"string"!=typeof o&&(o=""),
t==window&&"load"==i&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==i?e(t,r,c,o):(s=function(e){
var t=r(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},o&&"."==o.charAt(0)&&(u=function(e){
var i=e.target||e.srcElement,r=n(i,o,t);
return r?(e.delegatedTarget=r,s(e)):void 0;
}),d=u||s,r[i+"_handler"]=d,t.addEventListener?void t.addEventListener(i,d,!!c):t.attachEvent?void t.attachEvent("on"+i,d,!!c):void 0)):void 0;
}
function o(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var r=navigator.userAgent,a={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r),
tsTime:-1
};
return a.isPc||i(document,"touchstart",function(e){
var t=e.changedTouches[0];
a.x=t.clientX,a.y=t.clientY,a.tsTime=+new Date;
}),{
on:i,
off:o,
tap:e
};
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(e){
"use strict";
function o(e){
var o=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",e.scene,"&ori_username=",source_username,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(o+="&from=sougou");
var t=new Image;
t.src=o.substr(0,1024);
}
function t(){
var e=__appmsgCgiData;
if("2"==e.copyright_stat){
for(var o=r("copyright_info"),t=r("js_article");o&&t!==o;)c.copyright_top+=o.offsetTop,
o=o.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+c.innerHeight>c.copyright_top&&(o({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(e){
return document.getElementById(e);
}
var i=e("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:o,
card_pv_report:t
};
});define("appmsg/cache.js",["biz_wap/jsapi/core.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function i(){
o();
}
function n(e,i,n,o){
0>o||setTimeout(function(){
"avg"==e?a.setAvg(i,n,o):a.setSum(i,n,o),a.send();
},1150);
}
function o(){
var e=write_sceen_time-window.logs.pagetime.html_begin,i=Math.random()>=.8,o=!1;
try{
var a=t(decodeURIComponent(window.uin));
o=Math.ceil(a/100)%2!=0?!0:!1;
}catch(s){
o=!1;
}
if(window.isInWeixinApp()&&o){
for(var m=(location.href.replace(/\&key\=.*$/g,"#rd"),[]),f=document.getElementsByTagName("link"),u=0;u<f.length;u++)"stylesheet"==f[u].rel&&m.push(f[u].href);
r.invoke("cache",{
disable:!1,
appId:c,
resourceList:m
},function(o){
o&&"cache:ok"==o.err_msg&&i&&n("avg",27822,49,e);
});
}else window.isInWeixinApp()&&i&&n("avg",27822,47,e);
}
function t(e){
var i,n,o,t,r={},a=0,c=0,s="",m=String.fromCharCode,f=e.length,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(i=0;64>i;i++)r[u.charAt(i)]=i;
for(o=0;f>o;o++)for(n=r[e.charAt(o)],a=(a<<6)+n,c+=6;c>=8;)((t=a>>>(c-=8)&255)||f-2>o)&&(s+=m(t));
return s;
}
var r=e("biz_wap/jsapi/core.js"),a=e("biz_common/utils/monitor.js"),c="wx3be6367203f983ac";
i();
});define("appmsg/pay_for_reading.js",["biz_common/dom/class.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/pay.js","biz_common/utils/spin.js"],function(e,t,a,s){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function o(e){
e&&(e.style.display="none");
}
function i(e){
u=!0,p.addClass(l.pay,"disabled"),n(l.toast),d({
url:"/mp/payforread?action=pay",
type:"POST",
data:{
appmsgid:appmsgid,
__biz:biz,
idx:idx,
fee:e,
timestamp:pay_timestamp
},
success:function(e){
try{
e=JSON.parse(e);
}catch(t){
e={},_.src="/mp/jsreport?key=42&content=type:jsonparseerr&r="+Math.random();
}
if(e&&e.base_resp){
var a=+e.base_resp.ret;
if(0==a)r(e.package_info);else{
switch(u=!1,a){
case-6:
s("操作过于频繁，请稍后重试");
break;

case 155001:
n(l.tips),c.on(l.tipsOK,"touchend",function i(t){
o(l.tips),r(e.package_info),t.preventDefault(),c.off(l.tipsOK,"touchend",i);
});
break;

case 155002:
s("重复付费");
break;

case 155003:
s("该文章已关闭付费，可以免费阅读了"),location.reload();
break;

case 155004:
s("该帐号已被封，不能进行支付");
break;

case 155005:
s("该文章已被删除");
break;

case 155006:
s("该文章已被取消原创声明，不需要支付");
break;

case 268502026:
s("你今日的微信支付已达上限，请择日再付费");
break;

case 268502027:
s("该公众号已达到微信支付的收款最高限额，不能再进行付费");
break;

case 268502028:
s("该公众号今日的收款额度已达上限，请择日再付费");
break;

case 268502029:
s("该公众号已达到微信支付的收款限额，不能再进行付费");
break;

default:
s("系统错误，请重试");
}
_.src="/mp/jsreport?key=42&content=type:resperr;ret:"+a+"&r="+Math.random();
}
}
},
error:function(){
u=!1,s("系统错误，请重试"),_.src="/mp/jsreport?key=42&content=type:ajaxerr&r="+Math.random();
},
complete:function(){
p.removeClass(l.pay,"disabled"),o(l.toast);
}
});
}
function r(e){
e.success=function(){
u=!1,location.reload();
},e.error=function(e){
u=!1,-1==e.indexOf(":cancel")&&(_.src="/mp/jsreport?key=43&content=type:jsapierr;msg:"+e+"&r="+Math.random());
},m.pay(e);
}
if(document.getElementById("js_pay_area")){
var p=e("biz_common/dom/class.js");
if(!window.uin||!window.key||!/micromessenger/i.test(window.navigator.userAgent)||/WindowsWechat/i.test(window.navigator.userAgent))return document.getElementById("js_pay_desc").innerText="文章已设置需要付费才能阅读，请在手机微信内进行付费",
void p.addClass(document.getElementById("js_pay_btn"),"disabled");
var c=e("biz_common/dom/event.js"),d=e("biz_wap/utils/ajax.js"),m=e("biz_wap/jsapi/pay.js"),y=e("biz_common/utils/spin.js"),l={
pay:document.getElementById("js_pay_btn"),
tips:document.getElementById("js_pay_tips"),
tipsOK:document.getElementById("js_pay_tips_ok"),
toast:document.getElementById("js_pay_toast")
},u=!1,_=new Image;
!function(){
{
var e=document.getElementById("js_pay_spinner");
new y({
top:"38%",
lines:10,
width:4,
length:8,
radius:8,
color:"#FFF"
}).spin(e);
}
}(),c.on(l.pay,"tap",function(){
i(pay_fee);
});
}
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/a_tpl.html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","biz_wap/utils/storage.js","rt/appmsg/getappmsgext.rt.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","appmsg/iframe.js"],function(require,exports,module,alert){
"use strict";
function saveCopy(e){
var t={};
for(var i in e)if(e.hasOwnProperty(i)){
var r=e[i],a=typeof r;
r="string"==a?r.htmlDecode():r,"object"==a&&(r=saveCopy(r)),t[i]=r;
}
return t;
}
function img_copyright(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,o=i.length;o>n;n++){
var s=i[n];
if(2==s.type){
if(2==r&&a==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_username:s.source_username||"",
source_sn:s.sn||""
};
}
}
for(var p=document.getElementsByTagName("img"),n=0,o=p.length;o>n;n++){
var s=p[n],d=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[d]){
var m=document.createElement("div");
m.innerHTML=TMPL.tmpl(img_copyright_tpl,t[d]);
{
var c=m.children[0],l=s.parentNode,_=l.insertBefore(c,s),f=_.childNodes[0];
(function(e){
DomEvent.on(_,"click",function(){
location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&username="+e.source_username+"&sn="+e.source_sn+"&scene=2#wechat_redirect";
});
})(t[d]);
}
_.insertBefore(s,f);
}
}
}
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,i,r,a=0,n=vedio_iframes.length;n>a;++a)t=vedio_iframes[a],
i=t.iframe,r=t.src,e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",r);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var i=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=i;
for(var a=0;i>a;++a){
var n=null,o=r[a];
if(o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
ticket:o.ticket,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt||2==o.pt&&o.app_info){
var s=o.app_info.down_count||0,p=o.app_info.app_size||0,d=o.app_info.app_name||"",m=o.app_info.category,c=["万","百万","亿"];
if(s>=1e4){
s/=1e4;
for(var l=0;s>=10&&2>l;)s/=100,l++;
s=s.toFixed(1)+c[l]+"次";
}else s=s.toFixed(1)+"次";
p>=1024?(p/=1024,p=p>=1024?(p/1024).toFixed(2)+"MB":p.toFixed(2)+"KB"):p=p.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var _=["-","(",":",'"',"'","：","（","—","“","‘"],f=-1,u=0,g=_.length;g>u;++u){
var w=_[u],h=d.indexOf(w);
-1!=h&&(-1==f||f>h)&&(f=h);
}
-1!=f&&(d=d.substring(0,f)),o.app_info._down_count=s,o.app_info._app_size=p,o.app_info._category=m,
o.app_info.app_name=d,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
url:o.url,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(105==o.pt){
var v=o.card_info.card_id||"",y=o.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=o.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(j){
y="{}";
}
n={
card_id:v,
card_ext:y,
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
rl:o.rl,
tid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var x=o.image_url;
require("appmsg/cdn_img_lib.js");
var b=require("biz_common/utils/url/parse.js");
x&&x.isCDN()&&(x=x.replace(/\/0$/,"/640"),x=x.replace(/\/0\?/,"/640?"),o.image_url=b.addParam(x,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var k=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(z.style.display="block",DomEvent.off(window,"scroll",k));
},q=document.getElementById("js_bottom_ad_area"),z=document.getElementById("js_top_ad_area"),E=adDatas.ads;
for(var I in E)if(0==I.indexOf("pos_")){
var n=E[I],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)q.innerHTML=TMPL.tmpl(a_tpl,o);else if(1==o.pos_type){
z.style.display="none",z.innerHTML=TMPL.tmpl(a_tpl,o),DomEvent.on(window,"scroll",k);
var D=0;
window.localStorage&&(D=1*localStorage.getItem(I)||0),window.scrollTo(0,D),k(D);
}
}
require("appmsg/a.js");
}
var O=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=O),O.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",O.liked&&Class.addClass(t,"praised"),
t.setAttribute("like",O.liked?"1":"0");
var i=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=O.read_num,n=O.like_num;
a||(a=1),n||(n="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(n)>1e5?n="100000+":"",
r&&(r.innerHTML=a),i&&(i.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&require("appmsg/comment.js"),
-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0),
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:rtGetAppmsgExt,
async:!0,
success:function(e){
if(e)try{
if(e&&e.base_resp&&e.base_resp.wxtoken&&(window.wxtoken=e.base_resp.wxtoken),window.fromWeixinCached&&require("appmsg/iframe.js"),
fillVedio(e.appmsgticket?e.appmsgticket.ticket:""),img_copyright(e),e.ret)return;
var t={};
if(0==is_need_ad)t=_adInfo,t||(t={
advertisement_num:0
});else{
if(e.advertisement_num>0&&e.advertisement_info){
var i=e.advertisement_info;
t.advertisement_info=saveCopy(i);
}
t.advertisement_num=e.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=t),fillData({
adRenderData:t,
appmsgstat:e.appmsgstat,
comment_enabled:e.comment_enabled,
reward:{
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp
}
});
}catch(r){
var a=new Image;
return a.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(r.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(r));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var r=30,a=34,n=Math.floor(.9*(e-r)/a);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=n*a+"px"),
getCountPerLine=function(){
return n;
},n;
}
require("biz_common/utils/string/html.js");
var a_tpl=require("appmsg/a_tpl.html.js"),img_copyright_tpl=require("appmsg/img_copyright_tpl.html.js"),iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rtGetAppmsgExt=require("rt/appmsg/getappmsgext.rt.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^https:/,location.protocol),
src=src.replace(/^http:/,location.protocol),src=src.replace(/preview.html/,"player.html"),
realsrc=realsrc.replace(/^https:/,location.protocol),realsrc=realsrc.replace(/^http:/,location.protocol),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar3"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,r=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),n=Math.max(s.bottom*e,n),
r=Math.max(s.top*e,r);
}
for(var l=+new Date,d=[],u=this.sw,f=this,w=0,p=t.length;p>w;w++)!function(t,e){
var s=t.el.offsetTop,l=t.src;
if(l){
var f=r,w=n;
-1!=l.indexOf("wx_fmt=gif")&&c&&(f=0,w=20),!t.show&&(i>=s&&i<=s+t.height+f||s>i&&i+o+w>s)&&(e.inImgRead&&(i>=s&&i<=s+t.height||s>i&&i+o>s)&&e.inImgRead(l,networkType),
e.changeSrc&&(l=e.changeSrc(t.el,l)),t.el.onerror=function(){
var t=this;
!!e.onerror&&e.onerror(l,t);
},t.el.onload=function(){
var t=this;
h(t,"height","auto","important"),t.getAttribute("_width")?h(t,"width",t.getAttribute("_width"),"important"):h(t,"width","auto","important"),
!!e.onload&&e.onload(l,t);
},m(t.el,"src",l),d.push(l),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>u&&(t.el.width=u);
}
}(t[w],f);
d.length>0&&this.detect&&this.detect({
time:l,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,r=0;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var s=0,d=t.length;d>s;s++){
var c=t.item(s),u=m(c,n);
if(u){
var f=100;
if(c.dataset&&c.dataset.ratio){
var w=1*c.dataset.ratio,p=1*c.dataset.w||a;
"number"==typeof w&&w>0?(p=a>=p?p:a,f=p*w,c.style.width&&c.setAttribute("_width",c.style.width),
h(c,"width",p+"px","important"),h(c,"visibility","visible","important"),c.setAttribute("src",l)):h(c,"visibility","hidden","important");
}else h(c,"visibility","hidden","important");
h(c,"height",f+"px","important"),e.push({
el:c,
src:u,
height:f,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
r.on(window,"scroll",function(i){
o.call(t,i);
}),r.on(window,"load",function(i){
e.call(t,i);
}),r.on(document,"touchmove",function(i){
o.call(t,i);
});
}
var a=t("biz_wap/utils/mmversion.js"),r=t("biz_common/dom/event.js"),s=t("biz_common/dom/attr.js"),m=s.attr,h=s.setProperty,l=t("biz_common/ui/imgonepx.js"),d=new Date,c=(d.getHours(),
!0);
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});