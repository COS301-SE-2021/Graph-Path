function Validate_NewTask(body)
{
    let TaskBody = JSON.parse(body);
    isValid = {
        state: 1,
        message: "Input valid"
    };

    if(TaskBody['CreationDate'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Creation date";
        return isValid;
    }

    else if(TaskBody['DueDate'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Due date";
        return isValid;

    }

    else if(TaskBody['TaskName'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Task Name";
        return isValid;
    }

    else if(TaskBody['Description'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Description";
        return isValid;
    }

    else if(TaskBody['Label'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Label";
        return isValid;
    }

    else if(TaskBody['Status'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Status";
        return isValid;
    }

    else if(TaskBody['Assignee'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Assignee";
        return isValid;
    }

    else if(TaskBody['Assigner'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid assigner";
        return isValid;
    }

    else if(TaskBody['Parent_Node'] == '')
    {
        isValid.state = -1;
        isValid.message = "Invalid Creation date";
        return isValid;
    }

    return isValid;
}
