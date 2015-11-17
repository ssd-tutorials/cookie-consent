var cookieObject = {
	jsCookieFiles : ['/js/cookies.js'],
	setCookie : function(cName, cValue, cDays, cPath, cDomain) {
		"use strict";
		if (cName) {
			var thisDate = new Date();
			thisDate.setDate(thisDate.getDate() + cDays);
			cValue = encodeURIComponent(cValue);
			cValue += (typeof cDays !== 'undefined') ? 
				";expires=" + thisDate.toUTCString() : '';
			cValue += (typeof cPath !== 'undefined') ? 
				";path=" + cPath : '';
			cValue += (typeof cDomain !== 'undefined') ? 
				";domain=" + cDomain : '';
			document.cookie = cName + "=" + cValue;
		}
	},
	getCookie : function(cName) {
		"use strict";
		if (cName) {
			var i, thisKey, thisValue, arrCookies = document.cookie.split(";");
			if (arrCookies.length > 0) {
				for (i = 0; i < arrCookies.length; i++) {
					thisKey = arrCookies[i].substr(0, arrCookies[i].indexOf("="));
					thisValue = arrCookies[i].substr(arrCookies[i].indexOf("="));
					thisKey = thisKey.replace(/^\s+|\s+$/g, '');
					if (thisKey == cName) {
						return decodeURIComponent(thisValue);
					}
				}
			}
		}
	},
	isCookie : function(cName) {
		"use strict";
		if (cName) {
			var thisCookie = cookieObject.getCookie(cName);
			return thisCookie ? true : false;
		}
		return false;
	},
	removeCookie : function(cName) {
		"use strict";
		if (cName && cookieObject.isCookie(cName)) {
			document.cookie = cName + "=; expires=" + new Date(0).toUTCString();
		}
	},
	setCookieTrue : function(obj) {
		"use strict";
		obj.live('click', function(e) {
			e.preventDefault();
			if (!cookieObject.isCookie('consent')) {
				cookieObject.setCookie('consent', 1, 367);
				$('#cookieAlert').fadeOut(300, function() {
					location.reload();
				});
			}
		});
	},
	displayCookieAlert : function(obj) {
		"use strict";
		if (obj.length > 0 && !cookieObject.isCookie('consent')) {
			jQuery.ajax({
				url : '/cookie-alert.html',
				success : function(data) {
					obj.prepend(data);
				}
			});
		}
	},
	loadCookieContent : function() {
		"use strict";
		if (cookieObject.isCookie('consent')) {
			if (cookieObject.jsCookieFiles.length > 0) {
				for (var i = 0; i < cookieObject.jsCookieFiles.length; i++) {
					var script = document.createElement('script');
					script.src = cookieObject.jsCookieFiles[i];
					script.type = 'text/javascript';
					document.getElementsByTagName('body')[0].appendChild(script);
				}
			}
		}
	}
};
$(function() {
	"use strict";
	cookieObject.loadCookieContent();
	cookieObject.displayCookieAlert($('#wrapper'));
	cookieObject.setCookieTrue($('#cookieConsentButton'));
});








