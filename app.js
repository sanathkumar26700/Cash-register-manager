const arrayNoteAmount = [2000, 500, 100, 20, 10, 5, 1];

const billAmount = document.querySelector("#billAmount");
const paidAmount = document.querySelector("#paidAmount");

const errorDiv = document.querySelector(".errorMsg");

const div__paidAmount = document.querySelector(".paidAmountInput");
const div__changeReturn = document.querySelector(".changeReturn");

const output= document.querySelector("#output");

const btnNext = document.querySelector("#btn--next");
const btnCheck = document.querySelector("#btn--check");

const noOfNotes= document.querySelectorAll(".noOfNotes");


const hideError =() => {
    errorDiv.style.display = "none";
}

const showError = (text) => {
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    div__changeReturn.style.display = "none";
}

const clearNoOfNotes = () =>{
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

btnNext.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmount.value)>0){

        btnNext.style.display = "none";
        div__paidAmount.style.display = "block";
    }
    else{
        showError("Enter valid bill amount");
    }
} )


btnCheck.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError();
    let billAmountValue= Number(billAmount.value);
    let paidAmountValue= Number(paidAmount.value);

    if(billAmountValue>0 && paidAmountValue>0){
        if(!Number.isInteger(paidAmountValue)){
            showError("Enter valid amount in cash given field");
            return;
        }
        if(billAmountValue > paidAmountValue){
            showError("Cash is less than bill, please enter right amount");
            return;
        }
        calculateNotes(billAmountValue, paidAmountValue);
    } else{
        showError("Enter valid bill amount and cash given to continue");
        }
})

const calculateNotes = (bill, cash) => {
    let returnAmount = cash-bill;
    
    if(returnAmount<1){
        showError("No amount should be returned");
        return;
    }
    div__changeReturn.style.display = "block";

    for(let i=0; i<arrayNoteAmount.length; i++){
        returnAmount= compare(returnAmount, arrayNoteAmount[i], i);
    }
    
}

const compare = (remainder, noteAmount, index) => {

    if(remainder >= noteAmount){
        let notes = Math.floor(remainder/noteAmount);
        remainder = remainder - notes*noteAmount;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}






