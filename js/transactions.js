const myModal = new bootstrap.Modal("#transaction-modal");

let logged = sessionStorage.getItem("logged");

const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.querySelector("#button-logout").addEventListener("click", logout);

document.querySelector("#transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.querySelector("#value-input").value);
    const description = document.querySelector("#description-input").value;
    const date = document.querySelector("#date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions() 

    alert("Lançamento adicionado com sucesso.");

});


checkLogged();

function checkLogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTransactions(); 

}


function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) =>{
            let type = "Entrada";

            if(item.type === "2"){
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>R$ ${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                    <td><button type="button" class="delete-button"><ion-icon name="trash-outline"></ion-icon></button></td>
                </tr>
            `
        })
    }

    document.querySelector("#transactions-list").innerHTML = transactionsHtml;

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {

            let resposta = window.confirm("Você deseja excluir o item da lista?")
                if(resposta){
                    const index = this.getAttribute("data-index");
                    data.transactions.splice(index, 1);
                    saveData(data);
                    getTransactions();
                }
        });
    });
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
