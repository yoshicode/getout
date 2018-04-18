$(function(){

	var audio = new Audio('static/sounds/typewriter.mp3');
	setTimeout(function () {
		audio.play();
	}, 2000)

	var setElm = $('.split'),
	delaySpeed = 200,
	fadeSpeed = 0;

	setText = setElm.html();

	setElm.css({visibility:'visible'}).children().addBack().contents().each(function(){
		var elmThis = $(this);
		if (this.nodeType == 3) {
			var $this = $(this);
			$this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplitLoad">$&</span>'));
		}
	});
	$(window).load(function(){
		splitLength = $('.textSplitLoad').length;
		setElm.find('.textSplitLoad').each(function(i){
			splitThis = $(this);
			splitTxt = splitThis.text();
			splitThis.delay(i*(delaySpeed)).css({display:'inline-block',opacity:'0'}).animate({opacity:'1'},fadeSpeed);
		});
		setTimeout(function(){
				setElm.html(setText);
				document.getElementsByClassName('nextBtn')[0].style.visibility = "visible";
				document.getElementsByClassName('nextBtn')[1].style.visibility = "visible";
				document.getElementsByClassName('intro')[0].style.visibility = "visible";
				audio.pause();
		},splitLength*delaySpeed+fadeSpeed);
	});
});
