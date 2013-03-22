$(function(){

    $("#gearTab").click(function(){
        var state = $(this).data('state');
        var width = $("#gearInfo").width();
        if(state == 'in')
        {
            $("#gearInfo, #gearTab").animate({
                left:'+=' + width + 'px'
            }, 'slow');
            $(this).data('state', 'out');
        }
        else{
            $("#gearInfo, #gearTab").animate({
                 left:'-=' + width + 'px'
            }, 'slow');
            $(this).data('state', 'in');
        }
    });
    
    
    $("#twitterTab").click(function(){
        var state = $(this).data('state');
        var width = $("#twitterInfo").width();
        if(state == 'in')
        {
            $("#twitterInfo, #twitterTab").animate({
                right:'+=' + width + 'px'
            }, 'slow');
            $(this).data('state', 'out');
        }
        else{
            $("#twitterInfo, #twitterTab").animate({
                 right:'-=' + width + 'px'
            }, 'slow');
            $(this).data('state', 'in');
        }
    });

});