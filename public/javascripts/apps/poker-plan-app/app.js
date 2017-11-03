
var PokerPlanApp = (function () {

    var END_POINTS = {
        CREATE_SPRINT_END_POINT : "/sprints",
        SUBMIT_ISSUES_END_POINT: "/issues"
    }

    var createSprint = function(sprintName, numberOfVoters, cb){
        
        var sprintId = 0 ;

        var requestData = {
            "title":sprintName,"numberOfVoters":numberOfVoters
        };

        $.ajax({
            type: "POST",
            url: END_POINTS.CREATE_SPRINT_END_POINT,
            data: requestData, 
            success: function (data) {      
                console.log(data);
                console.log(data.response);
                if(!!data && !!data.response){
                    cb(data.response._id);
                }               
            }
        });        
    }

    var createIssues  = function(sprintId, issuesArray, cb){

        var issuesArrayWillBeSentToServer = [];
        var orderNumber = 1;

        issuesArray.forEach(function(issue) {
            issuesArrayWillBeSentToServer.push({
                "title":issue,
                "orderNumber": orderNumber
            })
            orderNumber++;
        }, this);

        var requestData = {
            "issues":issuesArrayWillBeSentToServer,
            "sprintId":sprintId
        };

        $.ajax({
            type: "POST",
            url: END_POINTS.SUBMIT_ISSUES_END_POINT,
            data: requestData, 
            success: function (data) {      
                console.log(data);
                cb();           
            }
        });     
    }

    var submitForm = function(sprintName, numberOfVoters, issues){
        createSprint(sprintName, numberOfVoters, function(sprintId){
            if(sprintId !=='' ){
                var issuesArray = issues.split("\n");
                createIssues(sprintId, issuesArray, function(){

                });
            }
        });       

    };

    return {
        submitForm:submitForm
    }


})();


$(document).ready(function () {
    
    $('#submitPokerPlan').click(function(){
        var sprintName = $('#name').val();
        var numberOfVoters = parseInt($('#numberOfVoters').val());
        var issues = $('#issues').val();
        PokerPlanApp.submitForm(sprintName, numberOfVoters, issues);
    })
})
