(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d5c9a"],{"707b":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"distribution-posters"},[s("div",{staticClass:"slider-banner banner"},[s("swiper",{ref:"mySwiper",staticClass:"swiper-wrapper",attrs:{options:e.swiperPosters}},e._l(e.info,function(e,t){return s("swiperSlide",{key:t,staticClass:"swiper-slide"},[s("img",{staticClass:"slide-image",attrs:{src:e.wap_poster}})])}),1)],1),s("div",{staticClass:"keep bg-color-red",on:{click:e.saveImg}},[e._v("保存海报")])])},n=[],r=s("7212"),o=(s("e5d0"),s("c24f")),a={name:"Poster",components:{swiper:r["swiper"],swiperSlide:r["swiperSlide"]},props:{},data:function(){return{swiperPosters:{speed:1e3,effect:"coverflow",slidesPerView:"auto",centeredSlides:!0,coverflowEffect:{rotate:0,stretch:-20,depth:100,modifier:3,slideShadows:!1},observer:!0,observeParents:!0},info:[],activeIndex:0}},mounted:function(){this.getIndex();var e=this;this.swiper.on("slideChange",function(){e.activeIndex=e.swiper.activeIndex})},computed:{swiper:function(){return this.$refs.mySwiper.swiper}},methods:{getIndex:function(){var e=this;Object(o["x"])().then(function(t){e.info=t.data},function(t){e.$dialog.message(t.msg)})},downloadIamge:function(e,t){var s=new Image;s.setAttribute("crossOrigin","anonymous"),s.onload=function(){var e=document.createElement("canvas");e.width=s.width,e.height=s.height;var i=e.getContext("2d");i.drawImage(s,0,0,s.width,s.height);var n=e.toDataURL("image/png"),r=document.createElement("a"),o=new MouseEvent("click");r.download=t||"photo",r.href=n,r.dispatchEvent(o)},s.src=e},saveImg:function(){console.log(this.info[this.activeIndex].wap_poster),this.downloadIamge(this.info[this.activeIndex].wap_poster,"poster"+this.activeIndex)}}},c=a,d=s("2877"),p=Object(d["a"])(c,i,n,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0d5c9a.de2c3766.js.map