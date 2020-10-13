function loadTeam(season, stage) {
  var xhr = $.ajax({
    headers: { 'X-Auth-Token': '182fc46d0d134107b4260af19fc6581e' },
    url: `https://api.football-data.org/v2/competitions/CL/teams/?season=${season}&stage=${stage}`,
    dataType: 'json',
    type: 'GET',
    beforeSend: () => {
       $("#list").html(`
        <div class="row center-align">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
       `)
    },
    success: data => {
      dataTeams = data.teams;
      $('#list').html("")
      if (data.length === 0) {
        $('#list').append("<h2> DATA NOT FOUND </h2>")
      } else {          
        dataTeams.forEach(team => {
          if ( team.crestUrl == null ) logo = `<p class="team-detail">LOGO NOT FOUND</p>`;
          else logo = `<img src="${team.crestUrl}" data-id="${team.id}">`;
              
          $('#list').append(`
            <div class="col s12 m4">
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light team-detail" data-id="${team.id}">
                  ${logo}
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
                  <p>shortName: ${team.shortName}</p>
                  <p>website: ${team.website}</p>
                  <p>founded: ${team.founded}</p>
                  <p>venue: ${team.venue}</p>
                </div>
              </div>
            </div>
          `)
        });
        
        $(".team-detail").on("click", function(e) {
            id = e.target.getAttribute("data-id");
            loadTeamDetail(id);
        })
      }
    }
  });
  xhr.onreadystatechange = function() { console.logt(xhr.readyState); };
}