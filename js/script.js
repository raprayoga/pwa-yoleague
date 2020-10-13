$(document).ready(function(){
	// navigation response
	$(".topnav a, #bottom-nav a").on('click', function(e) {
		console.log(e)
		let page = e.target.getAttribute("href").substr(1)
		loadContent(page)
	});
	
	// Load page content
	let page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadContent(page);

	function loadContent(page) {
		$.ajax({
			url: `pages/${page}.html`,
			type: 'get',
			dataType: 'html',
			success: function(data) {
				$('main').html("")
				if (data.length === 0) {
					$('main').append("<h2> PAGE NOT FOUND </h2>")
				} else {
					$('main').append(data)

					// materializeCss plugin
					$('.sidenav').sidenav();
          $('select').formSelect();
          $('.tabs').tabs();
					
					// All button response          
					$('.search-team').on('click', function(e) {
						let season = $('#season').val();
            let stage = $('#stage').val();
            if ( season == 2019 && (stage == "QUARTER_FINALS" || stage == "SEMI_FINALS" || stage == "FINAL")) {
              $('#list').html("");
              $('#list').append("<h2>SORRY, the latest match of the 2019 season is the ROUND_OF_16")
            } else loadTeam(season, stage);
					})

				}
			}
		});
  }
  
});