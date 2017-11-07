window.validatorNod = nod();



window.validatorNod.add([
{
    selector: '#name',
    validate: 'min-length:1',
    errorMessage: 'Name Reqiured'
},
{
    selector: '#numberOfVoters',
    validate: 'integer',
    errorMessage: 'Number Of Voters Reqiured'
},
{
    selector: '#issues',
    validate: 'min-length:1',
    errorMessage: 'Issues Reqiured'
}
]);