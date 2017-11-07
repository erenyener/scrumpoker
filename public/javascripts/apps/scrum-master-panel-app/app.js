
var ScrumMasterPanelApp = (function () {

    var END_POINTS = {
        GET_VOTERS_END_POINT: "/voters/",
        GET_VOTES_END_POINT: "/votes/",
        FINALIZE_SCORE_END_POINT: "/issues/finalizeScore",        
        GET_SPRINT_DETAIL_END_POINT: "/smp/detail/"
    }

    var CONSTANTS = {
        UNKNOWN: -1,
        COFFEE: -2,
    }

    var TEMPLATES = {
        USER: '<div id="{{userId}}" class="user-progress justify-center">'
                    +'<div class="col-sm-3 col-md-2 col-xl-1" style="padding: 0;"><div alt="profile photo" class="vote-status"></div></div>'
		        	+'<div class="col-sm-5 col-md-8 col-xl-6"><h6 class="pt-1">{{userName}}</h6></div>'
		            +'<div class="col-sm-4 col-md-2 col-xl-5 tar"><div class="progress-label vote"></div></div>'
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

    var showVotes = function(votes, numberOfVoters){
        
        var values = votes.map(function(obj) { return obj.voterId; });
        values = values.filter(function(v,i) { return values.indexOf(v) == i; });
        return values.length === numberOfVoters;
    }

    var applyActiveQuestion = function(issues, activeSprintOrderNumber, numberOfVoters){
       var activeIssue =  _.find(issues, function (issue) { return issue.orderNumber === activeSprintOrderNumber  });
       var activeIssueId = activeIssue._id
       
       $.ajax({
                type: "GET",
                url: END_POINTS.GET_VOTES_END_POINT   + activeIssueId,
                success: function (response) {  

                    if(showVotes(response, numberOfVoters)){
                        $(".vote").addClass("show");
                    }
                    
                    response.forEach(function(vote){
                        var userVoteSelector = '#' +  vote.voterId + ' .vote';
                        
                        var voteValue = parseInt(vote.value);

                        if(voteValue === CONSTANTS.COFFEE){
                            $('#' +  vote.voterId).removeClass("unknown");
                            $('#' +  vote.voterId).addClass("coffee");
                            $(userVoteSelector).text("COFFEE BREAK");
                        }else if(voteValue === CONSTANTS.UNKNOWN){
                            $('#' +  vote.voterId).removeClass("coffee");
                            $('#' +  vote.voterId).addClass("unknown");
                            $(userVoteSelector).text("NO IDEA");
                        }else{
                            $('#' +  vote.voterId).removeClass("coffee");
                            $('#' +  vote.voterId).removeClass("unknown");
                            $('#' +  vote.voterId).addClass("voted");
                            $(userVoteSelector).text(vote.value);
                        }                        
                    });
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

                    var numberOfVoters = sprintDetail.response.voters.length;
                   
                    
                    var issues = sprintDetail.response.issues;
                    appendVoters(sprintDetail.response.voters);  
                    applyActiveQuestion(issues, activeSprintOrderNumber, numberOfVoters);
                    
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

