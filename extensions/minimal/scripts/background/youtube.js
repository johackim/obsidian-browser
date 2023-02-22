/* - Remove the trending page - P2 */
browser.webRequest.onBeforeRequest.addListener(
function(requestDetails){
	return {redirectUrl: "https://www.youtube.com/feed/subscriptions"};
},
{
	urls: ["*://www.youtube.com/feed/trending*"],
	types: ["main_frame"]
},
["blocking"]
);

