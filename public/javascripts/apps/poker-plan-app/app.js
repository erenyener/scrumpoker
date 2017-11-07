
var PokerPlanApp = (function () {

    var END_POINTS = {
        CREATE_SPRINT_END_POINT : "/sprints",
        SUBMIT_ISSUES_END_POINT: "/issues",
        SCRUM_MASTER_PANEL_END_POINT: "smp/"
    }

    var createSprint = function(sprintName, numberOfVoters, cb){
        
        var sprintId = 0 ;

        var requestData = {
            "title":sprintName,
            "numberOfVoters":numberOfVoters
        };

        $.ajax({
            type: "POST",
            url: END_POINTS.CREATE_SPRINT_END_POINT,
            data: requestData, 
            success: function (data) {      
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
                cb();           
            }
        });     
    }


    var submitForm = function(sprintName, numberOfVoters, issues){


        createSprint(sprintName, numberOfVoters, function(sprintId){
                if(sprintId !=='' ){
                    var issuesArray = issues.split("\n");
                    createIssues(sprintId, issuesArray, function(){
                        if(sprintId && sprintId != '' && sprintId.length > 0){
                            document.location = END_POINTS.SCRUM_MASTER_PANEL_END_POINT + sprintId;
                        }
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

        var $name = $('#name');
        var $numberOfVoters = $('#numberOfVoters');
        var $issues = $('#issues');

        var isFormValid = true;

        if (window.validatorNod.getStatus('#name') === nod.constants.INVALID || window.validatorNod.getStatus('#name') === nod.constants.UNCHECKED) {
            toastr.error('Sprint Name is Invalid');
            isFormValid = false;
        }else if(window.validatorNod.getStatus('#numberOfVoters') === nod.constants.INVALID || window.validatorNod.getStatus('#numberOfVoters') === nod.constants.UNCHECKED){
            toastr.error('Number Of Voters area is Invalid');
            isFormValid = false;
        }else if(window.validatorNod.getStatus('#issues') === nod.constants.INVALID || window.validatorNod.getStatus('#issues') === nod.constants.UNCHECKED){
            toastr.error('Issues area is Invalid');
            isFormValid = false;
        }else{
            isFormValid = true;
        }        

        if(isFormValid){
            var sprintName = $name.val();
            var numberOfVoters = parseInt($numberOfVoters.val());
            var issues = $issues.val();

            PokerPlanApp.submitForm(sprintName, numberOfVoters, issues);
        }
    })
})
