// MIT License... Do what you want.

(function() {
var defaultColor = '#CCC';
function replaceImg(p) {
	var canvas = document.createElement('canvas'),
	c = canvas.getContext("2d");
	canvas.width = p.w;
	canvas.height = p.h;
	c.rect(0,0,p.w,p.h);
	c.fillStyle = p.color;
	c.fill();
	var colorData = c.getImageData(0,0,1,1).data,
	brightness = (colorData[0]*.299) + (colorData[1]*.587) + (colorData[2]*.114),
	txtColor = (brightness<160) ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.6)',
	crossColor = (brightness<160) ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
	c.fillStyle = txtColor;
	c.strokeStyle = crossColor;
	c.moveTo(0,0); c.lineTo(p.w,p.h);
	c.moveTo(0,p.h); c.lineTo(p.w,0);
	c.stroke();
	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.font = 'bold 14pt sans-serif';
	c.fillText(p.w+' x '+p.h, p.w/2, p.h/2, p.w-10);
	c.font = '10pt sans-serif';
	c.textBaseline = 'bottom';
	c.fillText(p.alt, p.w/2, p.h-2, p.w-10);
	return canvas.toDataURL();
}
function getParams(imgStr) {
	var atts = imgStr.split('/'),
	obj = {}
	if (atts[2]) {
		var size = atts[2].split('x');
		obj.w = size[0];
		obj.h = (size[1]) ? size[1] : size[0];
	}
	obj.color = (atts[3] && atts[3].match(/^[0-9a-f]{3}|[0-9a-f]{6}$/i)) ? '#'+atts[3] : defaultColor;
	obj.alt = (atts[4]) ? decodeURIComponent(atts[4]) : '';
	return obj;
}

var params,regex = /(^placeholder:\/\/.*)/;
for (var src,imgs=document.getElementsByTagName('img'),i=imgs.length; i--;) {
	src = imgs[i].src.match(regex);
	if (src) {
		params = getParams(src[1]);

		if (!params.w) {
			params.w = imgs[i].width;
			params.h = imgs[i].height;
		}
		if (!params.alt)
			params.alt=imgs[i].alt;

		imgs[i].src = replaceImg(params)
	}
}
regex = /(url\(.*(placeholder:\/\/[^'"\)]*).*\))/;
for (var sheets=document.styleSheets,s=sheets.length; s--; ) {
	for (var style,bg,content,r=sheets[s].cssRules.length; r--;) {
		style = sheets[s].cssRules[r].style;
		bg = style.backgroundImage.match(regex);
		content = style.content.match(regex);
		if (bg) {
			params = getParams(bg[2]);
			style.backgroundImage = 'url('+replaceImg(params)+')';
		}
		if (content) {
			params = getParams(content[2]);
			style.content = style.content.replace(content[1], 'url("'+replaceImg(params)+'")');
		}
	}
}

for(var styleAtts=document.querySelectorAll('*[style]'),bg,x=styleAtts.length; x--;) {
	bg = styleAtts[x].style.backgroundImage.match(regex);
	if (bg) {
		params = getParams(bg[2]);
		styleAtts[x].style.backgroundImage = 'url('+replaceImg(params)+')';
	}
}
})();