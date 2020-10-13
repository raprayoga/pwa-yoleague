function loadTeamDetail(id) {
  $.ajax({
    headers: { "X-Auth-Token": "182fc46d0d134107b4260af19fc6581e" },
    url: `https://api.football-data.org/v2/teams/${id}`,
    dataType: "json",
    type: "GET",
    fail: () => alert("request failed"),
    beforeSend: () => {
      $("main").html(`
         <div class="row center-align" style="margin-top: 200px;">
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
        `);
    },
    success: (data) => {
      console.log(data);
      if (data.length === 0) {
        $("main").append("<h2> DATA NOT FOUND </h2>");
      } else {
        // Error Handling
        if (data.crestUrl == null)
          logo = `<h2 class="data-detail">LOGO NOT FOUND</h2>`;
        else logo = data.crestUrl;

        if (!data.activeCompetitions.length) competition = "Data not found";
        else
          competition =
            data.activeCompetitions[data.activeCompetitions.length - 1].name;

        $("main").html(`
          <div class="container">
            <div class="row center-align">
              <div class="col s12 m12 logo-detail">
                  <div class="card-image">
                    <img src="${logo}">
                  </div>
                  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
              </div>
            </div>

            <div class="row">
              <div class="col s12">
                <ul class="tabs">
                  <li class="tab col s3"><a class="active" href="#detail">Detail Team</a></li>
                  <li class="tab col s3"><a href="#squad">Squad</a></li>
                </ul>
              </div>
              <div id="detail" class="col s12">
                <table style="width:100%">
                  <tr>
                    <th>Name</th>
                    <th>${data.name}</th>
                  </tr>
                  <tr>
                    <td>ShortName</td>
                    <td>${data.shortName}</td>
                  </tr>
                  <tr>
                    <td>Tla</td>
                    <td>${data.tla}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>${data.address}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>${data.phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>${data.email}</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>${data.website}</td>
                  </tr>
                  <tr>
                    <td>Founded</td>
                    <td>${data.founded}</td>
                  </tr>
                  <tr>
                    <td>ClubColors</td>
                    <td>${data.clubColor}</td>
                  </tr>
                  <tr>
                    <td>Venue</td>
                    <td>${data.venue}</td>
                  </tr>
                  <tr>
                    <td>Competition</td>
                    <td>${competition}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>${data.area.name}</td>
                  </tr>
                  <tr>
                </table>
              </div>
              <div id="squad" class="col s12">
              
        `);

        if (!data.squad.length) $("#squad").append("DATA NOT FOUND");
        else {
          data.squad.forEach((data) => {
            if (!data.position) position = "Manager";
            else position = data.position;

            $("#squad").append(`
            <div class="col s12 m3">
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light team-detail">
            <img src="img/squad.svg">
            </div>
            <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
            <p>${position}</p>
            </div>
            <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
            <p>Name: ${data.name}</p>
            <p>Position: ${data.position}</p>
            <p>DateOfBirth: ${data.dateOfBirth}</p>
            <p>CountryOfBirth: ${data.countryOfBirth}</p>
            <p>Nationality: ${data.nationality}</p>
            <p>ShirtNumber: ${data.shirtNumber}</p>
            <p>Role: ${data.role}</p>
            </div>
            </div>
            </div>
            `);
          });
        }

        $("main").append(`
            </div>  
            </div>
          </div>
        `);

        $(".tabs").tabs();
      }
    },
  });
}
