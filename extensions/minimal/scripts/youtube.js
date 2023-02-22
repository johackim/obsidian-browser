/* - Use theater mode - C1 */
function activateTheaterMode(){
  if(document.getElementsByClassName('ytp-size-button')[0] != undefined){
    let theaterModeButton = document.getElementsByClassName('ytp-size-button')[0];
    if(theaterModeButton.getElementsByTagName("path")[0].getAttribute("d") === "m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"){
      theaterModeButton.click();
    }
  }
}

/* - Remove autoplay "feature" - U1 */
function deactivateAutoplay(){
  let autoplayLabel = document.getElementById('autoplay')
  if(autoplayLabel){
    let autoplayButton = autoplayLabel.nextElementSibling
    console.log(autoplayButton.getAttribute("aria-pressed"))
    if(autoplayButton.getAttribute("aria-pressed") == "true"){
      autoplayButton.click()
    }
  }
}

/* - Replace the subscription list from the side menu by a link to the subscription manager - U3 */
function replaceSubscriptionManager(){
	if(document.getElementById("avatar-btn") || document.getElementById("yt-masthead-account-picker")){
		let subGuide =
			document.getElementsByTagName("ytd-guide-section-renderer").length ?
				document.getElementsByTagName("ytd-guide-section-renderer")[1] :
				document.getElementById("guide-subscriptions-section");

		let subManagerLink = document.createElement('a');
		subManagerLink.setAttribute('href', 'https://www.youtube.com/subscription_manager');
		subGuide.getElementsByTagName("div")[0].style.display="none";

		let subGuideTitle = subGuide.getElementsByTagName("h3")[0];

		if(subGuideTitle.getElementsByTagName("yt-formatted-string").length > 0){
			subGuideTitle.getElementsByTagName("yt-formatted-string")[0].style.textTransform="capitalize";
		} else{
			subGuideTitle.style.textTransform = "capitalize";
			subGuideTitle.style.color = "dimgrey";
		}

		subManagerLink.appendChild(subGuideTitle);

		if(subGuide.getElementsByTagName("hr").length){
			subGuide.insertBefore(subManagerLink, subGuide.getElementsByTagName("hr")[0]);
		} else {
			subGuide.appendChild(subManagerLink);
		}
	}
}

/* - Hide the live chat from the user and replace it with its button - U2 */
function hideLiveChat(){
  if(document.getElementById("chat") !== null){
    let iteration = 0;
    let clicked = false;

    if(document.getElementById("chatframe")){
      var checkInterval = setInterval(function(){
        let chatFrame = document.getElementById("chatframe");
        iteration++;

        // Prevent the interval from running too much time
        if(iteration > 20){
          console.error("[minimal] YT live chat error: Loading time exceeded 10s");
          clearInterval(checkInterval);
          return false;
        }

        // Check the load status of the live frame
        if(chatFrame.contentDocument.readyState == "complete"){
          if(document.getElementById("show-hide-button")){
            let chatButton = document.getElementById("show-hide-button").firstChild.firstChild;

            // Do a click once on the chat button if the chat is not hidden
            if(chatButton.firstChild.hasAttribute("aria-pressed")){
              if(chatButton.firstChild.getAttribute("aria-pressed") == "false"){
                chatButton.click();
              }
              else{
                clicked = true;
                clearInterval(checkInterval);
              }
            }
            else{
              if(chatFrame.contentDocument.body.childElementCount > 0 && !clicked){
                chatButton.click();
                clearInterval(checkInterval);
              }
            }
          }
        }
      },500);
    }
  }
}

// Execute all the functions here
function execute(){
  
  // Use theater mode
  activateTheaterMode();
  
  // Remove autoplay "feature"
  deactivateAutoplay();
  
  // Hide live chat once after the video loaded
  setTimeout(hideLiveChat, 500);
  
  // Replace the subscription list
  replaceSubscriptionManager();
}

// Watch when Youtube has loaded ALL elements
window.addEventListener("load", function(){
  var domInterval = setInterval(function(){
    if(document.getElementsByTagName("yt-page-navigation-progress")[0]){
      //Elements loaded then attach event listener to progress bar
      document.getElementsByTagName("yt-page-navigation-progress")[0].addEventListener("transitionend",execute);
      clearInterval(domInterval);
      execute();
    }
  },300);
});

