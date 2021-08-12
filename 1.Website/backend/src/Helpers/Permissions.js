
function getPermissions(role)
{

    switch(role)
    {
        case "developer":
            let Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;
        case "scrum-master":
            break;
        case "Project manager":
            break;


    }


}

module.exports = {
    getPermissions,
}
