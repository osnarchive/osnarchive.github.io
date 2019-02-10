$(document).ready(function() {
window.biolithicAnalyticsMode = "single";
});

// all app links do no use href links, we send them to this tester function which tests for an internet connection before opening the link
// we can prevent errors and show a nice message if they are offline
function onLinkClick(thewebsite)
{
  if (networkstatus !== "online") {
    alert("Error: You are offline. Try again when you have a network connection.");
  }
  else {
    var website = thewebsite;
    var win=window.open(website, '_blank');
    win.focus();
    return false;
  }
}

function dummySuccess() {
}

function handleError(error) {
  var errormessage = error.status;
  if ( (error.status == "200") || (error.status == "201")) {
    return false;
  }
  if (error.status == "404") {
    errormessage = "page not found -- please check to see if you have an internet connection.";
  }
  if ( (error.status == "400") || (error.status == "401") || (error.status == "403") ) {
    errormessage = "your form contains missing fields, or user mistakes like putting a word in a number field.  Please check them and try again.";
  }

  if ( (error.status == "500") || (error.status == "502") || (error.status == "503") ) {
    errormessage = "it is down on our end.  Please try again in a minute or later.";
  }
  alert(error.statusText + ": " + errormessage);
}

function get_playlists() {
    $.getJSON( "http://localhost/analytics/api/listplays/" ).done(function( json ) { loop_through_each_playlist(json); });
}

function loop_through_each_playlist(data) {
var thelength = data.length;
for (var x = 0; x < thelength; x++) {
    setTimeout(get_playlist_videos(data[x]), 5000);
    }
}

function get_playlist_videos(num) {
      var x = num;
      var theUrl = "http://localhost/analytics/api/playlists/" + x;
      $.getJSON( theUrl ).done(function( json ) {

        var someids = [];
        var videos = [];
        var thelength = json.ids.length;
        for (var i = 0; i < thelength; i++) {
          var obj = {};
          obj.ids = json.ids[i];
          someids.push(json.ids[i]);
          obj.titles = json.titles[i];
          obj.thumbnails = json.thumbnails[i];
          obj.viewCount = 0;
          obj.likeCount = 0;
          obj.dislikeCount = 0;
          obj.commentCount = 0;
          obj.playlist = x;
          videos.push(obj);
          var idsForUrl = someids.join();
        }
        setTimeout(get_video_statistics(videos, idsForUrl), 5000);

        });

}


function get_video_statistics(videos, idsForUrl) {

var videos = videos; // video information for each video in the playlist
var idsForUrl = idsForUrl; // video ids for each video in the playlist
    // console.log(idsForUrl);
    // videos[0].ids "xb04y8FzHAE"
    // videos[1].ids "13rloBUTQgQ"
    // idsForUrl    xb04y8FzHAE,13rloBUTQgQ,JBuIggM2Sn8,hxTuNtnCMOU,ZEZg5P3JcqE,VNzthWZNDDQ,w0CPttlx0as,ZlVgBLqo7gA,pgpacUkW7sg,r4wQl87BCxE,n3eyNBvSUQ4

    var theUrl = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDOkg-u9jnhP-WnzX5WPJyV1sc5QQrtuyc&part=statistics&id=" + idsForUrl;
             $.getJSON( theUrl ).done(function( data ) {
                  var thelength = data.items.length;
                  // console.log("THIS IS VIDEO ONE");
                  // console.log(videos[0]);
                  // console.log("the length from get google call is: " + data.items.length);
                  // console.log("this is video one");
                  // console.log(data.items[0]);

                  for (var z = 0; z < thelength; z++) {
                    videos[z].viewCount = data.items[z].statistics.viewCount;
                    videos[z].likeCount = data.items[z].statistics.likeCount;
                    videos[z].dislikeCount = data.items[z].statistics.dislikeCount;
                    videos[z].commentCount = data.items[z].statistics.commentCount;
                    // console.log(videos[z]);  // all the information about a specific video
                    // videos[z].favoriteCount = data.items[z].statistics.favoriteCount;
                    }
                    window.localStorage.setItem(videos[0].playlist, JSON.stringify(videos));
                });
}


function video_data_ready() {
  $(".left.menu a").text("Youtube Channel Analytics by Biolithic");
  $("body").css("opacity", "1");
}

var testItem = window.localStorage.getItem("PLijj2USOOcf_uBLZPoYp5YYQZocUIrHzq");
  if (testItem === null) {
      $("body").css("opacity", ".2");
      $("h1").text("Youtube data loading...");
      get_playlists();
      setTimeout(video_data_ready, 10000);
}
