$.getJSON( "https://api.spotify.com/v1/albums/3tIuG097mX3i1C7tdseRvN", function( json ) {

    // Artit's Name
    $('.artist span').text(json.artists[0].name);

    // Album's title
    $('.album span').text(json.name);

    // Album's cover
    $( '<img>' ).attr({ 
        src: json.images[1].url, 
        alt : json.name+' Album Cover' }).appendTo( 'figure' );

    // Get soundtracks
    $.each( json.tracks.items, function( key, val ) {
      $('#playlist').append('<li audiourl="'+ val.preview_url +'" audioname="'+ val.name +'"><span class="trackName">'+ val.name +'</span><span class="trackDuration">'+ millisecondsToTime(val.duration_ms) +'</span></li>');
    });

    // inner variables
    var song;

    // itialize first elem
    initAudio($('#playlist li:first-child'));

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var trackName = elem.attr('audioname');

        song = new Audio(url);

        $('.trackPlaying span').text(trackName);

        $('#playlist li').removeClass('active');
        elem.addClass('active');


    }

    function playAudio() {
        song.play();

        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
    }
    function stopAudio() {
        song.pause();

        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
    }

    // play click
    $('.play').click(function (e) {
        e.preventDefault();

        playAudio();
    });

    // pause click
    $('.pause').click(function (e) {
        e.preventDefault();

        stopAudio();
    });


    // next click
    $('.next').click(function (e) {
        e.preventDefault();

        stopAudio();

        var next = $('#playlist li.active').next();
        if (next.length == 0) {
            next = $('#playlist li:first-child');
        }

        initAudio(next);
        
    });

    // previous click
    $('.prev').click(function (e) {
        e.preventDefault();

        stopAudio();

        var prev = $('#playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('#playlist li:last-child');
        }
        initAudio(prev);
    });

    // playlist elements - click
    $('#playlist li').click(function () {
        stopAudio();
        initAudio($(this));
    });


    // convert ms into m:ss format
    function millisecondsToTime(s)
    {
        function addZ(n) {
            return (n<10? '0':'') + n;
          }
          var ms = s % 1000;
          s = (s - ms) / 1000;
          var secs = s % 60;
          s = (s - secs) / 60;
          var mins = s % 60;

          return mins + ':' + addZ(secs);
    }

});//getJSON

