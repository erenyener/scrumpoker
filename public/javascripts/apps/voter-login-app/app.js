
var VoterLoginApp = (function () {

    var END_POINTS = {
        LOGIN_END_POINT: "/voters",
        VOTER_VOTE_END_POINT: "/vv/"
    }   
    

    var login = function(voterName, sprintId){  
        
        var requestData = {
            voterName:voterName,
            sprintId:sprintId
        }

        $.ajax({
            type: "POST",
            url: END_POINTS.LOGIN_END_POINT,
            data: requestData, 
            success: function (data) {      
                if(data && data.response && !data.isError){
                    var redirectUrl = END_POINTS.VOTER_VOTE_END_POINT + data.response.sprintId + '/' + data.response._id;
                    document.location = redirectUrl;
                }
            }
        }); 
    };

    return {
        login:login
    }


})();


$(document).ready(function () {
    
    
    $('#loginButton').click(function(){
        var voterName = $('#name').val();
        var sprintId = $('#sprintId').val();

        if (window.validatorNod.getStatus('#name') !== nod.constants.INVALID && window.validatorNod.getStatus('#name') !== nod.constants.UNCHECKED) {
            VoterLoginApp.login(voterName, sprintId);
        }else{
            toastr.error('Name is Invalid');
        }
        
    })
})
