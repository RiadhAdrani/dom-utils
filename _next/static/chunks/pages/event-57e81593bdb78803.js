(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[369],{2466:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/event",function(){return s(6602)}])},8177:function(e,n,s){"use strict";var t=s(5893);n.Z={logo:(0,t.jsx)("span",{children:"Dom Control"}),project:{link:"https://github.com/RiadhAdrani/dom-control-js"},useNextSeoProps:()=>({titleTemplate:"%s | Dom Control"}),footer:{text:(0,t.jsxs)("span",{children:["MIT ",new Date().getFullYear()," \xa9"," ",(0,t.jsx)("a",{href:"https://github.com/RiadhAdrani",target:"_blank",children:"RiadhAdrani"}),"."]})}}},6602:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return c.Z}});var t=s(5893),l=s(8808),r=s(5051),o=s(8177);s(5513);var i=s(1151);s(5675);var c=s(2243);function a(e){let n=Object.assign({h1:"h1",p:"p",hr:"hr",h3:"h3",code:"code",blockquote:"blockquote",pre:"pre",span:"span",ul:"ul",li:"li",a:"a"},(0,i.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:"Events"}),"\n",(0,t.jsx)(n.p,{children:"Handle elemen's events."}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"isoneventname",children:(0,t.jsx)(n.code,{children:"isOnEventName"})}),"\n",(0,t.jsx)(n.p,{children:"Check if the given name is valid event name."}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"onclick"})," is valid."]}),"\n"]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"onClick"})," is valid."]}),"\n"]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"click"})," is not valid."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{"data-language":"ts","data-theme":"default",children:(0,t.jsx)(n.code,{"data-language":"ts","data-theme":"default",children:(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"isOnEventName"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(name"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"string"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:")"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"boolean"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:";"})]})})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"name"})," : name of the event."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"setevent",children:(0,t.jsx)(n.code,{children:"setEvent"})}),"\n",(0,t.jsx)(n.p,{children:"Add an event with the given name to the target element."}),"\n",(0,t.jsxs)(n.p,{children:["Behind the scene, we don't add an event listener using ",(0,t.jsx)(n.code,{children:"element.addEventListener"}),", we just override the value of ",(0,t.jsx)(n.code,{children:"on<event>"}),"."]}),"\n",(0,t.jsx)(n.pre,{"data-language":"ts","data-theme":"default",children:(0,t.jsxs)(n.code,{"data-language":"ts","data-theme":"default",children:[(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"setEvent"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"<"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"T"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"Event"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"E"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"Element"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:">("})]}),"\n",(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"  name"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"string"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"  callback"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"DomEventHandler"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"<"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"E"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"T"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:">"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-punctuation)"},children:","})]}),"\n",(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"  element"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"E"})]}),"\n",(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:")"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"void"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:";"})]})]})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"name"})," : event's name."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"callback"})," : callback."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"element"})," : target element."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["See also: ",(0,t.jsx)(n.a,{href:"types/#domeventhandler",children:"DomEventHandler"})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"removeevent",children:(0,t.jsx)(n.code,{children:"removeEvent"})}),"\n",(0,t.jsx)(n.p,{children:"Removes given element named event."}),"\n",(0,t.jsx)(n.pre,{"data-language":"ts","data-theme":"default",children:(0,t.jsx)(n.code,{"data-language":"ts","data-theme":"default",children:(0,t.jsxs)(n.span,{className:"line",children:[(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"removeEvent"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(name"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"string"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" element"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"Element"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:")"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-keyword)"},children:":"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-token-constant)"},children:"void"}),(0,t.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:";"})]})})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"name"})," : event's name."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"element"})," : target element."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["See also: ",(0,t.jsx)(n.a,{href:"types/#domeventhandler",children:"DomEventHandler"})]})]})}e=s.hmd(e),(0,l.j)({Content:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)},nextraLayout:r.ZP,hot:e.hot,pageOpts:{filePath:"pages/event.mdx",route:"/event",frontMatter:{},pageMap:[{kind:"Meta",data:{index:"About",attribute:"Attribute",event:"Events",element:"Element",types:"Typing"}},{kind:"MdxPage",name:"attribute",route:"/attribute"},{kind:"MdxPage",name:"element",route:"/element"},{kind:"MdxPage",name:"event",route:"/event"},{kind:"MdxPage",name:"index",route:"/"},{kind:"MdxPage",name:"types",route:"/types"}],headings:[{depth:1,value:"Events",id:"events"},{depth:3,value:"isOnEventName",id:"isoneventname"},{depth:3,value:"setEvent",id:"setevent"},{depth:3,value:"removeEvent",id:"removeevent"}],flexsearch:{codeblocks:!0},title:"Events"},themeConfig:o.Z,pageNextRoute:"/event",pageOptsChecksum:void 0,dynamicMetaModules:[]})}},function(e){e.O(0,[774,194,888,179],function(){return e(e.s=2466)}),_N_E=e.O()}]);