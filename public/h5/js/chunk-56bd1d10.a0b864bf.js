(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56bd1d10"],{"43f5":function(t,e,n){"use strict";var a=n("811b"),r=n.n(a);r.a},5095:function(t,e,n){},5608:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"time"},[t._v("\n  "+t._s(t.tipText)),!0===t.isDay?n("span",{staticClass:"styleAll"},[t._v(t._s(t.day))]):t._e(),n("span",{staticClass:"timeTxt"},[t._v(t._s(t.dayText))]),n("span",{staticClass:"styleAll"},[t._v(t._s(t.hour))]),n("span",{staticClass:"timeTxt"},[t._v(t._s(t.hourText))]),n("span",{staticClass:"styleAll"},[t._v(t._s(t.minute))]),n("span",{staticClass:"timeTxt"},[t._v(t._s(t.minuteText))]),n("span",{staticClass:"styleAll"},[t._v(t._s(t.second))]),n("span",{staticClass:"timeTxt"},[t._v(t._s(t.secondText))])])},r=[],o=(n("c5f6"),{name:"CountDown",props:{tipText:{type:String,default:"倒计时"},dayText:{type:String,default:"天"},hourText:{type:String,default:"时"},minuteText:{type:String,default:"分"},secondText:{type:String,default:"秒"},datatime:{type:Number,default:0},isDay:{type:Boolean,default:!0}},data:function(){return{day:"00",hour:"00",minute:"00",second:"00"}},created:function(){this.show_time()},mounted:function(){},methods:{show_time:function(){var t=this;function e(){var e=t.datatime-Date.parse(new Date)/1e3,n=0,a=0,r=0,o=0;e>0?(n=!0===t.isDay?Math.floor(e/86400):0,a=Math.floor(e/3600)-24*n,r=Math.floor(e/60)-24*n*60-60*a,o=Math.floor(e)-24*n*60*60-60*a*60-60*r,a<=9&&(a="0"+a),r<=9&&(r="0"+r),o<=9&&(o="0"+o),t.day=n,t.hour=a,t.minute=r,t.second=o):(t.day="00",t.hour="00",t.minute="00",t.second="00")}e(),setInterval(e,1e3)}}}),s=o,i=n("2877"),c=Object(i["a"])(s,a,r,!1,null,null,null);e["a"]=c.exports},"811b":function(t,e,n){},adbf:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.domStatus,expression:"domStatus"}],class:[t.posterImageStatus?"noscroll product-con":"product-con"]},[n("ProductConSwiper",{attrs:{imgUrls:t.imgUrls}}),n("div",{staticClass:"nav acea-row row-between-wrapper"},[n("div",{staticClass:"money"},[t._v("\n      ￥"),n("span",{staticClass:"num",domProps:{textContent:t._s(t.storeInfo.price)}}),n("span",{staticClass:"y-money",domProps:{textContent:t._s("￥"+t.storeInfo.price)}})]),n("div",{staticClass:"acea-row row-middle"},[n("div",{staticClass:"times"},[n("div",[t._v("距秒杀结束仅剩")]),n("CountDown",{attrs:{"is-day":!1,"tip-text":"","day-text":"","hour-text":" : ","minute-text":" : ","second-text":"",datatime:t.datatime}})],1),n("div",{staticClass:"iconfont icon-jiantou"})])]),n("div",{staticClass:"wrapperRush"},[n("div",{staticClass:"introduce acea-row row-between"},[n("div",{staticClass:"infor",domProps:{textContent:t._s(t.storeInfo.title)}}),n("div",{staticClass:"iconfont icon-fenxiang",on:{click:t.setPosterImageStatus}})]),n("div",{staticClass:"label acea-row row-middle"},[n("div",{staticClass:"stock",domProps:{textContent:t._s("库存:"+t.storeInfo.stock+"件")}}),n("div",{domProps:{textContent:t._s("销量:"+t.storeInfo.sales+"件")}})])]),n("div",{staticClass:"product-intro"},[n("div",{staticClass:"title"},[t._v("产品介绍")]),n("div",{staticClass:"conter",domProps:{innerHTML:t._s(t.storeInfo.description)}})]),n("div",{staticStyle:{height:"1.2rem"}}),n("div",{staticClass:"footerRush acea-row row-between-wrapper"},[n("div",{staticClass:"customerSer acea-row row-center-wrapper row-column",on:{click:function(e){return t.$router.push({path:"/customer/list"})}}},[n("div",{staticClass:"iconfont icon-kefu"}),n("div",[t._v("客服")])]),n("div",{staticClass:"bnt bg-color-red",on:{click:t.tapBuy}},[t._v("立即购买")])]),n("ProductWindow",{attrs:{attr:t.attr},on:{changeFun:t.changeFun}}),n("StorePoster",{attrs:{posterImageStatus:t.posterImageStatus,posterData:t.posterData},on:{setPosterImageStatus:t.setPosterImageStatus}})],1)},r=[],o=n("7618"),s=(n("7f7f"),n("c5f8")),i=n("5608"),c=n("c6da"),u=n("cbd6"),l=n("ca41"),d=n("73f5"),p="SeckillDetails",f={name:"SeckillDetails",components:{ProductConSwiper:s["a"],CountDown:i["a"],ProductWindow:c["a"],StorePoster:u["a"]},props:{},data:function(){return{domStatus:!1,posterData:{image:"",title:"",price:"",code:""},posterImageStatus:!1,action:"",imgUrls:[],storeInfo:[],replyCount:0,reply:[],cartNum:1,attr:{cartAttr:!1,productSelect:{image:"",store_name:"",price:"",stock:"",unique:"",cart_num:1}},datatime:0}},watch:{$route:function(t){var e=this;console.log(t),t.name===p&&e.mountedStart()}},mounted:function(){this.mountedStart()},methods:{mountedStart:function(){var t=this,e=t.$route.params.id;t.datatime=parseInt(t.$route.params.time),Object(l["s"])(e).then(function(e){t.$set(t,"storeInfo",e.data.storeInfo),t.$set(t,"imgUrls",e.data.storeInfo.images),t.$set(t,"replyCount",e.data.replyCount),t.$set(t,"reply",e.data.reply),t.posterData.image=t.storeInfo.image_base,t.updateTitle(),t.storeInfo.title.length>30?t.posterData.title=t.storeInfo.title.substring(0,30)+"...":t.posterData.title=t.storeInfo.title,t.posterData.price=t.storeInfo.price,t.posterData.code=t.storeInfo.code_base,t.setProductSelect(),t.domStatus=!0})},updateTitle:function(){document.title=this.storeInfo.title||this.$route.meta.title},setPosterImageStatus:function(){var t=document.body||document.documentElement;t.scrollTop=0,this.posterImageStatus=!this.posterImageStatus},changeFun:function(t){"object"!==Object(o["a"])(t)&&(t={});var e=t.action||"",n=void 0===t.value?"":t.value;this[e]&&this[e](n)},changeattr:function(t){var e=this;e.attr.cartAttr=t},ChangeCartNum:function(t){var e=this;t?e.attr.productSelect.cart_num<e.storeInfo.stock&&e.attr.productSelect.cart_num++:e.attr.productSelect.cart_num>1&&e.attr.productSelect.cart_num--},setProductSelect:function(){var t=this,e=t.attr;e.productSelect.image=t.storeInfo.image,e.productSelect.store_name=t.storeInfo.title,e.productSelect.price=t.storeInfo.price,e.productSelect.stock=t.storeInfo.stock,e.cartAttr=!1,t.$set(t,"attr",e)},selecAttrTap:function(){this.cartAttr=!0},tapBuy:function(){var t=this,e=this;if(0==e.attr.cartAttr)e.attr.cartAttr=!this.attr.attrcartAttr;else{var n={};n.productId=e.storeInfo.product_id,n.cartNum=e.attr.productSelect.cart_num,n.uniqueId=e.attr.productSelect.unique,n.secKillId=e.storeInfo.id,n.new=1,Object(d["m"])(n).then(function(t){e.$router.push({path:"/order/submit/"+t.data.cartId})}).catch(function(e){t.$dialog.error(e.msg)})}}}},m=f,g=(n("d5f9"),n("43f5"),n("2877")),v=Object(g["a"])(m,a,r,!1,null,"014e4961",null);e["default"]=v.exports},ca41:function(t,e,n){"use strict";n.d(e,"n",function(){return r}),n.d(e,"m",function(){return o}),n.d(e,"o",function(){return s}),n.d(e,"q",function(){return i}),n.d(e,"p",function(){return c}),n.d(e,"r",function(){return u}),n.d(e,"t",function(){return l}),n.d(e,"s",function(){return d}),n.d(e,"f",function(){return p}),n.d(e,"a",function(){return f}),n.d(e,"h",function(){return m}),n.d(e,"i",function(){return g}),n.d(e,"b",function(){return v}),n.d(e,"e",function(){return h}),n.d(e,"c",function(){return _}),n.d(e,"j",function(){return b}),n.d(e,"d",function(){return C}),n.d(e,"g",function(){return S}),n.d(e,"l",function(){return w}),n.d(e,"k",function(){return I});var a=n("b775");function r(t){return a["a"].get("/combination/list",t,{login:!1})}function o(t){return a["a"].get("/combination/detail/"+t,{},{login:!1})}function s(t){return a["a"].get("/combination/pink/"+t)}function i(t){return a["a"].post("/combination/remove",t)}function c(t){return a["a"].post("/combination/poster",t)}function u(){return a["a"].get("/seckill/index",{},{login:!1})}function l(t,e){return a["a"].get("/seckill/list/"+t,e,{login:!1})}function d(t){return a["a"].get("/seckill/detail/"+t,{},{login:!1})}function p(t){return a["a"].get("/bargain/list",t,{login:!1})}function f(t){return a["a"].get("/bargain/detail/"+t)}function m(t){return a["a"].post("/bargain/share",t)}function g(t){return a["a"].post("/bargain/start",t)}function v(t){return a["a"].post("/bargain/help",t)}function h(t){return a["a"].post("/bargain/help/price",t)}function _(t){return a["a"].post("/bargain/help/count",t)}function b(t){return a["a"].post("/bargain/start/user",t)}function C(t){return a["a"].post("/bargain/help/list",t)}function S(t){return a["a"].post("/bargain/poster",t)}function w(t){return a["a"].get("/bargain/user/list",t)}function I(t){return a["a"].post("/bargain/user/cancel",t)}},d5f9:function(t,e,n){"use strict";var a=n("5095"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-56bd1d10.a0b864bf.js.map