$(function(){

    $("#gearTab").click(function(){
        var state = $(this).data('state');
        var width = $("#gearInfo").width();
        if(state == 'in')
        {
            $("#gearInfo, #gearTab").animate({
                left:'+=' + width + 'px'
            });
            $(this).data('state', 'out');
        }
        else{
            $("#gearInfo, #gearTab").animate({
                 left:'-=' + width + 'px'
            });
            $(this).data('state', 'in');
        }
    });
    
    
    $("#twitterTab").click(function(){
        var state = $(this).data('state');
        var width = $("#twitterInfo").width();
        if(state == 'in')
        {
            $("#twitterInfo").show();
            $("#twitterInfo, #twitterTab").animate({
                right:'+=' + width + 'px'
            });
            $(this).data('state', 'out');
        }
        else{
            $("#twitterInfo, #twitterTab").animate({
                 right:'-=' + width + 'px'
            }, function(){
                $("#twitterInfo").hide();
            });
            $(this).data('state', 'in');
        }
    });

});