var temoin_1 = false;

$("#Panel_2").click(function() {
   if (temoin_1){
    $("#Add_tasks_input").replaceWith('  <div class="Add_tasks" onclick="makeInput()"> <p>+  Add a task</p></div> ');
  
    
    temoin_1 = false;
   }



});



function check_() {
   
    
}

 



function makeInput() {
    $( "div.Add_tasks" ).replaceWith( "<input id='Add_tasks_input' onkeydown='search(this)' ></input>" );
    $("input#Add_tasks_input").select();
    $(document).click(function() {
    temoin_1=true;
    })  

    //let e = document.getElementById("Add_tasks");
    //e.style = "display: none";
    //e.innerHTML = '<input value="'+e.innerText+'">';
}

function search(ele) {
    if(event.key === 'Enter') {
        alert(ele.value); 
        create_task(ele.value); 

        const boxes = document.querySelectorAll('.task');

        boxes.forEach(box => {
            box.remove(); 
        });
        
        diplay_to_do();
        
    
    }
}


function return_panel(){



var online_section= document.getElementById("online_section_header");
var contain_3_participant = document.getElementById("contain_3_participant");
var contain_3 =document.getElementById("contain_3");
contain_3_participant.style="display: none";
online_section.style="display: none";
contain_3.style="display: grid";

const boxes = document.querySelectorAll('.participant');

boxes.forEach(box => {
    box.remove();
});

/*let team_btn =document.querySelectorAll(".t1");
for (let i=0; i < team_btn.length ; i++){
    team_btn[i].addEventListener("click",function(){

        alert("ooo");
    })
} */


}



function select_team(){




}


function getduration(start,end){
    //alert("asss");
    //tablestart=start.split();
   

    h = start[0];
    if(start[1]!=":"){
        h += start[1];
        hi=parseInt(h);
        mni = parseInt( start[3] + start[4]);
        seci =parseInt( start[6] + start[7]);

    } else{
        mni = parseInt( start[2] + start[3]);
        seci = parseInt( start[5] + start[6] );
        
    }
    //alert(hi);
    //alert(mni);
    //alert(seci);



    h = end[0];
    if(end[1]!=":"){
        h += end[1];
        hf = parseInt(h);
        mnf = parseInt (end[3] + end[4]);
        secf = parseInt (end[6] + end[7]);

    } else{
        mnf = parseInt (end[2] + end[3]);
        secf = parseInt (end[5] + end[6]);
        
    }
  let diff= (hf * 3600 + mnf * 60 + secf ) - (hi * 3600 + mni * 60  + seci );
  return diff;
     
}



