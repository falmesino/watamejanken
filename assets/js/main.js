/**
 * Tsunomaki Janken
 * Created by @falmesino
 */

var userHand = '';
var watameHand = '';
var watameRandom = '';
var score = 0;
var winStreak = 0;
var loseStreak = 0;

$(function(){

    // console.log('Document is ready, my Lord.');

    $(document).on('click', '#btnPlay', function(e){
        e.preventDefault();
        // console.log('Play button has been clicked!');
        gameScreen();
        return false;
    });

    $('#main').imagesLoaded()
    .always( function( instance ) {
        // console.log('all images loaded');
    })
    .done( function( instance ) {
        // console.log('all images successfully loaded');
        $('.loading').stop().fadeOut('fast', function(){

        });
    })
    .fail( function() {
        // console.log('all images loaded, at least one is broken');
    })
    .progress( function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        // console.log( 'image is ' + result + ' for ' + image.img.src );
    });

    $(document).on('click', '.btn-about', function(e){
        e.preventDefault();
        $('.wj-overlay').stop().addClass('active');
        return false;
    });

    $(document).on('click', '#btnAboutClose', function(e){
        e.preventDefault();
        $('.wj-overlay').stop().removeClass('active');
        return false;
    });

});

function resetChoice() {
    $('.wj-hands--player').stop().removeClass('ready').removeClass('locked').addClass('wj-hands--bottom');
    $('.wj-hands--player .wj-hands__item.selected').stop().removeClass('selected');
    $('.wj-hands--watame img.active').stop().removeClass('active');
    $('#btnReplay').parent().stop().addClass('d-none');
}

function lockChoice(target) {
    $('.wj-hands--player').stop().addClass('locked').removeClass('wj-hands--bottom');
    $('.wj-hands--player .wj-hands__item.selected').stop().removeClass('selected');
    target.stop().addClass('selected');
    $('.wj-about').hide();
}

function ctaScreen() {
    $('.wj-scene.active').stop().removeClass('active');
    $('.wj-scene--cta').stop().addClass('active');
    $('.wj-about').show();
}

function getWatameHand() {
    let watameHands = ['Rock', 'Paper', 'Scissor'];
    let output = watameHands[Math.floor(Math.random() * watameHands.length)];
    // console.log('Watame choose : ' + output);
    return output;
}

function gameScreen() {

    var docElm = document.documentElement;
    /*
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
    */

    resetChoice();

    $('.wj-scene.active').stop().removeClass('active');
    $('.wj-scene--main').stop().addClass('active');

    watameRandom = getWatameHand();

    var videoPlayer = new Plyr('#videoPlayer', {
        debug: false,
        autoplay: false,
        resetOnEnd: true,
        controls: [],
        settings: [],
        volume: 1,
        clickToPlay: false,
        disableContextMenu: true,
        hideControls: true,
        keyboard: {
            focused: false,
            seek: false
        },
        quality: {
            default: 1080,
            options: [720, 1080]
        },
        youtube: {
            noCookie: false,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            diasblekb: 1,
            controls: 0
        }
    });

    $(document).on('click', '#btnHandRock', function(e){
        e.preventDefault();
        lockChoice($(this));
        userHand = 'rock';
        watameRandom = getWatameHand();
        videoPlayer.play();
        return false;
    });

    $(document).on('click', '#btnHandPaper', function(e){
        e.preventDefault();
        lockChoice($(this));
        userHand = 'paper';
        watameRandom = getWatameHand();
        videoPlayer.play();
        return false;
    });

    $(document).on('click', '#btnHandScissor', function(e){
        e.preventDefault();
        lockChoice($(this));
        userHand = 'scissor';
        watameRandom = getWatameHand();
        videoPlayer.play();
        return false;
    });

    $(document).on('click', '#btnTimer', function(e){
        e.preventDefault();
        let currentTime = videoPlayer.media.currentTime;
        console.log(currentTime);
        return false;
    });

    $(document).on('click', '#btnReset', function(e){
        e.preventDefault();
        resetChoice();
        $('.wj-hands--player').stop().addClass('ready');
        $('.wj-hands--watame img.active').stop().removeClass('active');
        watameRandom = getWatameHand();
        videoPlayer.stop();
        return false;
    });

    $(document).on('click', '#btnReplay', function(e){
        e.preventDefault();
        resetChoice();
        $('.wj-hands--player').stop().addClass('ready');
        $('.wj-about').show();
        watameRandom = getWatameHand();
        videoPlayer.stop();
        return false;
    });

    $(document).on('click', '#btnPlayTest', function(e){
        e.preventDefault();
        videoPlayer.play();
        return false;
    });

    videoPlayer.on('ready', function(event){
        $('.wj-hands--player').stop().addClass('ready');
    });

    videoPlayer.on('ended', function(){
        $('#btnReplay').stop().fadeIn('fast', function(){
            $(this).stop().removeClass('d-none');
        });
    });

    videoPlayer.on('timeupdate', function(event){
        let currentTime = event.detail.plyr.media.currentTime;
        let targetTime = 13.50;
        let endTime = 20.00;

        if(currentTime >= targetTime) {
            $('.wj-hands--watame #watame' + watameRandom).stop().addClass('active');
        }

        if(currentTime >= endTime) {
            
            $('#btnReplay').parent().stop().fadeIn('fast', function(){
                $(this).stop().removeClass('d-none');
            });

            videoPlayer.stop();

        }

    });

}