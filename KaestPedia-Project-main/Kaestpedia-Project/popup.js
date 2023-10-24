$("#preview-card").hover(function() {
    $(this).find(".details").stop(true, true).fadeIn();
}, function() {
    $(this).find(".details").stop(true, true).fadeOut();
});