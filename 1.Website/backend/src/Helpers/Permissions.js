
function getPermissions(role)
{

    switch(role)
    {
        case "developer":
            var Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;
        case "scrum-master":
            var Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;

        case "Project Manager":
            var Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;

        case "Business analyst":
            var Permissions = [
                'edit',
                'view'
            ];
            return Permissions
            break;


        case "owner":
            var Permissions = [
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
        'scrum-master',
        'developer',
        'Tester',
        'Business analyst',
        'Tech Lead',
        'QA engineer',
    ]

    return Roles;
}

function getAllRolesAndPermissions()
{
    let Roles = getAllRoles();
    let RolesAndPerms = {};
    for (let i = 0; i < Roles.length ; i++) {
        RolesAndPerms.Roles[i] = getPermissions(Roles[i]);

    }
    return RolesAndPerms;
}



module.exports = {
    getPermissions,
    getAllRoles,
    getAllRolesAndPermissions
}
