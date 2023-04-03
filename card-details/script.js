const form = document.querySelector('form');
const cardInput = document.getElementById('fname');
const cardHolder = document.getElementById('cardname');
const cardInfo = document.getElementById('card-info');
const cardNumber = document.getElementById('cnumber');
const firsCard = document.getElementById('first-card');



eventListener();
function eventListener(){
    form.addEventListener('submit',addCard);
    
}

function addCard(e){
    const newCardInfo = cardInput.value.trim();
    const newCardNumber = cardNumber.value.trim();
    addCardToUI(newCardInfo,cardNumber);


    e.preventDefault();
}

function addCardToUI(newCardInfo,newCardNumber){
    const listItem = document.createElement("span");
    listItem.className = "name card-item";
    listItem.className = "date card-item";

    
    listItem.appendChild(document.createTextNode(newCardInfo,newCardNumber));

    firsCard.appendChild(listItem);

}

