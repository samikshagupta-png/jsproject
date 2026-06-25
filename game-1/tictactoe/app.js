let boxes=document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let turn0 = true; 
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msgcontainer");
let msg=document.querySelector("#msg");
const winpatterns = [
    
  [0,1,2],
   [3,4,5],
    [6,7,8], 
  [0,3,6], 
  [1,4,7], 
  [2,5,8], 
  [0,4,8],
   [2,4,6]          


];
const resetgame =() =>{
    turn0=true;
    enableboxes();
    msgcontainer.classList.add("hide");


}

boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
       
        if (turn0){
            box.innerText ="0";
            turn0=false;
        }else{
            box.innerText="x";
            
            turn0=true;
        }
        box.disabled=true;
        checkwinner();
    });
});

const disableboxes = () => {
    for (let box of boxes)
        box.disabled=true;
    
};
const enableboxes = () => {
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const showwinner =(winner) => {
    msg.innerText=`congratulation,winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for(patterns of winpatterns){
        let pos1val=boxes[patterns[0]].innerText;
        let pos2val=boxes[patterns[1]].innerText;
        let pos3val=boxes[patterns[2]].innerText;
        if (pos1val !="" && pos2val !="" && pos3val !=""){
            if (pos1val=== pos2val && pos2val === pos3val){
                

                showwinner(pos1val);
            }
        }

    }
};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
