$(document).ready(function(){
$('#searchUser').on('keyup',function(e){
    let username = (e.target.value);
    //Ajax request
    $.ajax({
      url:'https://api.github.com/users/'+username,
        data:{
      client_id:'de8c89f4a45768b0d5e7',
      client_secret:'424033f75470772281f75c22585c3acae67e5bc6'

      }
    }).done(function(user){
      $.ajax({
      //url:'https://api.github.com/repos/'+a.owner.login+'/'+a.name+'/collaborators?access_token='+apiKey,
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
        client_id:'de8c89f4a45768b0d5e7',
        client_secret:'424033f75470772281f75c22585c3acae67e5bc6',
        sort:'created: asc',
        per_page: 5
    }
}).done(function(repos){
  $.each(repos, function(index,repo){
          $('#repos').append(`
            <div class="well">
            <div class="row">
            <div class="col-md-7">
            <strong>${repo.name}</strong>: ${repo.description}
            </div>
            <div class="col-md-3">
            <span class="label label-default">Forks:${repo.forks_count}</span>
            <span class="label label-primary">Watchers:${repo.watchers_count}</span>
            <span class="label label-success">Stars:${repo.stargazers_count}</span>
            </div>
            <div class="col-md-2">
            <a href="{repo.html_url}" target="_blank" class="btn btn_default">Repo Page</a>
          </div>
        </div>
      </div>
    `);

  });
        //console.log(repos);
});
    $('#profile').html(`
    <div class="panel panel-default">
      <div class="panel-heading">
      <h3 class="panel-title">${user.name}</h3>
    </div>
      <div class="panel-body">
      <div class="row">
      <div class="col-md-3">
      <img class="thumbnail avatar" src="${user.avatar_url}">
      <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View profile</a>
      </div>
      <div class="col-md-9">
      <span class="label label-default">public repos:${user.public_repos}</span>
      <span class="label label-primary">Public Gists:${user.public_gists}</span>
      <span class="label label-success">Followers:${user.followers}</span>
      <span class="label label-info">Following:${user.following}</span>
      <br></br>
      <ul class="list-group">
      <li class="list-group-item">Company:${user.company}</li>
      <li class="list-group-item">website/blog:${user.blog}</li>
      <li class="list-group-item">Location:${user.Location}</li>
      <li class="list-group-item">Member Since:${user.created_at}</li>
      </ul>
      </div>
      </div>
    </div>
   </div>
   <h3 class="page-header">Latest repos</h3>
   <div id="repos"></div>
  `);
});
});
});
