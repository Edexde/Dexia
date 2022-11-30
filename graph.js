// Create an authentication provider
const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    }
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
//Get user info from Graph
async function getUser() {
    ensureScope('user.read');
    return await graphClient
        .api('/me')
        .select('id,displayName,mail')
        .get();
}

async function getUserPhoto() {
    ensureScope('user.read');
     return await graphClient
         .api('/me/photo/$value')
         .get();
}

async function getUsersPhoto(id) {
    ensureScope('user.read.all');
    return await graphClient
         .api(`/users/${id}/photo/\$value`)
         .get();
}

async function getTeamPhoto(id) {
    ensureScope('user.read.all');
    ensureScope('Team.ReadBasic.All');
    return await graphClient
         .api(`/teams/${id}/photo/\$value`)
         .get();
}


async function getTeam() {
    ensureScope('Team.ReadBasic.All');
    ensureScope('user.read.all');
    //ensureScope('user.readwrite.all');
    
    return await graphClient
         .api('/me/joinedTeams')
         .select('id,displayName')
         .get();
}

async function getTeam_member(id) {
    ensureScope('Team.ReadBasic.All');
    ensureScope('user.read.all');
    //ensureScope('Group.ReadWrite.All');
    //ensureScope('user.readwrite.all');
    
    return await graphClient
         .api(`/groups/${id}/members`)
         .select('id,displayName')
         .get();
}





async function getEvents() {
    ensureScope('Calendars.read');
    ensureScope('User.Read.All');

    const dateNow = new Date();
    const dateNextWeek = new Date();
    const endOfDay = new Date();
    endOfDay.setUTCHours(28, 59, 59, 999);
    dateNextWeek.setDate(dateNextWeek.getDate() + 1);
    const query = `startDateTime=${dateNow.toISOString().slice(0,-1)}&endDateTime=${endOfDay.toISOString().slice(0,-1)}`;

    
    //const ptherQuery = `startDateTime=${dateNow.toISOString()}&endDateTime=${dateNextWeek.toISOString()}`;
    return await graphClient
    .api('/me/calendarView').query(query)
    .header('Prefer', 'outlook.timezone="Haiti Standard Time"')
    .select('subject,start,end,location,attendees,isOnlineMeeting')
    .orderby(`start/DateTime`)
    .get();
}

  



async function getUser_presence(id) {
    ensureScope('Presence.Read.All');
  
    //ensureScope('Group.ReadWrite.All');
    //ensureScope('user.readwrite.all');
    
    return await graphClient
         .api(`/users/${id}/presence`)
         .get();
}

 

// Graph call for To Do tasks

async function getTo_do() {
    ensureScope('Tasks.ReadWrite');
    //ensureScope('user.readwrite.all');
    
    return await graphClient
         .api('/me/todo/lists')
         
         .get();
}


async function  getTo_do_tasks(id) {
    ensureScope('Tasks.ReadWrite');
    //ensureScope('user.readwrite.all');
    
    return await graphClient
         .api(`/me/todo/lists/${id}/tasks`)
         //.select('id,title')
         .get();
}

async function create_task(tasks){
    ensureScope('Tasks.ReadWrite');
    //ensureScope('user.readwrite.all');
    
    const todoTask = {
        title: tasks,
        categories: ['Important'],
        linkedResources: [
           {
              webUrl: 'http://microsoft.com',
              applicationName: 'Microsoft',
              displayName: 'Microsoft'
           }
        ]
     };


    return await graphClient
         .api("/me/todo/lists/AAMkAGI1NmZmYzM1LWI3MmYtNDliYy1hNDQ3LTVhMTMzYmI1N2NiNwAuAAAAAABP5cn6S0koRrsXwUrS_NbOAQAfzBZps-PQTLzOh7s3yXfKAAAAAAESAAA=/tasks")
         .post(todoTask);
         //.select('id,title')
         //.get();    


}

     
async function  completed_task(id,id_){
    ensureScope('Tasks.ReadWrite');

    const task ={
     status: "completed"   
    };

    return await graphClient
         .api(`/me/todo/lists/${id}/tasks/${id_}`)
         //.select('id,title')
         
         .update(task);
  
    
}


async function  uncompleted_task(id,id_){
    ensureScope('Tasks.ReadWrite');

    const task ={
     status: "notStarted"   
    };

    return await graphClient
         .api(`/me/todo/lists/${id}/tasks/${id_}`)
         //.select('id,title')
         
         .update(task);
  
    
}