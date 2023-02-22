/* - Remove the notifier in the page title - C3 */
function removeNotificationsFromTitle(){
    const reg = /(\(\d\) )/g;
    let originalPageTitle = document.title;  
    let newPageTitle = originalPageTitle.replace(reg, "");
    document.title = newPageTitle;
}
setInterval(removeNotificationsFromTitle, 200) /* 200ms was arbitrary chosen */

/* - Replace the "red bubble" notification twitter favicon with the standard one - C3 */
function keepStandardFavicon(){
    const faviconLinkTag = document.querySelector("link[rel='shortcut icon']");
    const currentFavicon = faviconLinkTag.getAttribute("href");
    let standardFavicon = currentFavicon.replace("twitter-pip.ico", "twitter.ico"); /* replace the red bubble favicon with the standard favicon */
    faviconLinkTag.setAttribute("href", standardFavicon);
}
setInterval(keepStandardFavicon, 200) /* 200ms was arbitrary chosen */