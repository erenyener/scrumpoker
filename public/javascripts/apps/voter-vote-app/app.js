
var VoterVoteApp = (function () {

    var END_POINTS = {
        GET_ACTIVE_ISSUE_END_POINT: "/issues/getActive/",
        VOTE_END_POINT:"/votes"
    }   
    

    var login = function(voterName, sprintId){  
        
        var requestData = {
            voterName:voterName,
            sprintId:sprintId
        }

         
    };

    var listenActiveQuestion = function(sprintId){
        setInterval(function(){
            
            $.ajax({
                type: "GET",
                url: END_POINTS.GET_ACTIVE_ISSUE_END_POINT + sprintId,
                success: function (data) {      
                    if(data){
                        $('#subtitle').text(data.title);             
                        
                        if($('#activeIssueId').val() !== data._id){
                            location.reload();
                        }
                    }
                }
            });

        }, 5000);
    };

    var init = function(sprintId){

        $.ajax({
                type: "GET",
                url: END_POINTS.GET_ACTIVE_ISSUE_END_POINT + sprintId,
                success: function (data) {      
                    if(data){
                        listenActiveQuestion(sprintId);
                        $('#subtitle').text(data.title);                        
                        $('#activeIssueId').val(data._id);
                    }
                }
        });
    };
    
    var vote = function(sprintId, voterId, voteValue, issueId){

        var requestData = {
            sprintId:sprintId,
            issueId:issueId,
            voterId:voterId,
            value:voteValue

        };

        $.ajax({
                type: "POST",
                url: END_POINTS.VOTE_END_POINT,
                data:requestData,
                success: function (data) {      
                    
                }
        });
    };

    return {
        init: init,
        vote:vote
    }


})();


$(document).ready(function () {
    
    var sprintId = $('#sprintId').val();
    var voterId = $('#voterId').val();
    VoterVoteApp.init(sprintId);

    $('.poker-card').click(function(){
        var activeIssueId = $('#activeIssueId').val();
        var voteValue = parseInt($(this).attr('data-value'));
        $('.poker-card').removeClass('active');
        $(this).addClass('active');
        VoterVoteApp.vote(sprintId, voterId, voteValue, activeIssueId);
    });
})
