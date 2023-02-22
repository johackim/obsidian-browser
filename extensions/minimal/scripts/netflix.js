/* - Remove homepage tiles audio and video autoplay - C3 */
function removeAutoPlayingTrailer(){
	document.querySelectorAll(".bob-container .VideoMerchPlayer video, .bob-container .VideoMerchPlayer audio").forEach(
		function(player){
			player.muted = true;
			player.pause();
		}
	);
}
setInterval(removeAutoPlayingTrailer, 200) /* 200ms was arbitrary chosen */
