# CSS

[一些有趣的 css 技巧](https://github.com/chokcoco/iCSS)

[codepen coco](https://codepen.io/Chokcoco/)

[codepen 袁川](https://codepen.io/yuanchuan/)


### print.css
``` css
/* PRINT */
@media print {
  body, #main, #content { color: #000 !important; }
  a, a:link, a:visited { color: #000 !important; text-decoration:none !important; }
  #tabs, #globalheader, #globalfooter, #directorynav, .noprint, .hide { display: none !important; }
  #main a.pdf, #main a.html, #main a.qt, #main a.ical, #main a.dl, #main a.dmg, #main a.zip, #main a.keynote, #main a.audio { padding-left: 0 !important; background-image: none !important; }
}
```
