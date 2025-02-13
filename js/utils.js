// Defindo referências para elementos da página
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')

var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')

var userEmail = document.getElementById('userEmail')

var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
var emailVerified = document.getElementById('emailVerified')

var passwordReset = document.getElementById('passwordReset')

var userImg = document.getElementById('userImg')
var userName = document.getElementById('userName')


// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(register)//esconder atalhao para registro
  hideItem(passwordReset)//Esconder opção de redefinição se senha
  showItem(access)//mostrar atalho para acesso
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(access)//esconder atalho para acesso
  showItem(register)//mostrar atalhao para acessar conta
  showItem(passwordReset)//mostrar opção de redefinição se senha
}

// Simpplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

// Simpplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

//Mostrar conteúdo para usuários autenticados
function showUserContent(user){
  console.log(user)
  if(user.providerData[0].providerId != 'password'){
    emailVerified.innerHTML = "Autenticação por provedor confiável, não é necessário verificar e-mail"
    hideItem(sendEmailVerificationDiv)
  } else {
    if(user.emailVerified){
      emailVerified.innerHTML = "E-mail verificado!"
      hideItem(sendEmailVerificationDiv)
    } else {
      emailVerified.innerHTML = "E-mail não verificado!"
      showItem(sendEmailVerificationDiv)
    }
  }
  userImg.src = user.photoURL? user.photoURL : "img/unknownUser.png"
  userName.innerHTML = user.displayName


  userEmail.innerHTML = user.email
  hideItem(auth)
  showItem(userContent)
}
//Mostrar conteúdo para usuários não autenticados
function showAuth(){
  authForm.email.value = ""
  authForm.password.value = ""
  hideItem(userContent)
  showItem(auth)
}

//Atributos extras de configuração de e-mail
var actionCodeSettings = {
  url: "http://127.0.0.1:5500/"
}