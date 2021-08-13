
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
                'edit',
                'view',
                'create-graph'
            ];
            return Permissions
            break;




    }


}


module.exports = {
    getPermissions,
}
