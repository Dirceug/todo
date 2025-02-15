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

var todoForm = document.getElementById('todoForm')
var todoCount = document.getElementById('todoCount')
var ulTodoList = document.getElementById('ulTodoList')
var search = document.getElementById('search')


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
  detDefaultTodoList()
  search.onkeyup = function (){
    if(search.value != ""){
      //Busca tarefas filtradas somente uma vez
      dbRefUsers.child(user.uid)
      //.orderByChild("name")//Ordena as tarefas pelo nome da tarefa
      //.startAt(search.value).endAt(search.value + "/uf8ff")//Delimita os resultados de pesquisa)
      .once('value')//busca as tarefas apenas uma vez
      .then(function (dataSnapshot){
        const filteredData = {}
        dataSnapshot.forEach(function(item) {
          const taskName = item.val().name.toLowerCase(); // Converter para minúsculas para comparação
          const searchValue = search.value.toLowerCase(); // Converter para minúsculas para comparação
          if (taskName.includes(searchValue)) {
            filteredData[item.key] = item.val();
          }
        });

        // Criar um novo dataSnapshot com os dados filtrados
        const filteredSnapshot = {
          val: () => filteredData,
          forEach: (callback) => Object.entries(filteredData).forEach(([key, value]) => callback({ key, val: () => value })),
          numChildren: () => Object.keys(filteredData).length
        };
        fillTodoList(filteredSnapshot)
      })
    }else {
      detDefaultTodoList()
    }
  }

  showItem(userContent)
}

//Busca tarefas em tempo real(listagem padrão) - usando o .on
function detDefaultTodoList (){
  dbRefUsers.child(firebase.auth().currentUser.uid)
  .orderByChild("name")//Ordena as tarefas pelo nome da tarefa
  .on('value', function (dataSnapshot){
    fillTodoList(dataSnapshot)
  })
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
  url: "https://todo-70f36.firebaseapp.com"
}

//Centralizar e traduzir erros
function showError(prefix, error){
  console.log(error.code)
  hideItem(loading)
  switch(error.code){
    case 'auth/invalid-email':
    case 'auth/wrong-password': alert (prefix + ` ` + "E-mail ou senha inválidos!")
    break;
    case 'auth/weak-password': alert (prefix + ` ` + "Você precisa de uma senha com pelo menos 6 caractes!")
    break;
    case 'auth/email-already-in-use': alert (prefix + ` ` + "Este usuário já está cadastrado!")
    break;
    case 'auth/wrong-password': alert (prefix + ` ` + "E-mail ou senha inválidos!")
    break;
    case 'auth/popup-closed-by-user': alert (prefix + ` ` + "O Pop-up de autenticação foi fechado antes da operaçãop ser concluída!")
    break;

    default: alert (prefix + ` ` + error.message)
  }
}

var database = firebase.database()
var dbRefUsers = database.ref('users')