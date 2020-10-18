# metricPlease
### A bookmarklet that turns 100 yards into 91.4 m

Just add this as a bookmark to your browser:

~~~javascript
javascript: (function() {function cC(e){let b=e.childNodes;for(let a=0;a<b.length;a++)if(b[a].nodeType==3){let c=b[a].nodeValue;let d=checkString(c);c!==d&&(b[a].nodeValue=d);}else b[a].tagName!=='SCRIPT'&&cC(b[a]);}function bR(a,b,c,d){return function(h){let e=h;let f;while((f=a.exec(h))!=null){let i=f[0].substr(0,f[0].length-b).replace(',','').replace('-','').trim();let g=Math.round(i*c*10)/10;isNaN(g)||(e=e.replace(f[0],' '+g+' '+d));}return e;};}function checkString(a){return a=iR1(iR2(iR3(iR4(iR5(iR6(a)))))),a=fR1(fR2(fR3(fR4(fR5(fR6(a)))))),a=yR1(yR2(yR3(yR4(yR5(yR6(a)))))),a=mR1(mR2(mR3(mR4(mR5(mR6(a)))))),a;}let iR1=bR(/[0-9]+( |-|)in./g,3,2.54,'cm');let iR2=bR(/[0-9]+( |-|)inch/g,4,2.54,'cm');let iR3=bR(/[0-9]+( |-|)inches/g,6,2.54,'cm');let iR4=bR(/[0-9]{1,3},[0-9]{3}( |-|)in./g,3,2.54,'cm');let iR5=bR(/[0-9]{1,3},[0-9]{3}( |-|)inch/g,4,2.54,'cm');let iR6=bR(/[0-9]{1,3},[0-9]{3}( |-|)inches/g,6,2.54,'cm');let fR1=bR(/[0-9]+( |-|)ft./g,3,0.3048,'m');let fR2=bR(/[0-9]+( |-|)foot/g,4,0.3048,'m');let fR3=bR(/[0-9]+( |-|)feet/g,4,0.3048,'m');let fR4=bR(/[0-9]{1,3},[0-9]{3}( |-|)ft./g,3,0.3048,'m');let fR5=bR(/[0-9]{1,3},[0-9]{3}( |-|)foot/g,4,0.3048,'m');let fR6=bR(/[0-9]{1,3},[0-9]{3}( |-|)feet/g,4,0.3048,'m');let yR1=bR(/[0-9]+( |-|)yd./g,3,0.9144,'m');let yR2=bR(/[0-9]+( |-|)yard/g,4,0.9144,'m');let yR3=bR(/[0-9]+( |-|)yards/g,5,0.9144,'m');let yR4=bR(/[0-9]{1,3},[0-9]{3}( |-|)yd./g,3,0.9144,'m');let yR5=bR(/[0-9]{1,3},[0-9]{3}( |-|)yard/g,4,0.9144,'m');let yR6=bR(/[0-9]{1,3},[0-9]{3}( |-|)yards/g,5,0.9144,'m');let mR1=bR(/[0-9]+( |-|)mi./g,3,1.609344,'km');let mR2=bR(/[0-9]+( |-|)mile/g,4,1.609344,'km');let mR3=bR(/[0-9]+( |-|)miles/g,5,1.609344,'km');let mR4=bR(/[0-9]{1,3},[0-9]{3}( |-|)mi./g,3,1.609344,'km');let mR5=bR(/[0-9]{1,3},[0-9]{3}( |-|)mile/g,4,1.609344,'km');let mR6=bR(/[0-9]{1,3},[0-9]{3}( |-|)miles/g,5,1.609344,'km');cC(document.body);})();
~~~

Or use the file `metricPleaseBookmarklet.js`

It also works for **feet**, **inches** and **miles** or **ft.**, **in.** and **mi.**
