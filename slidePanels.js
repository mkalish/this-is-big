$(function(){

    $("#gearTab").click(function(){
        var state = $(this).data('state');
        if(state == 'in')
        {
            $("#gearInfo, #gearTab").animate({
                left:'+=250px'
            }, 'slow');
            $(this).data('state', 'out');
        }
        else{
            $("#gearInfo, #gearTab").animate({
                left:'-=250px'
            }, 'slow');
            $(this).data('state', 'in');
        }
    });

});