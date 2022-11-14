const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(element => {
    criaElemento(element);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];
    const existe = itens.find( element => element.nome === nome.value)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        atualizaItem(itemAtual);
        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);    
    
    }

    console.log(existe);
    
    localStorage.setItem("itens", JSON.stringify(itens));    
    
    nome.value = '';
    quantidade.value = '';
})

function criaElemento (itemAtual) {

        const novoItem = document.createElement('li');
        novoItem.classList.add('item');

        const numeroItem = document.createElement('strong');
        numeroItem.innerHTML = itemAtual.quantidade;
        numeroItem.dataset.id = itemAtual.id;

        novoItem.appendChild(numeroItem);
        novoItem.innerHTML += itemAtual.nome;

        novoItem.appendChild(botaoDeleta(itemAtual.id));
        
        lista.appendChild(novoItem);         
}

function atualizaItem (item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');

    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function() {
        removeItem(this.parentNode, id);    

    })

    return elementoBotao;
}

function removeItem (item, id) {
    item.remove()

    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));    
}

//e.target.elements captura objeto especificado pelo atributo 'name' no input.

//localstorage apenas registra string, então o objeto deve ser transformado usando JSON.stringfy.