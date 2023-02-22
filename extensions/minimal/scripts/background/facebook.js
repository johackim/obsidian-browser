
/* - Remove the install messenger mobile page - U1 */
browser.webRequest.onBeforeRequest.addListener(
function(requestDetails){
	return {cancel: true};
},
{
	urls: ["*://*.facebook.com/messenger/install*"],
	types: ["main_frame"]
},
["blocking"]
);
