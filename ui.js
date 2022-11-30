
async function displayUI() {    
    await signIn();
    
    const user = await getUser();
    var userName = document.getElementById('name');
    userName.innerText = user.displayName;  
    var userMail = document.getElementById('id_');
    userMail.innerText = user.mail; 
    
    // Hide login button and initial UI
    var signInButton = document.getElementById('sign_in_panel');
    signInButton.style = "display: none";
    
    var supported_containt = document.getElementById('supported_container');
    supported_containt.style = "display: none";
    var main = document.getElementById('DisplayUI');
    main.style = "display: grid";
    displayProfilePhoto();
    displayEvents();
    display_Teams();
    diplay_to_do();
    
    //alert(getduration("12:03:00","12:07:00"));

    //Display_all_Team_members("5495ac5a-42f3-4b65-bb50-744b4b604d79");
    
    

    
    

}



async function displayProfilePhoto() {
    const userPhoto = await getUserPhoto();
    if (!userPhoto) {
        return;
    }
  
    //convert blob to a local URL
    const urlObject = URL.createObjectURL(userPhoto);
    // show user photo
    const userPhotoElement = document.getElementById('profile_img');
    userPhotoElement.src = urlObject;
    var imgPhoto= document.getElementById('profile_img');
    imgPhoto.style="border: 4px solid rgba(255, 255, 255, 0.536)";
    
}







async function display_event_containt(event,start_param,dur_param,loc,id){
    var add_to = document.getElementById('contain_2');
    let upcoming_event = document.createElement("div");
    let label=document.createElement("div");
    
    let image = document.createElement("img");
    const userPhoto = await getUsersPhoto(id);
    if (!userPhoto) {
      image.src="images/default_profile.jpg";
      image.className="meet_1";
     
    }
    else{
      //convert blob to a local URL
      const urlObject = URL.createObjectURL(userPhoto);
      // show user photo
      const userPhotoElement = image;
      userPhotoElement.className="meet_1";

      //const userPhotoElement = document.getElementById('profile_img');
      userPhotoElement.src = urlObject;
      //var imgPhoto= document.getElementById('profile_img');

    }
    

  


    let meet_1_contain=document.createElement("div");
    let event_desc = document.createElement("div");
    let event_name = document.createElement("p");
    let event_type = document.createElement("p");
    let start=document.createElement("p");
    let start_data=document.createElement("p");
    let duration=document.createElement("p");
    let duration_data=document.createElement("p");
    let location=document.createElement("p");
    let location_data=document.createElement("p");
    let more_members = document.createElement("div");


    
    label.className="meeting_label";
    upcoming_event.className="upcoming_meeting";
    //image.className="meet_1";
    meet_1_contain.className="meet_1_contain";
    event_desc.className="event_description";
    event_name.className="event_name";
    event_type.className="event_type";
    start.className="start_metric";
    start_data.className="start_data";
    duration_data.className="Duration_data";
    duration.className="Duration_metric";
    location.className="channel_metric";

    
    //image.src="images/default_profile.jpg";
    event_name.innerHTML=event;
    event_type.innerHTML="Meeting";
    start.innerHTML="Start :";
    start_data.innerHTML=start_param;
    duration.innerHTML="End :";
    
    duration_data.innerHTML=dur_param;
    location.innerHTML="Location :"
    location_data.innerHTML=loc;

    more_members.className="more_members";
    
    add_to.appendChild(upcoming_event);
    upcoming_event.appendChild(label);
    upcoming_event.appendChild(image);
    upcoming_event.appendChild(meet_1_contain);

    meet_1_contain.appendChild(event_name);
    meet_1_contain.appendChild(event_type);
    meet_1_contain.appendChild(event_desc);
    event_desc.appendChild(start);
    event_desc.appendChild(start_data);

    event_desc.appendChild(duration);
    event_desc.appendChild(duration_data);

    event_desc.appendChild(location);
    event_desc.appendChild(location_data);
   // meet_1_contain.appendChild(more_members);


        

}

async function displayEvents() {
  var events = await getEvents();
  if (!events || events.value.length < 1) {
    var content = document.getElementById('contain_2');
    var noItemsMessage = document.createElement('p');
    noItemsMessage.innerHTML = `No events for the coming week!`;
    content.appendChild(noItemsMessage)

  } else {
   
    events.value.forEach(event => {
      
      
      
      let pattern=/[0-9]+:[0-9][0-9]:[0-9][0-9] \w\w/i;
      
      if(!event.isOnlineMeeting){
          
        display_event_task( event.subject,new Date(event.start.dateTime).toLocaleString().match(pattern),new Date(event.end.dateTime).toLocaleString().match(pattern),"");

      }else if(event.attendees.length > 2 ){ 
       
        email=[];
        for (let i = 0; i < event.attendees.length; i++) {
          email.push(event.attendees[i].emailAddress.address);
          
        }
        
        
        display_more_members(event.subject,new Date(event.start.dateTime).toLocaleString().match(pattern),new Date(event.end.dateTime).toLocaleString().match(pattern),event.location.displayName,email);
          
         // display_event_containt(event.subject,new Date(event.start.dateTime).toLocaleString().match(pattern),"",event.location.displayName,email);

    
       

      } else{

        s1=new Date(event.start.dateTime).toLocaleString().match(pattern)
        display_event_containt(event.subject,new Date(event.start.dateTime).toLocaleString().match(pattern),new Date(event.end.dateTime).toLocaleString().match(pattern),event.location.displayName,event.attendees[0].emailAddress.address);
       // alert(s1);

      }
      
      
     

      
      
     
       
      
      
    });
  }
  
}



async function display_Teams_containt(name,id){


  //alert(id);
  //let container=document.createElement("div");
  var container = document.getElementById('contain_3');
  let team_1=document.createElement("div");
  let image =document.createElement("img");
  let team_name_box=document.createElement("div");
  let team_name=document.createElement("p");

  team_1.className="t1";
  team_name_box.className="team_name_box";
  team_name.className="team_name";

  team_name.innerHTML=name;
  //image.className="Team_photo";

  const userPhoto = await getTeamPhoto(id);
    if (!userPhoto) {
      image.src="images/default_profile.jpg";
      image.className="Team_photo";
     
    }
    else{
      //convert blob to a local URL
      const urlObject = URL.createObjectURL(userPhoto);
      // show user photo
     
      
      const userPhotoElement = image;
      userPhotoElement.className="Team_photo";

      //const userPhotoElement = document.getElementById('profile_img');
      userPhotoElement.src = urlObject;
      //var imgPhoto= document.getElementById('profile_img');

    }

    
    
   container.appendChild(team_1);
   team_1.appendChild(image);
   team_1.appendChild(team_name_box);
   team_name_box.appendChild(team_name);

  
   team_1.addEventListener("click",function(){
    
      //alert(id);
      Display_all_Team_members(id);

    })



}


async function display_Teams(){

  var Teams = await getTeam();
  if (!Teams || Teams.value.length < 1) {
    var content = document.getElementById('contain_3');
    var noItemsMessage = document.createElement('p');
    noItemsMessage.innerHTML = `You are not registered in any teams`;
    //content.appendChild(noItemsMessage)

  } else {
   
    Teams.value.forEach(team => {
      //let e = team.id;
      //id_teams=team.id
      //alert(team.id);
      display_Teams_containt(team.displayName,team.id);
      //let pattern= /[0-9]+:[0-9][0-9]:[0-9][0-9] \w\w/i;
      //display_event_containt(event.subject,new Date(event.start.dateTime).toLocaleString().match(pattern),"",event.location.displayName,email);
      
    });
  }

  /*let team_btn =document.querySelectorAll(".t1");
    for (let i=0; i < team_btn.length ; i++){
        team_btn[i].addEventListener("click",function(){
    
            alert("ooo");
        })
    }
    */


}



async function display_Team_member(id,name){
  let container = document.getElementById('contain_3_participant');
  container.style="display: grid";
  let participant=document.createElement("div");
  let image =document.createElement("img");
  let statut_dot=document.createElement("div")
  let participant_name_box=document.createElement("div");
  let participant_name=document.createElement("p");

  participant.className="participant"
  const userPhoto = await getUsersPhoto(id);
    if (!userPhoto) {
      image.src="images/default_profile.jpg";
      image.className="participant_image";
     
    }
    else{
      //convert blob to a local URL
      const urlObject = URL.createObjectURL(userPhoto);
      // show user photo
     
      
      const userPhotoElement = image;
      userPhotoElement.className="participant_image";
      //userPhotoElement.classList.add("participant_image");
      //const userPhotoElement = document.getElementById('profile_img');
      userPhotoElement.src = urlObject;
      //var imgPhoto= document.getElementById('profile_img');

    }


    statut_dot.className="dot";
    participant_name_box.className="participant_name_box";
    participant_name.className="participant_name";

    participant_name.innerHTML=name;



    container.appendChild(participant);
    participant.appendChild(image);
    participant.appendChild(statut_dot);
    participant.appendChild(participant_name_box);
    participant_name_box.appendChild(participant_name);
  

}


async function Display_all_Team_members(id){
 // display team members from particular team 
  let contain_3 =document.getElementById("contain_3");
  let header = document.getElementById("online_section_header");
  contain_3.style="display: none"; 
  header.style="display:flex";

  var Team_member = await getTeam_member(id);
  if (!Team_member || Team_member.value.length < 1) {
      var content = document.getElementById('contain_3_participant');
      var noItemsMessage = document.createElement('p');
      noItemsMessage.innerHTML = `There are no registered members in this group`;
  } else {
     
      Team_member.value.forEach(Team_member_unit=> {
        //alert(Team_member_unit.displayName);
          (async()=>{
            //alert(await set_user_Presence(Team_member_unit.id));
            if(await set_user_Presence(Team_member_unit.id)){
                //alert(Team_member_unit.displayName);
                display_Team_member(Team_member_unit.id,Team_member_unit.displayName);
              }
            
          })()

        
        
      });
        
        
    }
  
  
  
  }


  async function set_user_Presence(id){
    var Team_member = await getUser_presence(id);
    //alert(Team_member.availability);
    
    if (Team_member.availability=="Offline"){
      return false;  
    }else{

      return true;
    
    };  


  }


  // To do event  

async function diplay_to_do(){

  var To_Do = await getTo_do();
  //alert("oo");

  if (!To_Do || To_Do.value.length < 1) {
    var content = document.getElementById('to_do_board');
    var noItemsMessage = document.createElement('p');
    noItemsMessage.innerHTML = `There are no registered members in this group`;
  } else {
   
    To_Do.value.forEach(To_Do_unit=> {
      //alert(Team_member_unit.displayName);
      //alert(To_Do_unit.id);
        
      if (To_Do_unit.displayName =="Tasks") {
          //alert(To_Do_unit.id);
          display_to_do_tasks(To_Do_unit.id);
        
        
        }
          
          
    });
  }


}


  async function display_to_do_tasks(id){

    var Tasks = await getTo_do_tasks(id);
    //alert('00');

    if (!Tasks || Tasks.value.length < 1) {
      var content = document.getElementById('to_do_board');
      var noItemsMessage = document.createElement('p');
      noItemsMessage.innerHTML = `There are no registered members in this group`;
    } else {
     
      Tasks.value.forEach(Task=> {
        Display_task(Task.title,"Tasks",id,Task.id);
             
        
      });
        
        
    }
    


  }

  var tem = 1;

  function Display_task(title,todo_class_parameter,id,task_id){

  let container = document.getElementById('to_do_board');
  let task = document.createElement("div");
  let circle_state = document.createElement("div");
  let todo_section = document.createElement("div");
  let to_do_tasks = document.createElement("p");
  let to_do_class = document.createElement("p");
  let check = document.createElement("img");


  task.className="task";
  circle_state.className="circle_state";
  check.className="check";
 
 
  todo_section.className="to-do_section";
  to_do_tasks.className="to_do_tasks";
  to_do_class.className="to_do_class";
  to_do_tasks.innerHTML=title;
  to_do_class.innerHTML=todo_class_parameter;
    
  check.src="images/chek.png";
  check.style="display:none";

  

  container.appendChild(task);
  task.appendChild(circle_state);
  circle_state.appendChild(check);
  task.appendChild(todo_section);
  todo_section.appendChild(to_do_tasks);
  todo_section.appendChild(to_do_class);
    
  circle_state.addEventListener("click",function(){
    if(tem == 1){
      circle_state.style="background-color:green";
      tem=0;
      completed_task(id,task_id);

    }else{
      circle_state.style="background-color: rgba(255, 255, 255, 0)";
      tem = 1;
      uncompleted_task(id,task_id);

    }

    
    
    

    //alert(id);
    //Display_all_Team_members(id);

  })



}



async function display_more_members(event,start_param,dur_param,loc,id){
  
  var add_to = document.getElementById('contain_2');
  let upcoming_event = document.createElement("div");
  let label=document.createElement("div");
  let image = document.createElement("img");

  


  const userPhoto = await  getUsersPhoto(id[0]);
  if (!userPhoto) {
    image.src="images/default_profile.jpg";
    image.className="meet_1";
   
  }
  else{
    //convert blob to a local URL
    const urlObject = URL.createObjectURL(userPhoto);
    // show user photo
    const userPhotoElement = image;
    userPhotoElement.className="meet_1";

    //const userPhotoElement = document.getElementById('profile_img');
    userPhotoElement.src = urlObject;
    //var imgPhoto= document.getElementById('profile_img');

  }
  

  let meet_1_contain=document.createElement("div");
  let event_desc = document.createElement("div");
  let event_name = document.createElement("p");
  let event_type = document.createElement("p");
  let start=document.createElement("p");
  let start_data=document.createElement("p");
  let duration=document.createElement("p");
  let duration_data=document.createElement("p");
  let location=document.createElement("p");
  let location_data=document.createElement("p");
  let more_memb = document.createElement("div");



  
  label.className="meeting_label";
  upcoming_event.className="upcoming_meeting";
  //image.className="meet_1";
  meet_1_contain.className="meet_1_contain";
  event_desc.className="event_description";
  event_name.className="event_name";
  event_type.className="event_type";
  start.className="start_metric";
  start_data.className="start_data";
  
  duration.className = "Duration_metric";
  duration_data.className = "Duration_data";
  location.className = "channel_metric";
  more_memb.className="more_members";

  
  //image.src="images/default_profile.jpg";
  event_name.innerHTML=event;
  start.innerHTML="Start :";
  start_data.innerHTML=start_param;
  duration.innerHTML="Duration :";
  
  duration_data.innerHTML=dur_param;
  location.innerHTML="Location :"
  location_data.innerHTML=loc;
  event_type.innerHTML="Group Meeting";

  
  


  add_to.appendChild(upcoming_event);
  upcoming_event.appendChild(label);
  upcoming_event.appendChild(image);
  upcoming_event.appendChild(meet_1_contain);

  meet_1_contain.appendChild(event_name);
  meet_1_contain.appendChild(event_type);
  meet_1_contain.appendChild(event_desc);
  meet_1_contain.appendChild(more_memb);


  event_desc.appendChild(start);
  event_desc.appendChild(start_data);

  event_desc.appendChild(duration);
  event_desc.appendChild(duration_data);

  event_desc.appendChild(location);
  event_desc.appendChild(location_data);

  
  for (let i = 1; i < id.length; i++){
    let images = document.createElement("img");
    const userPhoto = await getUsersPhoto(id[i]);
    if (!userPhoto) {
      images.src="images/default_profile.jpg";
      images.className="more_mem_img";
     
    }
    else{
      //convert blob to a local URL
      const urlObject = URL.createObjectURL(userPhoto);
      // show user photo
      const userPhotoElement = images;
      userPhotoElement.className="more_mem_img";
  
      
      userPhotoElement.src = urlObject;
      more_memb.appendChild(images);
      
  
    }
    

    
   
  }

  



 
  


}


function display_event_task(event,start_param,dur_param,loc){


  var add_to = document.getElementById('contain_2');
  let upcoming_event = document.createElement("div");
  let label=document.createElement("div");
  let icon_background = document.createElement("dic");
  let image = document.createElement("img");

  


  

  let meet_1_contain=document.createElement("div");
  let event_desc = document.createElement("div");
  let event_name = document.createElement("p");
  let event_type = document.createElement("p");
  let start = document.createElement("p");
  let start_data = document.createElement("p");
  let duration = document.createElement("p");
  let duration_data=document.createElement("p");
  let location = document.createElement("p");
  let location_data = document.createElement("p");
  let more_memb = document.createElement("div");



  icon_background.className="icon_background";
  label.className="meeting_label";
  label.style="background-color: #F2BA7C";
  upcoming_event.className="upcoming_meeting";
  meet_1_contain.className="meet_1_contain";
  event_desc.className="event_description";
  event_name.className="event_name";
  event_type.className="event_type";
  event_type.style="color: #FCDFB1";
  start.className="start_metric";
  start_data.className="start_data";
  
  duration.className = "Duration_metric";
  duration_data.className = "Duration_data";

  location.className = "channel_metric";


  
  image.src="images/file_icon.png";
  image.className="meet_2";

  event_name.innerHTML=event;
  start.innerHTML="Start :";
  start_data.innerHTML=start_param;
  duration.innerHTML="End :";
  
  duration_data.innerHTML=dur_param;
  location.innerHTML="Location :"
  location_data.innerHTML=loc;
  event_type.innerHTML="Task";

  
  


  add_to.appendChild(upcoming_event);
  upcoming_event.appendChild(label);
  upcoming_event.appendChild(icon_background);
  icon_background.appendChild(image);
  upcoming_event.appendChild(meet_1_contain);

  meet_1_contain.appendChild(event_name);

  meet_1_contain.appendChild(event_type);
  meet_1_contain.appendChild(event_desc);
 


  event_desc.appendChild(start);
  event_desc.appendChild(start_data);

  event_desc.appendChild(duration);
  event_desc.appendChild(duration_data);

  event_desc.appendChild(location);
  event_desc.appendChild(location_data);

  

    

    
   

  




}