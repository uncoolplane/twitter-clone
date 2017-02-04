function pad(num, size) {
  var s = num+ "";
  while (s.length < size) s = "0" + s;
  return s;
}

function getCurrentDate() {
  var month = [];
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';

  var currentdate = new Date();
  var datetime = currentdate.getHours() + ":"
  + currentdate.getMinutes() + " - "
  + pad(currentdate.getDate(), 2) + " "
  + (month[currentdate.getMonth()])  + " "
  + pad(currentdate.getFullYear().toString().substr(2, 2), 2);
  return datetime;
}
function Tweet(avatar, fullname, username, tweettext, tweettime) {
  this.avatar = avatar;
  this.fullname = fullname;
  this.username = username;
  this.tweettext = tweettext;
  this.tweettime = tweettime;
}

function formatTweet() {
  var html = '\
  <div class="tweet">\
  <div class="content">\
  <img class="avatar" src="' + this.avatar + '" />\
  <strong class="fullname">' + this.fullname + '</strong>\
  <span class="username">@' + this.username + '</span>\
  <p class="tweet-text">' + this.tweettext + '</p>\
  <div class="tweet-actions">\
  <ul>\
  <li><span class="icon action-reply"></span> Reply</li>\
  <li><span class="icon action-retweet"></span> Retweet</li>\
  <li><span class="icon action-favorite"></span> Favorite</li>\
  <li><span class="icon action-more"></span> More</li>\
  </ul>\
  </div>\
  <div class="stats">\
  <div class="retweets">\
  <p class="num-retweets">30</p>\
  <p>RETWEETS</p>\
  </div>\
  <div class="favorites">\
  <p class="num-favorites">6</p>\
  <p>FAVORITES</p>\
  </div>\
  <div class="users-interact">\
  <div>\
  <img src="img/jennyshen.jpg" />\
  <img src="img/damenleeturks.jpg" />\
  </div>\
  </div>\
  <div class="time">\
  ' + this.tweettime + '\
  </div>\
  </div>\
  <div class="reply">\
  <img class="avatar" src="' + this.avatar + '" />\
  <textarea class="tweet-compose" placeholder="Reply to @' + this.username + '" /></textarea>\
  </div>\
  </div>\
  </div>';
  return html;
}

Tweet.prototype.formatTweet = formatTweet;

$(document).ready(function() {
  //avatar, fullname, username, tweettext, tweettime
  var user = new Tweet('img/profile.jpg', 'Rebecca Hall', 'uncoolplane', null, null);
  var $composer = $('.tweet-compose');
  var $submit = ('#tweet-submit');
  var $charcount = $('#char-count');
  var $controls = $('#tweet-controls');

  $composer.on('click', function() {
    $(this).css('height', "66px");
    $controls.show();
  });

  $composer.on('keyup', function() {
    var text = $(this).val();
    var len = text.length;
    var newlength = 140-len;
    $charcount.text(newlength);
    if(newlength <= 10) {
      $charcount.css('color', 'red');
    } else {
      $charcount.css('color', 'black');
    }

    if(len > 140) {
      $submit.prop('disabled', true);
    } else {
      $submit.prop('disabled', false);
    }
  });

  $submit.on('click', function() {
    var text = $composer.val();
    user.tweettext = text;
    user.tweettime =  getCurrentDate();
    var html = user.formatTweet();
    $('#stream').prepend(html);

    //reset the box
    $controls.hide();
    $composer.val('').css('height', "33px");
    $chartcount.css('color', 'black').text(140);
  });

  $('.tweet').mouseenter(function() {
    $(this).find('.tweet-actions').show();
  });

  $('.tweet').mouseleave(function() {
    $(this).find('.tweet-actions').hide();
  });

  $('.tweet').on('click', function() {
    $('.stats').hide();
    $(this).find('.stats').fadeIn();
  });

  $('.action-reply').on('click', function() {
    $('.reply').hide();
    $(this).parent('.tweet-actions').next('.reply').fadeIn();
  });
})
