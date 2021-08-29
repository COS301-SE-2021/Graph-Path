
function getPermissions(role)
{

    let Permissions = null;
    switch(role)
    {
        case "developer":
             Permissions = [
                'edit',
                'view',
                'Save Graph changes'
            ];
            return Permissions
            break;
        case "scrum-master":
            Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;

        case "Project Manager":
             Permissions = [
                'edit',
                'view',
                 'add members'
            ];
            return Permissions
            break;

        case "Business analyst":
             Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;

        case "Tester":
            Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;


        case "Client":
            Permissions = [

                'view'
            ];
            return Permissions
            break;



        case "Owner":
             Permissions = [
                'Assign Manager',
                'Change Manager',
                'Assign user to task',
                'Remove  user from task',
                'Create Project',
                'View project Graph',
                'Attach due date tp task',
                'Change due date of Task',
                'Create task',
                'Edit task',
                'Remove task',
                'Create graph node',
                'Drag graph nodes',
                'Save Graph changes',
                'Change task status',
                'Edit Member permissions',
                'Create statistic report'
            ];
            return Permissions
            break;




    }


}


function getAllRoles()
{
    const Roles = [

        'Project Manager',
        'Client',
        'Owner',
        'Developer',
        'Business analyst',
        'Team Lead',
        'Viewer',
    ]

    return Roles;
}

function getAllRolesAndPermissions()
{
    let Roles = getAllRoles();
    let RolesAndPerms = {};
    for (let i = 0; i < Roles.length ; i++) {

        var role = Roles[i];
        RolesAndPerms[role] = getPermissions(Roles[i]);

    }


    return RolesAndPerms;
}



module.exports = {
    getPermissions,
    getAllRoles,
    getAllRolesAndPermissions
}
