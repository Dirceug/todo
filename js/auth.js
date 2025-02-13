//Traduz para portuguêsBR a autenticação do Firebase
firebase.auth().languageCode = "pt-BR"

//Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user){
    hideItem(loading)
    if(user){
        showUserContent(user)
    } else {
        showAuth()
    }
})

//Função que trata a submição do formulário de autenticação
authForm.onsubmit = function (event){
    showItem(loading)
    event.preventDefault()
        if(authForm.submitAuthForm.innerHTML == "Acessar"){
            firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
                console.log("Falha no acesso")
                console.log(error)
                hideItem(loading)
            })
        }else {
            firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
                console.log("Falha no cadastro")
                console.log(error)
                hideItem(loading)
            })
        }
}

//função que permite ao usuário sair da conta dele
function signOut(){
    firebase.auth().signOut().catch(function(error){
        console.log("Falha ao sair da conta")
        console.log(error)
    })
}

//função que permite o usuário fazer a verificação do e-mail dele
function sendEmailVerification(){
    showItem(loading)
    var user = firebase.auth().currentUser
    user.sendEmailVerification(actionCodeSettings).then(function (){
        alert("E-mail de verificação foi enviado para: " + user.email + "! Verifique a sua caixa de entrada,")
    }).catch(function(error){
        alert("Houve um erro ao enviar o e-mail de verificação")
        console.log(error)
    }).finally(function (){
        hideItem(loading)
    })
}

//função que permite o usuário redefinir a senha dele
function sendPasswordResetEmail(){
    var email = prompt("Redefinir senha! Informe o seu endereço de e-mail.", authForm.email.value)
    if(email){
        showItem(loading)
        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function(){
            alert("E-mail de redefinição de senha foi enviado para: " + email + "!")
        }).catch(function (error){
            alert("Houve um erro ao enviar e-mail de redefinição de senha!")
            console.log(error)
        }).finally(function(){
            hideItem(loading)
        }) 
    }else {
        alert("É pŕeciso preencher o campo de e-mail para redefinir a sneha")
    }
}

//Função que permite a autenticação pelo Google:
function signInWithGoogle(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error){
        alert("Houve um erro ao autenticar usando o Google")
        console.log(error)
        hideItem(loading)
    })
}

//Função que permite a autenticação pelo Github:
function signInWithGithub(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch(function (error){
        alert("Houve um erro ao autenticar usando o Github")
        console.log(error)
        hideItem(loading)
    })
}

//Função que permite a autenticação pelo Facebook:
function signInWithFacebook(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function (error){
        alert("Houve um erro ao autenticar usando o Facebook")
        console.log(error)
        hideItem(loading)
    })
}

//função que permite atulizar nomes de usuários
function updateUserName(){
    var newUserName = prompt("Informe um novo nome de usuário: ", userName.innerHTML)
    if(newUserName && newUserName != "") {
        var user = firebase.auth().currentUser
        userName.innerHTML = newUserName
        showItem(loading)
        firebase.auth().currentUser.updateProfile({
            displayName:newUserName
        }).catch(function(error){
            alert("Houve um erro ao alterar o nome do usuário")
            console.log(error)
            hideItem(loading)
        }).finally(function(){
            hideItem(loading)
        })
    } else {
        alert("O nome do usuário não pode ser em branco")
    }
}

//função que permite remover contas de usuário

function deleteUserAccount(){
    var confirmation = confirm("Realmente deseja excluir a sua conta?")
    if (confirmation){
        showItem(loading)
        //firebase.auth().currentUser.deleteUserAccount
        firebase.auth().currentUser.delete().then(function (){
            alert("Conta removida com sucesso")
        }).catch(function (error){
            alert("Houve um erro ao remover a sua conta!")
            console.log(error)
        }).finally(function (){
            hideItem(loading)
        })
    }
}

//firebase.auth().signOut().then(function (){alert("Usuário saiu")})

