(this["webpackJsonpfriday-cards-project"]=this["webpackJsonpfriday-cards-project"]||[]).push([[0],{13:function(e,t,r){e.exports={container:"Password-recovery_container__1ykQx",form:"Password-recovery_form__1fvWb",inputContainer:"Password-recovery_inputContainer__3uKLO",message:"Password-recovery_message__18NTI",sentMailResponse:"Password-recovery_sentMailResponse__1Lk7p"}},18:function(e,t,r){e.exports={formFields:"Login_formFields__34_pL",formFieldsInput:"Login_formFieldsInput__9--VU",errorBlock:"Login_errorBlock__20E5m",preloader:"Login_preloader__2HXPx"}},21:function(e,t,r){e.exports={superInput:"SuperInputText_superInput__2PANA",errorInput:"SuperInputText_errorInput__3NTsA",error:"SuperInputText_error__13m4-"}},22:function(e,t,r){e.exports={labelCheckbox:"SuperCheckbox_labelCheckbox__sWg8Q",spanClassName:"SuperCheckbox_spanClassName__2GlpU",checkbox:"SuperCheckbox_checkbox__ZvnGu"}},26:function(e,t,r){e.exports={default:"SuperButton_default__3X2Ig",red:"SuperButton_red__2qa07"}},29:function(e,t,r){e.exports={mainHeader:"Header_mainHeader__1RP1x"}},40:function(e,t,r){e.exports={error404:"Error404_error404__2oog_"}},42:function(e,t,r){e.exports={loader:"Preloader_loader__1jVOj"}},43:function(e,t,r){e.exports={profile:"Profile_profile__2x015"}},44:function(e,t,r){e.exports={superComponentsStand:"SuperComponentsStand_superComponentsStand__diEHf"}},74:function(e,t,r){},75:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(19),s=r.n(a),c=r(4),o=r(6),i=r(5),d=r(40),l=r.n(d),u=r(0),j=function(){return Object(u.jsxs)("div",{className:l.a.error404,children:[Object(u.jsx)("div",{children:"404"}),Object(u.jsx)("div",{children:"Page not found!"}),Object(u.jsx)("div",{children:"\u2014 \u0e05/\u1420. \u032b  .\u141f\\\u0e05\u2014"})]})},b=r(9),p=r(18),O=r.n(p),h=r(2),f=r(41),x=r.n(f).a.create({baseURL:"https://neko-back.herokuapp.com/2.0",withCredentials:!0}),g={email:"",from:"test-front-admin <ai73a@yandex.by>",message:"<div style=\"background-color: lime; padding: 15px\">password recovery link: \n              <a href='http://localhost:3000/friday-cards-project#/newPassword/$token$'>link</a></div>"},m=function(e){return x.post("/auth/login",e)},v=function(){return x.delete("/auth/me",{})},w=function(){return x.post("/auth/me",{})},S=function(e,t){return x.post("auth/register",{email:e,password:t})},P=function(e){return x.post("auth/forgot",Object(h.a)(Object(h.a)({},g),{},{email:e}))},_=function(e,t){return x.post("auth/set-new-password",{password:e,resetPasswordToken:t})},y={status:"idle",error:null},E=function(e){return{type:"APP/SET-STATUS",status:e}},N=function(e){return{type:"APP/SET-ERROR",error:e}},R={isLoggedIn:!1,data:null},T=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},C=function(e){return{type:"login/SET-USER-DATA",data:e}},I=r(16),k=r(26),A=r.n(k),L=function(e){var t=e.red,r=e.className,n=Object(I.a)(e,["red","className"]),a="".concat(t?A.a.red:A.a.default," ").concat(r);return Object(u.jsx)("button",Object(h.a)({className:a},n))},U=r.p+"static/media/preloader.9ca08101.gif",G=r(42),F=r.n(G),D=function(){return Object(u.jsx)("div",{className:F.a.loader,children:Object(u.jsx)("img",{src:U,alt:"preloader"})})},W=function(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),r=t[0],a=t[1],s=Object(n.useState)(""),o=Object(b.a)(s,2),d=o[0],l=o[1],j=Object(n.useState)(!1),p=Object(b.a)(j,2),h=p[0],f=p[1],x=Object(c.b)(),g=Object(c.c)((function(e){return e.login.isLoggedIn})),v=Object(c.c)((function(e){return e.appStatus.error})),w=Object(c.c)((function(e){return e.appStatus.status})),S=Object(c.c)((function(e){return e.login.data}));if(g||S)return Object(u.jsx)(i.a,{to:"/profile"});return Object(u.jsxs)("div",{children:[v&&Object(u.jsx)("div",{className:O.a.errorBlock,children:v}),Object(u.jsxs)("form",{onSubmit:function(e){var t;e.preventDefault(),x((t={email:r,password:d,rememberMe:h},function(e){e(E("loading")),m(t).then((function(t){e(E("succeeded")),e(T(!0)),e(C(t.data))})).catch((function(t){e(E("failed"));var r=t.response?t.response.data.error:t.message+", more details in the console";e(N("Error: "+r))}))})),a(""),l("")},children:[Object(u.jsxs)("div",{className:O.a.formFields,children:[Object(u.jsx)("input",{type:"text",placeholder:"Enter your email",value:r,pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",onChange:function(e){a(e.currentTarget.value)},className:O.a.formFieldsInput}),Object(u.jsx)("input",{type:"password",placeholder:"Enter your password",value:d,onChange:function(e){l(e.currentTarget.value)},className:O.a.formFieldsInput}),Object(u.jsxs)("div",{children:[Object(u.jsx)("input",{type:"checkbox",checked:h,onChange:function(e){f(e.currentTarget.checked)},name:"checkbox",id:"checkbox"}),Object(u.jsx)("label",{htmlFor:"checkbox",children:"Remember me"})]}),Object(u.jsx)(L,{type:"submit",disabled:"loading"===w,children:"Submit"})]}),"loading"===w&&Object(u.jsx)(D,{})]})]})},B=r(13),M=r.n(B),H={info:"",forgotPasswordError:"",isMailSent:!1,isLoading:!1},q=function(e){return{type:"SET-FORGOT-PASSWORD-ERROR",forgotPasswordError:e}},K=function(e){return{type:"IS-MAIL-SENT",isMailSent:e}},Z=function(e){return{type:"CHANGE-LOADING-STATUS",isLoading:e}},$=function(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),r=t[0],a=t[1],s=Object(c.b)(),o=Object(c.c)((function(e){return e.passwordRecovery}));return Object(u.jsxs)("div",{className:M.a.container,children:["Password-recovery page will be here",o.isLoading&&Object(u.jsx)(D,{}),o.isMailSent?Object(u.jsxs)("div",{className:M.a.sentMailResponse,children:["click the link in the message in your email",Object(u.jsx)("span",{children:o.info})]}):Object(u.jsx)("div",{children:Object(u.jsxs)("div",{className:M.a.form,children:[Object(u.jsx)("input",{type:"text",placeholder:"Enter your email",value:r,onChange:function(e){a(e.target.value)},onKeyPress:function(){s(q(""))}}),""!==o.forgotPasswordError&&Object(u.jsx)("span",{className:M.a.message,children:o.forgotPasswordError}),Object(u.jsx)("button",{onClick:function(){var e;s((e=r,function(t){t(Z(!0)),P(e).then((function(e){t({type:"FORGOT-PASSWORD-RESPONSE",info:e.data.info}),t(K(!0)),t(Z(!1))})).catch((function(e){t(q(e.response.data.error)),t(K(!1)),t(Z(!1))}))}))},children:"Send"})]})})]})},z=r(43),J=r.n(z),Q=function(){var e=Object(c.b)(),t=Object(c.c)((function(e){return e.login.data})),r=Object(c.c)((function(e){return e.login.isLoggedIn})),a=Object(c.c)((function(e){return e.appStatus.status}));return Object(n.useEffect)((function(){!t&&e((function(e){e(E("loading")),w().then((function(t){e(C(t.data)),e(T(!0)),e(E("succeeded"))})).catch((function(t){e(E("failed"));var r=t.response?t.response.data.error:t.message+", more details in the console";e(N("Error: "+r))}))}))}),[]),t||r||"idle"===a||"loading"===a?Object(u.jsx)("div",{className:J.a.profile,children:t&&Object(u.jsxs)("div",{children:["User name: ",t.name,"User email: ",t.email,"User avatar: ",t.avatar]})}):Object(u.jsx)(i.a,{to:"/login"})},V={error:"",passwordIsSet:!1},X=function(e){return{type:"SET-NEW-PASSWORD-ERROR",error:e}},Y=function(){var e=Object(i.g)().resetPasswordToken,t=Object(n.useState)(""),r=Object(b.a)(t,2),a=r[0],s=r[1],o=Object(n.useState)(""),d=Object(b.a)(o,2),l=d[0],j=d[1],p=Object(n.useState)(""),O=Object(b.a)(p,2),h=O[0],f=O[1],x=Object(c.c)((function(e){return e.newPassword})),g=Object(c.b)(),m=function(){f(""),g(X(""))};return x.passwordIsSet?Object(u.jsx)(i.a,{to:"/login"}):Object(u.jsxs)("div",{className:M.a.container,children:["Page with form for new password entering will be here",Object(u.jsx)("div",{className:M.a.message,children:h}),Object(u.jsxs)("div",{className:M.a.inputContainer,children:[Object(u.jsx)("input",{type:"text",placeholder:"set new password",value:a,onChange:function(e){s(e.target.value)},onKeyPress:m}),""!==x.error&&Object(u.jsx)("span",{className:M.a.message,children:x.error})]}),Object(u.jsx)("div",{className:M.a.inputContainer,children:Object(u.jsx)("input",{type:"text",placeholder:"set new password",value:l,onChange:function(e){j(e.target.value)},onKeyPress:m})}),Object(u.jsx)("button",{onClick:function(){a===l?g(function(e,t){return function(r){_(e,t).then((function(e){r({type:"SET-NEW-PASSWORD",passwordIsSet:!0})})).catch((function(e){r(X(e.response.data.error))}))}}(a,e)):f("Passwords are not equal")},children:"set new password"})]})},ee={isSignUp:!1,error:null},te=function(e){return{type:"SET-IS-SIGN-UP",value:e}},re=function(e){return{type:"SET-ERROR-SIGN-UP",error:e}},ne=r(21),ae=r.n(ne),se=function(e){var t=e.onChange,r=e.onChangeText,n=e.onKeyPress,a=e.onEnter,s=e.error,c=(e.className,e.spanClassName),o=Object(I.a)(e,["onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),i="".concat(ae.a.error," ").concat(c||""),d="".concat(s?ae.a.errorInput:ae.a.superInput);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",Object(h.a)({onChange:function(e){t&&t(e),r&&r(e.currentTarget.value)},onKeyPress:function(e){n&&n(e),"Enter"===e.key&&a&&a()},className:d},o)),s&&Object(u.jsx)("span",{className:i,children:s})]})},ce=function(){var e=Object(c.b)(),t=Object(c.c)((function(e){return e.registration.isSignUp})),r=Object(c.c)((function(e){return e.registration.error})),a=Object(n.useState)({email:"",password:"",repeatPassword:""}),s=Object(b.a)(a,2),o=s[0],d=s[1],l=Object(n.useState)({}),j=Object(b.a)(l,2),p=j[0],O=j[1];return t?Object(u.jsx)(i.a,{to:"/login"}):Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"REGISTRATION"}),Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{children:r?Object(u.jsx)("div",{style:{color:"red"},children:r}):null}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"Email:"}),Object(u.jsx)(se,{type:"text",name:"email",placeholder:"Enter email",value:o.email,onChange:function(e){d(Object(h.a)(Object(h.a)({},o),{},{email:e.currentTarget.value}))},onBlur:function(){o.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(o.email)?O(Object(h.a)(Object(h.a)({},p),{},{email:""})):O(Object(h.a)(Object(h.a)({},p),{},{email:"Invalid email address"})):O(Object(h.a)(Object(h.a)({},p),{},{email:"Required"}))}})]}),p.email?Object(u.jsx)("div",{style:{color:"red"},children:p.email}):null,Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"Password:"}),Object(u.jsx)(se,{type:"password",name:"password",placeholder:"Enter password",value:o.password,onChange:function(e){d(Object(h.a)(Object(h.a)({},o),{},{password:e.currentTarget.value}))},onBlur:function(){o.password?o.password.length<8?O(Object(h.a)(Object(h.a)({},p),{},{password:"The min length of password should be 7"})):O(Object(h.a)(Object(h.a)({},p),{},{password:""})):O(Object(h.a)(Object(h.a)({},p),{},{password:"Required"}))}})]}),p.password?Object(u.jsx)("div",{style:{color:"red"},children:p.password}):null,Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"Repeat password:"}),Object(u.jsx)(se,{type:"password",name:"repeatPassword",placeholder:"Repeat password",value:o.repeatPassword,onChange:function(e){d(Object(h.a)(Object(h.a)({},o),{},{repeatPassword:e.currentTarget.value}))},onBlur:function(){o.repeatPassword?o.password!==o.repeatPassword?O(Object(h.a)(Object(h.a)({},p),{},{repeatPassword:"This password does not match that entered in the password field, please try again"})):O(Object(h.a)(Object(h.a)({},p),{},{repeatPassword:""})):O(Object(h.a)(Object(h.a)({},p),{},{repeatPassword:"Required"}))}})]}),p.repeatPassword?Object(u.jsx)("div",{style:{color:"red"},children:p.repeatPassword}):null,Object(u.jsx)(L,{onClick:function(){var t,r;o.email?o.password?o.repeatPassword?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(o.email)?o.password.length<8?O(Object(h.a)(Object(h.a)({},p),{},{password:"Password must be more than 7 character"})):o.password!==o.repeatPassword?O(Object(h.a)(Object(h.a)({},p),{},{repeatPassword:"This password does not match that entered in the password field, please try again"})):e((t=o.email,r=o.password,function(e){S(t,r).then((function(t){e(te(!0))})).catch((function(t){e(re(t.response.data.error))}))})):O(Object(h.a)(Object(h.a)({},p),{},{email:"Invalid email address"})):O(Object(h.a)(Object(h.a)({},p),{},{repeatPassword:"Required"})):O(Object(h.a)(Object(h.a)({},p),{},{password:"Required"})):O(Object(h.a)(Object(h.a)({},p),{},{email:"Required"}))},children:"SIGN UP"})]})]})},oe=r(22),ie=r.n(oe),de=function(e){e.type;var t=e.onChange,r=e.onChangeChecked,n=e.className,a=(e.spanClassName,e.children),s=Object(I.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),c="".concat(ie.a.checkbox," ").concat(n||"");return Object(u.jsxs)("label",{className:ie.a.labelCheckbox,children:[Object(u.jsx)("input",Object(h.a)({type:"checkbox",onChange:function(e){t&&t(e),r&&r(e.currentTarget.checked)},className:c},s)),a&&Object(u.jsx)("span",{className:ie.a.spanClassName,children:a})]})},le=r(44),ue=r.n(le),je=function(){return Object(u.jsxs)("div",{className:ue.a.superComponentsStand,children:[Object(u.jsx)(se,{}),Object(u.jsx)(L,{children:" Button "}),Object(u.jsx)(de,{})]})},be="/login",pe="/passwordRecovery",Oe="/profile",he="/signUp",fe="/newPassword",xe="/superComponentsStand",ge="/404",me=function(){return Object(u.jsx)("div",{children:Object(u.jsxs)(i.d,{children:[Object(u.jsx)(i.b,{exact:!0,path:"/",render:function(){return Object(u.jsx)(i.a,{to:be})}}),Object(u.jsx)(i.b,{path:be,render:function(){return Object(u.jsx)(W,{})}}),Object(u.jsx)(i.b,{exact:!0,path:Oe,render:function(){return Object(u.jsx)(Q,{})}}),Object(u.jsx)(i.b,{exact:!0,path:pe,render:function(){return Object(u.jsx)($,{})}}),Object(u.jsx)(i.b,{exact:!0,path:he,render:function(){return Object(u.jsx)(ce,{})}}),Object(u.jsx)(i.b,{path:"".concat(fe,"/:resetPasswordToken"),render:function(){return Object(u.jsx)(Y,{})}}),Object(u.jsx)(i.b,{exact:!0,path:xe,render:function(){return Object(u.jsx)(je,{})}}),Object(u.jsx)(i.b,{path:ge,render:function(){return Object(u.jsx)(j,{})}}),Object(u.jsx)(i.a,{from:"*",to:ge})]})})},ve=r(29),we=r.n(ve);var Se=function(){var e=Object(c.b)(),t=Object(c.c)((function(e){return e.login.data})),r=Object(c.c)((function(e){return e.login.isLoggedIn}));return t&&r?Object(u.jsx)("div",{className:we.a.mainHeader,children:Object(u.jsxs)("nav",{children:[Object(u.jsx)(o.b,{to:Oe,children:"profile"}),Object(u.jsx)(o.b,{to:he,children:"sign-up"}),Object(u.jsx)(o.b,{to:pe,children:"password-recovery"}),Object(u.jsx)(o.b,{to:fe,children:"new-password"}),Object(u.jsx)("button",{onClick:function(){e((function(e){v().then((function(t){e(E("succeeded")),e(T(!1)),e(C(null))})).catch((function(t){e(E("failed"));var r=t.response?t.response.data.error:t.message+", more details in the console";e(N("Error: "+r))}))}))},children:"logout"})]})}):Object(u.jsx)("div",{className:we.a.mainHeader,children:Object(u.jsxs)("nav",{children:[Object(u.jsx)(o.b,{to:be,children:"login"}),Object(u.jsx)(o.b,{to:Oe,children:"profile"}),Object(u.jsx)(o.b,{to:he,children:"sign-up"}),Object(u.jsx)(o.b,{to:pe,children:"password-recovery"}),Object(u.jsx)(o.b,{to:fe,children:"new-password"}),Object(u.jsx)(o.b,{to:xe,children:"superComponentsStand"})]})})},Pe=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)(o.a,{children:[Object(u.jsx)(Se,{}),Object(u.jsx)(me,{})]})})},_e=(r(74),r(14)),ye=r(45),Ee={},Ne=Object(_e.c)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(h.a)(Object(h.a)({},e),{},{isLoggedIn:t.value});case"login/SET-USER-DATA":return Object(h.a)(Object(h.a)({},e),{},{data:t.data});default:return e}},registration:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-IS-SIGN-UP":return Object(h.a)(Object(h.a)({},e),{},{isSignUp:t.value});case"SET-ERROR-SIGN-UP":return Object(h.a)(Object(h.a)({},e),{},{error:t.error});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;return t.type,e},passwordRecovery:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FORGOT-PASSWORD-RESPONSE":return Object(h.a)(Object(h.a)({},e),{},{info:t.info});case"SET-FORGOT-PASSWORD-ERROR":return Object(h.a)(Object(h.a)({},e),{},{forgotPasswordError:t.forgotPasswordError});case"IS-MAIL-SENT":return Object(h.a)(Object(h.a)({},e),{},{isMailSent:t.isMailSent});case"CHANGE-LOADING-STATUS":return Object(h.a)(Object(h.a)({},e),{},{isLoading:t.isLoading});default:return e}},newPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-NEW-PASSWORD":return Object(h.a)(Object(h.a)({},e),{},{passwordIsSet:t.passwordIsSet});case"SET-NEW-PASSWORD-ERROR":return Object(h.a)(Object(h.a)({},e),{},{error:t.error});default:return e}},appStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(h.a)(Object(h.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(h.a)(Object(h.a)({},e),{},{error:t.error});default:return e}}}),Re=Object(_e.d)(Ne,Object(_e.a)(ye.a));window.store=Re,console.log(Re.getState());var Te=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,76)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))};s.a.render(Object(u.jsx)(c.a,{store:Re,children:Object(u.jsx)(Pe,{})}),document.getElementById("root")),Te()}},[[75,1,2]]]);
//# sourceMappingURL=main.6aef5dca.chunk.js.map