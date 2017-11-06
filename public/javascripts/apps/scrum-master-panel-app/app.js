
var ScrumMasterPanelApp = (function () {

    var END_POINTS = {
        GET_VOTERS_END_POINT: "/voters/",
        GET_VOTES_END_POINT: "/votes/",
        FINALIZE_SCORE_END_POINT: "/issues/finalizeScore",        
        GET_SPRINT_DETAIL_END_POINT: "/smp/detail/"
    }

    var TEMPLATES = {
        USER: '<div id="{{userId}}" class="user-progress justify-center">'
                    +'<div class="col-sm-3 col-md-2 col-xl-1" style="padding: 0;"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/88090-200.png" alt="profile photo" class="circle profile-photo" style="width: 100%; max-width: 100px;"></div>'
		        	+'<div class="col-sm-6 col-md-8 col-xl-10"><h6 class="pt-1">{{userName}}</h6></div>'
		            +'<div class="col-sm-3 col-md-2 col-xl-1"><div class="progress-label vote"></div></div>'
                +'</div>'
    }
    

    
    var appendVoters = function(voters){
         if(voters && voters.length > 0){
            voters.forEach(function(voter) {
                var userSelector= $('#' + voter._id);
                if(userSelector.length <= 0){
                    var userTemplete = TEMPLATES.USER;
                    userTemplete = userTemplete.replace("{{userName}}", voter.name);
                    userTemplete = userTemplete.replace("{{userId}}", voter._id);
                    $('#users').append(userTemplete);
                }            
            }, this);
        }
    };

    var applyActiveQuestion = function(issues, activeSprintOrderNumber){
       var activeIssue =  _.find(issues, function (issue) { return issue.orderNumber === activeSprintOrderNumber  });
       var activeIssueId = activeIssue._id
       
       $.ajax({
                type: "GET",
                url: END_POINTS.GET_VOTES_END_POINT   + activeIssueId,
                success: function (response) {  
                    
                    response.forEach(function(vote){
                        var userVoteSelector = '#' +  vote.voterId + ' .vote';
                        $(userVoteSelector).text(vote.value);
                    })
                    
                    console.log(response);
                    
                }
        });
    }

    var getSprintDetailByInterval = function(sprintId){
        setInterval(function(){
            
            $.ajax({
                type: "GET",
                url: END_POINTS.GET_SPRINT_DETAIL_END_POINT   + sprintId,
                success: function (sprintDetail) {    
                    var currentActive = parseInt($('#activeOrderNumber').val());
                    var activeSprintOrderNumber = sprintDetail.response.activeQuestionOrder.activeOrderNumber;

                    if(currentActive !== activeSprintOrderNumber){
                        $('#activeOrderNumber').val(activeSprintOrderNumber);
                    }
                   
                    
                    var issues = sprintDetail.response.issues;
                    appendVoters(sprintDetail.response.voters);  
                    applyActiveQuestion(issues, activeSprintOrderNumber);
                    
                }
            });

        }, 5000);
    };

    var init = function(sprintId){
        getSprintDetailByInterval(sprintId);
    };

    var finalizeScore = function(issueId, issuesLength, activeOrderNumber, sprintId){
        var finalScore = prompt("final score ? ");
        
        var requestData = {
            issueId:issueId,
            finalScore:finalScore,
            issuesLength:issuesLength,
            activeOrderNumber:activeOrderNumber,
            sprintId:sprintId
        };

        $.ajax({
                type: "POST",
                url: END_POINTS.FINALIZE_SCORE_END_POINT,
                data:requestData,
                success: function (response) {  
                    location.reload();
                    console.log(response);
                    
                }
        });
    }

    return {
        init:init,
        finalizeScore:finalizeScore

    }


})();


$(document).ready(function () {
    
    var sprintId = $('#sprintId').val();    
    ScrumMasterPanelApp.init(sprintId);

    $('.timeline-badge.primary').click(function(){
        var issueId = $(this).attr("data-issueid");        
        var issuesLength = $('#issuesLength').val();
        var activeOrderNumber = $('#activeOrderNumber').val();
        ScrumMasterPanelApp.finalizeScore(issueId, issuesLength, activeOrderNumber, sprintId);
    })
})

