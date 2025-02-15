//trata a submissão do formulário de Tarefas
todoForm.onsubmit = function (event){
 event.preventDefault()//Evita o redirecionamento da página
 if(todoForm.name.value != ""){
    var data = {
        name: todoForm.name.value
    }
    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function(){
        console.log("Tarefa '" + data.name + "' adicionada com sucesso")
    }).catch(function(error){
        showError("Falha ao adicionar tarefa: ", error )
    })
    todoForm.name.value = ""
 } else {
    alert("O nome da tarefa não pode estar vazio")
 }
}

//Exibe a lista de tarefas do usuário
function fillTodoList(dataSnapshot){
    ulTodoList.innerHTML = ""
    var num = dataSnapshot.numChildren()
    todoCount.innerHTML = num + (num > 1? " tarefas": " tareta") + ": "////Exibe na interface o número de tarefas
    dataSnapshot.forEach(function (item){
        var value = item.val()
        var li = document.createElement('li')//Cria um elemento do tipo LI
        var spanLi = document.createElement('span')//Cria um elemento do tipo Span
        spanLi.appendChild(document.createTextNode(value.name))//Adiciona um elemento de texto dentro da Span (nome da tarefa)
        spanLi.id = item.key //Define o id do spanLi como a chave da tarefa
        li.appendChild(spanLi)//Adiciona o span ao LI
        
        var liRemoveBtn = document.createElement('button')//cria o botão para a atualização da tarefa
        liRemoveBtn.appendChild(document.createTextNode("Excluir"))//Define o texto do botão como 'excluir'
        liRemoveBtn.setAttribute('onclick', "removeTodo('" + item.key + "')")//Configura o onclick do botão de remoção de tarefas
        liRemoveBtn.setAttribute("class", "danger todoBtn")//define classes de estilização para o nosso botão de remoção
        li.appendChild(liRemoveBtn) //Adiciona o botão de remoção no Li
        
        var liUpdateBtn = document.createElement('button')//cria o botão para a remoção da tarefa
        liUpdateBtn.appendChild(document.createTextNode("Editar"))//Define o texto do botão como 'editar'
        liUpdateBtn.setAttribute('onclick', "updateTodo('" + item.key + "')")//Configura o onclick do botão de atualização de tarefas
        liUpdateBtn.setAttribute("class", "alternative todoBtn")//define classes de estilização para o nosso botão de edição
        li.appendChild(liUpdateBtn) //Adiciona o botão de remoção no LiUpdateulTodoList.appendChild(li)//Adiciona o LI dentro da lista de tarefas

        ulTodoList.appendChild(li)//Adiciona a li dentro d alista de tarefas
    })
}

//Remove tarefas
function removeTodo(key){
    var selectedItem = document.getElementById(key)
    var confirmation = confirm("Realmente deseja remover a tarefa '" + selectedItem.innerHTML + "'?")
    if(confirmation){
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().then(function () {
            console.log("Tarefa '" + selectedItem.innerHTML + "' removida com sucesso")
        }).catch(function (error){
            showError("Fala ao remover a fatefa", error)
        })
    } else {

    }
}

//Atualiza tarefas
function updateTodo(key){
    var selectedItem = document.getElementById(key)
    var newTodoName = prompt("Escolha um novo nome para a tarefa '" + selectedItem.innerHTML+ "'.", selectedItem.innerHTML)
    if(newTodoName != ""){
        var data = {
            name: newTodoName
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(function () {
            console.log("Tarefa '" + data.name + "' alterada com sucesso")
        }).catch(function (error){
            showError("Fala ao atualizar a fatefa", error)
        })
    } else {
        alert("O nome da tarefa não pode ser em branco para atualizr a tarefa!")
    }
}