define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js"],function(require,exports,module){
"use strict";
function like_report(e){
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0;
ajax({
url:"/mp/appmsg_like?__biz="+biz+"&mid="+mid+"&idx="+idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
type:"POST",
success:function(res){
var data=eval("("+res+")");
0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,"praised"),el_like.setAttribute("like",0),
likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,"praised"),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),el_toolbar=document.getElementById("js_toobar3");
if(el_toolbar&&el_toolbar.querySelector){
var el_like=el_toolbar.querySelector("#like3"),el_likeNum=el_toolbar.querySelector("#likeNum3"),el_readNum=el_toolbar.querySelector("#readNum3");
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
}
});define("appmsg/a.js",["biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","biz_wap/jsapi/core.js","a/profile.js","a/android.js","a/ios.js","a/gotoappdetail.js"],function(require,exports,module){
"use strict";
function ad_click(e,t,a,i,o,n,p,r,s,d,_,l,c,m){
if(!has_click[o]){
has_click[o]=!0;
var u=document.getElementById("loading_"+o);
u&&(u.style.display="inline"),AdClickReport({
click_pos:1,
report_type:2,
type:e,
url:encodeURIComponent(t),
tid:o,
rl:encodeURIComponent(a),
__biz:biz,
pos_type:d,
pt:s,
pos_x:c,
pos_y:m
},function(){
if(has_click[o]=!1,u&&(u.style.display="none"),"5"==e)location.href="/mp/profile?source=from_ad&tousername="+t+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o;else{
if("105"==s&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if(0==t.indexOf("https://itunes.apple.com/")||0==t.indexOf("http://itunes.apple.com/")){
var a=require("biz_wap/jsapi/core.js");
return a.invoke("downloadAppInternal",{
appUrl:t
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(t)+"&ticket="+n+"&uin="+uin);
}),!1;
}
if(-1==t.indexOf("mp.weixin.qq.com"))t="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t);else if(-1==t.indexOf("mp.weixin.qq.com/s")&&-1==t.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:s,
aid:r,
ad_engine:_,
pos_type:d
},p=window.__report;
if("104"==s&&l||-1!=t.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var c="",m="";
l&&(c=l.pkgname&&l.pkgname.replace(/\./g,"_"),m=l.channel_id||""),i={
source:4,
traceid:o,
mid:mid,
idx:idx,
appuin:biz,
pt:s,
channel_id:m,
aid:r,
engine:_,
pos_type:d,
pkgname:c
};
}
t=URL.join(t,i),(0==t.indexOf("http://mp.weixin.qq.com/promotion/")||0==t.indexOf("https://mp.weixin.qq.com/promotion/"))&&(t=URL.join(t,{
traceid:o,
aid:r,
engine:_
})),!r&&p&&p(80,t);
}
location.href=t;
}
});
}
}
var js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),pos_type=window.pos_type||0,adDatas=window.adDatas,__report=window.__report,total_pos_type=2,el_gdt_areas={
pos_1:js_top_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_1:js_top_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
};
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger"))return js_top_ad_area.style.display="none",
js_bottom_ad_area.style.display="none",!1;
var has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("appmsg/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),ping_apurl={
pos_0:!1,
pos_1:!1
},ping_test_apurl={
pos_0:[],
pos_1:[]
},ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0;
if(adDatas.num>0){
var onScroll=function(){
for(var scrollTop=window.pageYOffset||document.documentElement.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl,pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop;
adDatas.ads[pos_key].ad_engine=0,-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),
function(){
try{
var e=window.__report,t=ping_test_apurl[pos_key],a=new Date,i=a.getHours(),o=ping_test_apurl_random&&i>=12&&18>=i&&0==pos_type;
!t[0]&&o&&scrollTop+innerHeight>offsetTop&&(t[0]=!0,e(81)),!t[1]&&o&&scrollTop+innerHeight>offsetTop+40&&(t[1]=!0,
e(82));
}catch(n){}
}(),ping_apurl[pos_key]||(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop))&&(ping_apurl[pos_key]=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1&&DomEvent.off(window,"scroll",onScroll);
},
async:!0
}));
}
}(i);
};
DomEvent.on(window,"scroll",onScroll),onScroll();
}
for(var keyOffset="https:"==top.location.protocol?5:0,i=0;total_pos_type>i;++i)!function(e){
var t="pos_"+e,a=el_gdt_areas[t];
if(!a.getElementsByClassName)return a.style.display="none",!1;
var i=a.getElementsByClassName("js_ad_link")||[],o=adDatas.ads[t];
if(o){
for(var n=o.adData,p=o.a_info,r=p.pos_type,s=o.ad_engine,d=0,_=i.length;_>d;++d)!function(e,t){
var a=i[e],o=a.dataset;
if(o){
var n=o.type,p=o.url,d=o.rl,_=o.apurl,l=o.tid,c=o.ticket,m=o.group_id,u=o.aid,g=o.pt;
DomEvent.on(a,"click",function(e){
var a=!!e&&e.target;
if(!a||!a.className||-1==a.className.indexOf("js_ad_btn")){
var i,o;
return i=position.getX(a,"js_ad_link extra_link")+e.offsetX,o=position.getY(a,"js_ad_link extra_link")+e.offsetY,
ad_click(n,p,d,_,l,c,m,u,g,r,s,t,i,o),!1;
}
},!0);
}
}(d,n);
if(n){
n.adid=window.adid||n.adid;
var l="&tid="+n.traceid+"&uin="+uin+"&key="+key+"&ticket="+(n.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+n.adid+"&ad_engine="+s+"&pos_type="+r+"&r="+Math.random();
if(n.report_param=l,"100"==n.pt){
var c=require("a/profile.js");
return void new c({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:n,
pos_type:r,
report_param:l
});
}
if("102"==n.pt){
var m=require("a/android.js"),u=15,g=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new m({
btn:document.getElementById("js_app_action_"+r),
adData:n,
report_param:l,
task_ext_info:[n.adid,n.traceid,g,source,u,s].join("."),
via:[n.traceid,n.adid,g,source,u,s].join(".")
});
}
if("101"==n.pt){
var f=require("a/ios.js");
return void new f({
btn:document.getElementById("js_app_action_"+r),
adData:n,
ticket:n.ticket,
report_param:l
});
}
if("103"==n.pt||"104"==n.pt){
var y=require("a/gotoappdetail.js"),u=15,g=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:n,
report_param:l,
pos_type:r,
via:[n.traceid,n.adid,g,source,u,s].join("."),
ticket:n.ticket,
appdetail_params:["&aid="+n.adid,"traceid="+n.traceid,"pkgname="+g,"source="+source,"type="+u,"engine="+s,"appuin="+biz,"pos_type="+r,"ticket="+n.ticket,"scene="+scene].join("&")
});
}
if("105"==n.pt)return void new Card({
btn:document.getElementById("js_card_action_"+r),
adData:n,
report_param:l,
pos_type:r
});
}
}
}(i);
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+top.window.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function o(){
return document.domain="qq.com",-1!=top.location.href.indexOf("&_newvideoplayer=0")?!1:-1!=top.location.href.indexOf("&_newvideoplayer=1")?!0:top.window.use_tx_video_player?!1:a.canSupportVideo&&_.inWechat?_.is_ios||_.is_android&&_.is_x5?!0:!1:(top.window._hasReportCanSupportVideo||a.canSupportVideo||!_.inWechat||(top.window._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function n(){
{
var e=top.location.href;
top.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=top.sn&&"f62e1cb98630008303667f77c17c43d7"!=top.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=top.sn?-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==top.window.appmsg_type?!1:top.window.__appmsgCgiData.can_use_page&&(_.is_ios||_.is_android)?!0:r.showAd()?!0:!1:!1;
}
function t(){
var e=top.location.href;
return top.window.user_uin?-1!=e.indexOf("&_proxy=1")?!0:-1!=e.indexOf("&_proxy=0")?!1:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:_.inWechat&&_.is_android&&_.is_x5&&_.wechatVer>="6.2.2"?!0:_.inWechat&&_.is_ios&&(-1!=w.indexOf("MicroMessenger/6.2.4")||_.wechatVer>="6.2.4")?!0:!1:!1;
}
function s(){
return c.networkType;
}
var d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/device.js"),r=e("new_video/ctl.js"),w=top.window.navigator.userAgent,c={
networkType:""
},_={};
return function(e){
var i=a.os;
_.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),_.is_android=!!i.android,_.is_wp=!!i.phone,
_.is_pc=!(i.phone||!i.Mac&&!i.windows),_.inWechat=/MicroMessenger/.test(e),_.is_android_phone=_.is_android&&/Mobile/i.test(e),
_.is_android_tablet=_.is_android&&!/Mobile/i.test(e),_.ipad=/iPad/i.test(e),_.iphone=!_.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
_.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var o=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
_.wechatVer=o&&o[1]||0,d.on(window,"load",function(){
if(""==c.networkType&&_.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
c.networkType=e[i.err_msg]||"fail";
});
}
},!1);
}(top.window.navigator.userAgent),"undefined"==typeof top.window._hasReportCanSupportVideo&&(top.window._hasReportCanSupportVideo=!1),
{
device:_,
isShowMpVideo:o,
isUseProxy:t,
isUseAd:n,
getNetworkType:s
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/tmpl.js",[],function(){
"use strict";
var n=function(n,t){
var r=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return r(t);
},t=function(t,r){
var e=document.getElementById(t);
return e?n(e.innerHTML,r):"";
};
return{
render:t,
tmpl:n
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("appmsg/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n    <div class="rich_tips with_line title_tips">\n        <span class="tips">广告</span>\n    </div>\n    <# } #>\n    <div class="js_ad_link extra_link" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>">\n        <# if(pt==1){ #>\n        <#=hint_txt#>\n        <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n        <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n        <# }else if(pt==2){ #>\n        <!--第三方logo-->\n        <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n        <div class="brand_logo"><img src="<#=logo#>" alt="logo图片"></div>\n        <# } #>\n        <img class="appmsg_banner" src="<#=image_url#>">\n        <# if(watermark_type!=0){ #><i class="promotion_tag"><# if(watermark_type==1){ #>商品推广<# }else if (watermark_type==2){ #>活动推广<# }else if (watermark_type==3){ #>应用下载<# } #></i><# } #>\n        <# }else if(pt==7){ #>\n        <!-- 图文 -->\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_group_title2"><#=hint_txt#></strong>\n                    <div class="preview_group_desc"><#=ad_desc#></div>\n                    <img src="<#=image_url#>" alt="" class="preview_card_avatar">\n                </div>\n                <i class="promotion_tag">活动推广</i>\n            </div>\n        </div>\n        <# }else if(pt==100){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <# if(!!biz_info.head_img){ #>\n                    <img src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius">\n                    <# }else{ #>\n                    <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>">\n                    <# } #>                                 \n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn" href="javascript:void(0);">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn" href="javascript:void(0);">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==102){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download" href="javascript:void(0);">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==101){ #>\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">                            \n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar">                               \n                </div>\n                <div class="preview_group_opr">\n                    <a href="javascript:void(0);" id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn">下载</a>\n                </div>\n            </div>                        \n        </div>\n        <# }else if(pt==103||pt==104){ #>\n        <div class="preview_group obvious_app">\n            <div class="preview_group_inner">\n                <div class="pic_app">\n                    <img src="<#=image_url#>" alt="">\n                </div>\n                <div class="info_app">\n                    <p class="name_app"><#=app_info.app_name#></p>\n                    <# if(pt==103){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                    <# } else if(pt==104){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                    <# } #>\n                    <!--星级评分-->\n                    <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                        <!--\n                            半星：star_half\n                            一星：star_one\n                            一星半：star_one_half\n                            二星：star_two\n                            三星：star_three\n                            四星：star_four\n                            五星：star_five\n                        -->\n                        <span class="js_stars stars" style="display:none;"></span>\n                        <!--暂无评分\n                        <span class="scores">3.5</span>\n                        -->\n                        <span class="js_scores scores"></span>\n                    </p>\n                    <div class="dm_app">\n                        <a href="javascript:void(0);" id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn">下载</a>\n                        <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                    </div>\n                </div>\n            </div>            \n        </div>\n        <# }else if(pt==105){ #>\n        <div class="mpda_card cardticket">\n            <div class="cardticket_hd cell">\n                <div class="cell_hd">\n                    <span class="radius_avatar">\n                        <img class="avatar" src="<#=card_info.card_logo_url#>">\n                    </span>\n                </div>\n                <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                <div class="cell_ft">\n                    <a href="javascript:void(0);"  class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                </div>\n            </div>\n            <div class="cardticket_ft">\n                <div class="cardticket_theme"></div>\n                <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n            </div>\n        </div>\n        <# } #>\n    </div>\n</div>\n';
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js","biz_common/utils/respTypes.js"],function(require,exports,module,alert){
"use strict";
function joinUrl(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof top.window.devicetype&&(t.devicetype=top.window.devicetype),
"undefined"!=typeof top.window.clientversion&&(t.clientversion=top.window.clientversion),
t.x5=isx5?"1":"0",Url.join(e,t);
}
function reportRt(e,t,r){
var o="";
if(r&&r.length){
var s=1e3,n=r.length,a=Math.ceil(n/s);
o=["&lc="+a];
for(var i=0;a>i;++i)o.push("&log"+i+"=[rtCheckError]["+i+"]"+encodeURIComponent(r.substr(i*s,s)));
o=o.join("");
}
var _,c="idkey="+e+"_"+t+"_1"+o+"&r="+Math.random();
if(window.ActiveXObject)try{
_=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
_=new ActiveXObject("Microsoft.XMLHTTP");
}catch(p){
_=!1;
}
}else window.XMLHttpRequest&&(_=new XMLHttpRequest);
_&&(_.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),_.setRequestHeader("cache-control","no-cache"),
_.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
_.setRequestHeader("X-Requested-With","XMLHttpRequest"),_.send(c));
}
function debuglog(e,t,r,o){
console.debug("[ajax] status->"+t+", time->"+r+"ms, msg->"+o+", url->"+e);
}
function setReqList(e,t,r){
return window.__DEBUGINFO?(window.__DEBUGINFO.res_list||(window.__DEBUGINFO.res_list=[]),
window.__DEBUGINFO.res_list[e]?(window.__DEBUGINFO.res_list[e][t]=r,!0):!1):!1;
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url=joinUrl(obj.url),mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
var startTime=+new Date,resListIndex=-1;
window.__DEBUGINFO&&(__DEBUGINFO.res_list||(__DEBUGINFO.res_list=[]),__DEBUGINFO.res_list.push({
type:"xhr",
status:"pendding",
start:startTime,
end:0,
url:url
}),resListIndex=__DEBUGINFO.res_list.length-1),xhr.open(type,url,async),xhr.onreadystatechange=function(){
if(setReqList(resListIndex,"end",+new Date),setReqList(resListIndex,"status","readyState:"+xhr.readyState),
3==xhr.readyState&&(setReqList(resListIndex,"status","received"),obj.received&&obj.received(xhr)),
4==xhr.readyState){
var costTime=+new Date-startTime;
xhr.onreadystatechange=null;
var status=xhr.status;
if(setReqList(resListIndex,"status",status),status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url);
}catch(e){
return obj.error&&obj.error(xhr),void setReqList(resListIndex,"status","parseError");
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+top.location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
}catch(e){
obj.error&&obj.error();
}
}
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7;
return Ajax;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("sougou/index.js",["appmsg/emotion/emotion.js","biz_wap/utils/ajax.js","biz_common/tmpl.js","biz_common/dom/event.js","biz_common/utils/string/html.js","sougou/a_tpl.html.js","appmsg/cmt_tpl.html.js"],function(e){
"use strict";
function t(e){
var t=document.getElementById("js_cover"),n=[];
t&&n.push(t);
var o=document.getElementById("js_content");
if(o)for(var l=o.getElementsByTagName("img")||[],i=0,r=l.length;r>i;i++)n.push(l.item(i));
for(var s=[],i=0,r=n.length;r>i;i++){
var m=n[i],a=m.getAttribute("data-src")||m.getAttribute("src");
a&&(s.push(a),function(t){
d.on(m,"click",function(){
return"ios"==e?window.JSInvoker&&window.JSInvoker.openImageList&&window.JSInvoker.openImageList(JSON.stringify({
index:t,
array:s
})):JSInvoker&&JSInvoker.weixin_openImageList&&window.JSInvoker.weixin_openImageList(JSON.stringify({
index:t,
array:s
})),!1;
});
}(i));
}
}
function n(e){
if(e&&e.length>0&&(document.getElementById("sg_tj").style.display="block",document.getElementById("sg_tj").innerHTML=c.tmpl(g,{
list:e
}),document.querySelectorAll))for(var t in document.querySelectorAll(".sg_link"))d.on(document.querySelectorAll(".sg_link")[t],"click",function(e){
a({
url:s,
type:"post",
async:!0,
data:{
param:JSON.stringify({
page_url:window.location.href,
page_title:msg_title,
click_url:e.target.href,
click_title:e.target.text
})
},
success:function(){},
error:function(){}
});
});
}
function o(){
var e="/mp/getcomment?";
for(var t in sg_data)e+=t+"="+encodeURIComponent(sg_data[t])+"&";
a({
url:e,
type:"get",
async:!0,
success:function(e){
var t=window.eval.call(window,"("+e+")"),n=t.base_resp&&t.base_resp.ret;
if(0==n){
var o=document.createDocumentFragment(),i=t.comment;
i&&i.length?l(i,o,"elected"):document.getElementById("sg_cmt_area").style.display="none",
document.getElementById("sg_readNum3").innerHTML=parseInt(t.read_num)>=1e5?"100000+":t.read_num,
document.getElementById("sg_likeNum3").innerHTML=t.like_num;
}else document.getElementById("sg_cmt_area").style.display="none",document.getElementById("js_sg_bar").style.display="none";
}
});
}
function l(e,t,n){
for(var o,l,r="",s=document.createElement("div"),a="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d=0;l=e[d];++d)l.time=i(l.create_time),
l.status="",l.logo_url=l.logo_url||a,l.logo_url=-1!=l.logo_url.indexOf("wx.qlogo.cn")?l.logo_url.replace(/\/132$/,"/96"):l.logo_url,
l.content=m.encode(l.content.htmlDecode().htmlEncode()),l.nick_name=l.nick_name.htmlDecode().htmlEncode(),
l.like_num_format=parseInt(l.like_num)>=1e4?(l.like_num/1e4).toFixed(1)+"万":l.like_num,
l.reply=l.reply||{
reply_list:[]
},l.is_elected="elected"==n?1:l.is_elected,l.is_from_me=0,l.is_from_friend=0,l.reply.reply_list.length>0&&(l.reply.reply_list[0].time=i(l.reply.reply_list[0].create_time),
l.reply.reply_list[0].content=m.encode((l.reply.reply_list[0].content||"").htmlEncode())),
r+=c.tmpl(u,l);
for(s.innerHTML=r;o=s.children.item(0);)t.appendChild(o);
document.getElementById("sg_cmt_list").appendChild(t),document.getElementById("sg_cmt_main").style.display="block",
document.getElementById("sg_cmt_loading").style.display="none",document.getElementById("sg_cmt_statement").style.display="block",
document.getElementById("sg_cmt_qa").style.display="block";
}
function i(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,l=n/1e3-e,i=new Date(n).getFullYear(),r=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>l?Math.floor(o/60/60)+"小时前":172800>l?"昨天":604800>l?Math.floor(l/24/60/60)+"天前":r.getFullYear()==i?r.getMonth()+1+"月"+r.getDate()+"日":r.getFullYear()+"年"+(r.getMonth()+1)+"月"+r.getDate()+"日";
}
var r="/mp/getrelatedmsg",s="/mp/reportclick",m=e("appmsg/emotion/emotion.js");
m.init();
var a=e("biz_wap/utils/ajax.js"),c=e("biz_common/tmpl.js"),d=e("biz_common/dom/event.js");
e("biz_common/utils/string/html.js");
var g=e("sougou/a_tpl.html.js"),u=e("appmsg/cmt_tpl.html.js");
if(document.getElementById("js_report_article3").style.display="none",document.getElementById("js_toobar3").style.display="none",
navigator.userAgent.toLowerCase().match(/ios/)){
var _=navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
if(_&&_[1]){
var p=_[1].replace(/\./g,"");
parseInt(p)>422&&t("ios");
}
}else t("android");
a({
url:r+"?url="+encodeURIComponent(window.location.href)+"&title="+encodeURIComponent(msg_title),
type:"get",
async:!0,
success:function(e){
var e=JSON.parse(e);
0==e.base_resp.ret&&n(e.article_list.slice(0,3));
},
error:function(){}
}),o(),window.onerror=function(e){
var t=new Image;
t.src="/mp/jsreport?key=86&content="+e+"&r="+Math.random();
};
});define("biz_wap/safe/mutation_observer_report.js",[],function(){
"use strict";
window.addEventListener&&window.addEventListener("load",function(){
try{
var e=window.__observer.takeRecords();
window.__observer.disconnect();
var o=window.__observer_data;
if(e&&e.length){
o.count++;
var t=new Date;
e.forEach(function(e){
for(var t=e.addedNodes,n=0;n<t.length;n++){
var r=t[n];
if("SCRIPT"===r.tagName){
var a=r.src;
a&&!/qq\.com/.test(a)&&o.list.push(a);
}
}
}),o.exec_time+=new Date-t;
}
for(var n=window.moon&&moon.moonsafe_id||29715,r=window.moon&&moon.moonsafe_key||0,a=[],s={},c=function(e){
return"[object Array]"==Object.prototype.toString.call(e);
},i=function(e,o,t){
t=t||1,s[e]||(s[e]=0),s[e]+=t,o&&(c(o)?a=a.concat(o):a.push(o)),setTimeout(function(){
d();
},1500);
},d=function(){
var e=[],o=a.length,t=["r="+Math.random()];
for(var c in s)s.hasOwnProperty(c)&&e.push(n+"_"+(1*c+1*r)+"_"+s[c]);
for(var c=0;o>c&&!(c>=10);++c)t.push("log"+c+"="+encodeURIComponent(a[c]));
if(!(0==e.length&&t.length<=1)){
var i,u="idkey="+e.join(";")+"&lc="+(t.length-1)+"&"+t.join("&");
if(window.ActiveXObject)try{
i=new ActiveXObject("Msxml2.XMLHTTP");
}catch(f){
try{
i=new ActiveXObject("Microsoft.XMLHTTP");
}catch(v){
i=!1;
}
}else window.XMLHttpRequest&&(i=new XMLHttpRequest);
i&&(i.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),i.setRequestHeader("cache-control","no-cache"),
i.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.onreadystatechange=function(){
4===i.readyState&&(a.length>10?(a=a.slice(10),d()):(a=[],s={}));
},a=[],s={},i.send(u));
}
},u=2,f=0;f<o.list.length;f++){
var v=o.list[f],w=["[moonsafe][observer][url]:"+location.href,"[moonsafe][observer][src]:"+v,"[moonsafe][observer][ua]:"+navigator.userAgent];
o.list.length==f+1&&(w.push("[moonsafe][observer][count]:"+o.count),w.push("[moonsafe][observer][exec_time]:"+o.exec_time+"ms")),
i(u,w);
}
}catch(l){
var m=3,w=["[moonsafe][observer][exception]:"+l];
i(m,w);
}
},!1);
});define("appmsg/report.js",["biz_common/dom/event.js","biz_common/utils/huatuo.js","biz_wap/utils/ajax.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),r=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(r=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==n.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,i=e.length;i>t;++t)if(-1!=n.indexOf(e[t]))return!0;
return!1;
}
var i=window.performance&&window.performance.timing,s=write_sceen_time-r,d=first_sceen__time-r,m=page_endtime-r,w=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-r:void 0,p=window.logs.a8key_ready_time?window.logs.a8key_ready_time-r:void 0,g=i&&i.connectEnd-i.connectStart,c=i&&i.secureConnectionStart&&i.connectEnd-i.secureConnectionStart,u=i&&i.domainLookupEnd&&i.domainLookupStart&&i.domainLookupEnd-i.domainLookupStart;
if(window.logs.pagetime.wtime=s,window.logs.pagetime.ftime=d,window.logs.pagetime.ptime=m,
window.logs.pagetime.jsapi_ready_time=w,window.logs.pagetime.a8key_ready_time=p,
Math.random()<.01){
var l={
28:m,
29:d,
30:s,
31:w,
32:p,
33:g,
34:c
};
o.setFlags(1636,1,1);
for(var f in l)!l[f]||l[f]<0||o.setPoint(f,l[f]);
o.report();
}
if(need_report_cost?a({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1|1|"+m,"1|2|"+d,"1|3|"+s,"1|4|"+w,"1|5|"+p,"1|6|"+g,"1|7|"+c,"1|8|"+u].join(";")
}
}):Math.random()<.01&&a({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["#1|1|"+m,"1|2|"+d,"1|3|"+s,"1|4|"+w,"1|5|"+p,"1|6|"+g,"1|7|"+c,"1|8|"+u].join(";")
}
}),!(Math.random()>.2||0>s||0>d||0>m)){
if(w&&t.setAvg(27822,15,w),p&&t.setAvg(27822,17,p),m>=15e3)return t.setAvg(27822,29,m),
void t.send();
t.setAvg(27822,1,m).setAvg(27822,3,s).setAvg(27822,5,d),window.isWeixinCached&&t.setAvg(27822,19,m),
e()?(t.setAvg(27822,9,m),window.isWeixinCached&&t.setAvg(27822,23,m)):"wifi"==networkType?(t.setAvg(27822,7,m),
window.isWeixinCached&&t.setAvg(27822,21,m)):"2g/3g"==networkType?(t.setAvg(27822,11,m),
window.isWeixinCached&&t.setAvg(27822,25,m)):(t.setAvg(27822,13,m),window.isWeixinCached&&t.setAvg(27822,28,m)),
t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content"),n=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var o=function(){
var a=window.pageYOffset||document.documentElement.scrollTop,r=e.offsetTop;
if(a+n>=r){
for(var d,m,w=t.getElementsByTagName("img"),p={},g=[],c=0,u=0,l=0,f=0,_=w.length;_>f;++f){
var v=w[f];
d=v.getAttribute("data-src")||v.getAttribute("src"),m=v.getAttribute("src"),d&&(d.isCDN()?u++:l++,
c++,p[m]={});
}
if(g.push("1="+1e3*c),g.push("2="+1e3*u),g.push("3="+1e3*l),s.getEntries){
var h=s.getEntries(),y=window.logs.img.download,j=[0,0,0],k=[0,0,0];
c=u=0;
for(var f=0,A=h.length;A>f;++f){
var b=h[f],T=b.name;
T&&"img"==b.initiatorType&&p[T]&&(T.isCDN()&&(k[0]+=b.duration,u++),j[0]+=b.duration,
c++,p[T]={
startTime:b.startTime,
responseEnd:b.responseEnd
});
}
j[0]>0&&c>0&&(j[2]=j[0]/c),k[0]>0&&u>0&&(k[2]=k[0]/u);
for(var f in y)if(y.hasOwnProperty(f)){
for(var E=y[f],M=0,x=0,z=0,C=0,S=0,_=E.length;_>S;++S){
var d=E[S];
if(p[d]&&p[d].startTime&&p[d].responseEnd){
var N=p[d].startTime,W=p[d].responseEnd;
M=Math.max(M,W),x=x?Math.min(x,N):N,d.isCDN()&&(z=Math.max(M,W),C=x?Math.min(x,N):N);
}
}
j[1]+=Math.round(M-x),k[1]+=Math.round(z-C);
}
for(var I=4,P=7,f=0;3>f;f++)j[f]=Math.round(j[f]),k[f]=Math.round(k[f]),j[f]>0&&(g.push(I+f+"="+j[f]),
"wifi"==networkType?g.push(I+f+6+"="+j[f]):"2g/3g"==networkType&&g.push(I+f+12+"="+j[f])),
k[f]>0&&(g.push(P+f+"="+k[f]),"wifi"==networkType?g.push(P+f+6+"="+k[f]):"2g/3g"==networkType&&g.push(P+f+12+"="+k[f]));
}
i.off(window,"scroll",o,!1);
}
};
i.on(window,"scroll",o,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],i=Math.ceil(10*Math.random())-1,n=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",i),e.src="/mp/iframetest?action=page&traceid="+n+"&devicetype="+devicetype+"&timeout="+t[i];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var i=e("biz_common/dom/event.js"),n=navigator.userAgent,o=e("biz_common/utils/huatuo.js"),a=e("biz_wap/utils/ajax.js");
e("appmsg/cdn_img_lib.js"),i.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(i){
networkType=e[i.err_msg],t();
});
}else t();
},!1);
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});