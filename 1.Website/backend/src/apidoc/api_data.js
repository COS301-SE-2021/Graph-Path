define({ "api": [
  {
    "type": "post",
    "url": "/newGraph'",
    "title": "",
    "name": "create_a_graph_object",
    "description": "<p>This endpoint creates a graph object</p>",
    "group": "Graph",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "nodes",
            "description": "<p>'{id:&quot;&quot;, color:&quot;&quot;, label:&quot;&quot;,x:&quot;&quot;,y:&quot;&quot;}'</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "edges",
            "description": "<p>'{id:&quot;&quot;, color:&quot;&quot;, source:&quot;&quot;,target:&quot;&quot;}'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The graph created successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Graph.js",
    "groupTitle": "Graph"
  },
  {
    "type": "delete",
    "url": "/deleteGraphByProject'",
    "title": "",
    "name": "delete_a_graph_object",
    "description": "<p>This endpoint deletes a graph matching the passed in project ID</p>",
    "group": "Graph",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>project ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The graph deleted successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Graph.js",
    "groupTitle": "Graph"
  },
  {
    "type": "get",
    "url": "/getGraphByProject'",
    "title": "",
    "name": "get_a_graph_object",
    "description": "<p>This endpoint retrieves a graph matching the passed in project ID</p>",
    "group": "Graph",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>project ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The graph retrieved successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Graph.js",
    "groupTitle": "Graph"
  },
  {
    "type": "post",
    "url": "/task/newProject",
    "title": "",
    "name": "create_new_Project",
    "description": "<p>This endpoint creates a new Project</p>",
    "group": "Project",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "List",
            "optional": false,
            "field": "list",
            "description": "<p>of Project objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/task/listProjects",
    "title": "",
    "name": "list_of_Projects",
    "description": "<p>This endpoint returns a list of all Projects</p>",
    "group": "Project",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "List",
            "optional": false,
            "field": "list",
            "description": "<p>of Project objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/task/getAllProjectsByUserEmail/:email",
    "title": "",
    "name": "list_projects_owned_by_email",
    "description": "<p>This endpoint returns a list of all Projects belonging to the user mathing the passed in email</p>",
    "group": "Project",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "List",
            "optional": false,
            "field": "list",
            "description": "<p>of Project objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/task/getProjectByID/:id",
    "title": "",
    "name": "list_projects_owned_by_email",
    "description": "<p>This endpoint returns a list of all Projects belonging to the user mathing the passed in email</p>",
    "group": "Project",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "List",
            "optional": false,
            "field": "list",
            "description": "<p>of Project objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "delete",
    "url": "/task/deleteTaskByID/:id",
    "title": "",
    "name": "delete_task_by_ID",
    "description": "<p>This endpoint deletes a task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/task/getTasksByDescription",
    "title": "",
    "name": "get_All_tasks_by_Description",
    "description": "<p>This endpoint returns a list of task objects matching the given description</p>",
    "permission": [
      {
        "name": "authorised user"
      }
    ],
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "mixed",
            "description": "<p><code>User</code> object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/task/getTasksByProject",
    "title": "",
    "name": "get_All_tasks_by_Project_ID",
    "description": "<p>This endpoint returns a list of task objects matching the given project ID</p>",
    "permission": [
      {
        "name": "authorised user"
      }
    ],
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "list",
            "optional": false,
            "field": "list",
            "description": "<p>of task objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/task/getTaskByID/:id",
    "title": "",
    "name": "get_All_tasks_by_task_ID",
    "description": "<p>This endpoint returns a single task object matching the given task ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "mixed",
            "description": "<p>'task' object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "task/getAllTasks",
    "title": "",
    "name": "get_all_Tasks",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "group": "Task",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "an",
            "description": "<p>array of all the tasks in a project.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/task/insertTask",
    "title": "",
    "name": "insert_new_task",
    "description": "<p>This endpoint inserts a new task to the Project</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>'not started' ,'in progress', 'complete' , 'back-log'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "project",
            "description": "<p>projectID</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "assignee",
            "description": "<p>{email: &quot;user email address&quot;,role: &quot;user role}</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "assigner",
            "description": "<p>email of assigner</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "due",
            "description": "<p>due date of task</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "issued",
            "description": "<p>issued date of task</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "list",
            "optional": false,
            "field": "list",
            "description": "<p>of task objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/task/AllPermissions",
    "title": "",
    "name": "list_all_possbile_permissions",
    "description": "<p>This endpoint returns a list of all permissions that can be assigned to a role</p>",
    "group": "Task",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>of possible permissions</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Project.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateEverythingTask'",
    "title": "",
    "name": "update_all_details_of_a_task_object",
    "description": "<p>This endpoint updates all fields of the task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "Assignee",
            "description": "<p>'{email:&quot;&quot; , role:&quot;&quot;}'</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "Assigner",
            "description": "<p>'{email:&quot;&quot; , role:&quot;&quot;}'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>&quot;description&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "issued",
            "description": "<p>YYYY/MM/DD</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "due",
            "description": "<p>YYYY/MM/DD</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nodeID",
            "description": "<p>&quot;&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "stats",
            "description": "<p>'not started' ,'in progress', 'complete' , 'back-log'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "project",
            "description": "<p>project ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The task updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateTaskAssignee'",
    "title": "",
    "name": "update_task_Assignee",
    "description": "<p>This endpoint updates the assignee of the task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "Assignee",
            "description": "<p>'{email:&quot;&quot; , role:&quot;&quot;}'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The task updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateTaskAssigner'",
    "title": "",
    "name": "update_task_Assigner",
    "description": "<p>This endpoint updates the assigner of the task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "Assignee",
            "description": "<p>'{email:&quot;&quot; , role:&quot;&quot;}'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The task updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateTaskDescription'",
    "title": "",
    "name": "update_task_description",
    "description": "<p>This endpoint updates the description of the task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>&quot; &quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The task updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateTaskStatus'",
    "title": "",
    "name": "update_task_status",
    "description": "<p>This endpoint updates the status of the task matching the passed in ID</p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>task ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>'not started' ,'in progress', 'complete' , 'back-log'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The task updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/Task.js",
    "groupTitle": "Task"
  },
  {
    "type": "patch",
    "url": "/updateUserPassword'",
    "title": "",
    "name": "changes_password_of_a_user_object",
    "description": "<p>This endpoint updates the password field of the user matching the passed in email</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>''</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/updateUserUsernameAndPassword'",
    "title": "",
    "name": "changes_username_and_password_of_a_user_object",
    "description": "<p>This endpoint updates username and password fields of the user matching the passed in email</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>&quot;username&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>''</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/updateUserUsername'",
    "title": "",
    "name": "changes_username_of_a_user_object",
    "description": "<p>This endpoint updates username field of the user matching the passed in email</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>&quot;username&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/newUser'",
    "title": "",
    "name": "create_new_user_object",
    "description": "<p>This endpoint creates a user object</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>&quot;firstName&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>&quot;lastName&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>&quot;username&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notification",
            "description": "<p>&quot;Notification&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>&quot;type&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>''</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user created successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/listOfAllUsersExceptYourself'",
    "title": "",
    "name": "get_all_other_users",
    "description": "<p>This endpoint gets all other users a user object</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user created successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/getAllUsers'",
    "title": "",
    "name": "get_all_users",
    "description": "<p>This endpoint retrieves all user objects</p>",
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The users retrieved successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login'",
    "title": "",
    "name": "login_a_user",
    "description": "<p>This endpoint logs in a user object</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>''</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user logged in successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/deleteUserByID'",
    "title": "",
    "name": "removes_an_user_object_based_on_its_id",
    "description": "<p>This endpoint removes the user matching the passed in ID</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user removed successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/getUserById'",
    "title": "",
    "name": "retrieve_user_object",
    "description": "<p>This endpoint retrieves a user object based on ID</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>user ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user retrieved successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/updateEverythingUser'",
    "title": "",
    "name": "update_all_details_of_a_user_object",
    "description": "<p>This endpoint updates all fields of the user matching the passed in ID</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": "<p>&quot;firstName&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>&quot;lastName&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>&quot;username&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>&quot;email&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notification",
            "description": "<p>&quot;Notification&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>&quot;type&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>''</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>: &quot;The user updated successfully&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes/User.js",
    "groupTitle": "User"
  }
] });
