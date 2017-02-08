/*
Remaining Tasks
Not appending tweet correctly so hover doesn't work on new items
Saving data
Black Diamond (i.e. bootstrap for feedback on images)
*/

function pad(num, size) {
  var s = num+ "";
  while (s.length < size) s = "0" + s;
  return s;
}

var getRandom = function(seed) {
  if(seed === undefined) seed = 30;
  return Math.floor(Math.random() * (seed - 0) + 0);
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

function Tweet(avatar, fullname, username, tweettext, tweettime, tweetid) {
  this.tweetid = tweetid;
  this.avatar = avatar;
  this.fullname = fullname;
  this.username = username;
  this.tweettext = tweettext;
  this.tweettime = tweettime;
}

function formatTweet() {
  var html = '\
  <div class="tweet" rel="id-' + this.tweetid + '">\
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
  <div id="tweet-controls"><!--reply-controls-->\
    <div id="char-count">140</div>\
    <button class="button" id="tweet-submit">Tweet</button>\
  </div>\
  </div>\
  </div>\
  </div>';
  return html;
}

Tweet.prototype.formatTweet = formatTweet;

$(document).ready(function() {
  var $stream = $('#stream');

  //Tweet Forms
  //avatar, fullname, username, tweettext, tweettime
  var user = new Tweet('img/profile.jpg', 'Rebecca Hall', 'uncoolplane', null, null, 0);
  var $composer = $('.tweet-compose');

  $composer.on('click', function() {
    var $current = $(this);
    $current.css('height', "66px");
    var $controls = $current.next('#tweet-controls');
    $controls.show();

    var $submit = $controls.find('#tweet-submit');
    var $charcount = $controls.find('#char-count');

    //move this into "Onclick of text area before"
    $submit.on('click', function() {
      var text = $current.val();
      user.tweettext = text;
      user.tweettime =  getCurrentDate();
      user.tweetid = getRandom(2000);
      var html = user.formatTweet();
      $stream.prepend(html);

      //reset the box
      $controls.hide();
      $current.val('').css('height', "33px");
      $charcount.css('color', 'black').text(140);
    });

  }).on('keyup', function() {
    var $controls = $(this).next('#tweet-controls');
    var $submit = $controls.find('#tweet-submit');
    var $charcount = $controls.find('#char-count');

    $submit.css('background-color', 'red');

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

  //Stream Animations
  var $tweetcontent = $('.tweet .content');

  //Hover Tweet show (Reply, Retweet, Favorite, More),use animation
  $tweetcontent.hover(function() {
    var $tweet = $(this).closest('.tweet');
    var $actions = $tweet.find('.tweet-actions');
    var $stats = $tweet.find('.stats');
    var $replyaction = $tweet.find('.action-reply').parent();
    var $reply = $tweet.find('.reply');

    $actions.slideDown(300);
    $stats.slideDown(500);

    // Click on Reply, show Reply box
    $replyaction.on('click', function() {
      $reply.show();
    });
  }, function() {
    var $tweet = $(this).closest('.tweet');
    var $actions = $tweet.find('.tweet-actions');
    var $stats = $tweet.find('.stats');
    var $reply = $tweet.find('reply');

    $actions.slideUp(500);
    $stats.slideUp(300);
    $reply.hide();
  });

  //Bootstrap tool tips when hovering avatar
})
