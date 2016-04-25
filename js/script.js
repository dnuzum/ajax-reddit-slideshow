$(document).ready(function() {
	var images = [];
	var interval = -1;
	var index = 0;

 	function getImages(subject) {
 		var url = "http://www.reddit.com/search.json?q="+subject+"nsfw:no";
 		$.get(url, function(data) {
 			 images = data.data.children.map(function(child) {
 				return child.data;
 				}).filter(function(child) {
 					return child.preview != undefined;
 				}).map(function(child) {
 					return child.preview.images[0].source.url;
 				});
 				startSlideshow();
 		});
	}
	function startSlideshow() {
		if (interval != -1) {
			stopSlideshow();
		}
		interval = setInterval(function() {
			var imageHolder = $(".input-group-button");
			imageHolder.html("<img data-src="+images[index++]+' alt="Pictures go here!" src='+images[index++]+"/>");
			index = index % images.length;
		}, 2000)
	}

	function stopSlideshow() {
		clearInterval(interval);
		index = -1;
	}

		$('#searchBtn').on('click', function(e){
 		e.preventDefault();
 		var input = $('.search').val();
				$('.search').val('');
		stopSlideshow();
		getImages(input);
		});
});