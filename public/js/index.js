const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged");

const session = localStorage.getItem("session");

checkLogged();

//Logar no sistema
document.querySelector("#login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;
    const checkSession = document.querySelector("#session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Oops! Verifique o usuário ou senha.");
        return;
    } else if(account) {
        if(account.password !== password){
            alert("Oops! Verifique o usuário ou senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }


});


//Criar conta
document.querySelector("#create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.querySelector("#email-create-input").value;
    const password = document.querySelector("#password-create-input").value;

    if(email.length < 5){
        alert("Preencha o campo com um email válido.");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    
    myModal.hide();

    alert("Conta criada com sucesso!")
})

function checkLogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }
    return "";
}

