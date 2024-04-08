
/* ===================== PRINCIPAIS OBJETOS  =================================*/
let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view"); //icone para fechar modal de edição de nota.

/* ===================== EVENTOS  =================================*/
addNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display ="none";
    notes.style.display = "none";
} );
btnCloseModal.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display ="block";
    notes.style.display = "flex";    
});
btnSaveNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    data = {
    id : document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value
    }
saveNote(data);
});

btnCloseNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display ="block";
    notes.style.display = "flex";  
    modalView.style.display = "none";
});
/* ===================== FUNÇÕES  =================================*/

const saveNote = (note) => {
    let notes = loadNotes();
    note.lastTime = new Date().getTime();
    if(note.id.trim().length < 1){ //para remover espaços (sujeiras) usa-se o trim().
        note.id = new Date().getTime();
        notes.push(note);
        document.querySelector('#input-id').value = note.id;
    }else{
        notes.forEach( (item, i) => {
            if(item.id == note.id){
                notes[i] = note;
            }
        });

    }

    
    notes = JSON.stringify(notes); //transformar objeto em texto novamente
    localStorage.setItem('notes', notes); //colocar o texto no local storage

    listNotes();
};

const loadNotes = () =>{
    let notes = localStorage.getItem('notes');
    if(!notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);} //uso do parse: transformação do notes em forma de string para objeto
  return notes;  
}

const listNotes = () =>{
    notes.innerHTML = '';
    let listNotes = loadNotes();
    listNotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'cardBody';
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em: "+dateFormat(note.lastTime);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);


        notes.appendChild(divCard);

        divCard.addEventListener("click", (evt)=>{
            evt.preventDefault();
       
            showNote(note);
        });
    });
}
const showNote = (note)=>{
    document.querySelector("#controls-note").innerHTML = "";
    notes.style.display = "none";
    console.log(modalView)
    modalView.style.display = "block";
    addNote.style.display ="none";
    document.querySelector('#title-note').innerHTML= "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
    <p>Ultima alteração: ${dateFormat(note.lastTime)}</p>`
    
    let divEdit = document.createElement("div");
    let iEdit = document.createElement("i");
    iEdit.className = 'bi bi-pencil';
    divEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(divEdit);
    divEdit.addEventListener("click", (evt)=>{
        evt.preventDefault();
        editNote(note);
    })
    let divRemove = document.createElement("div");
    let iRemove = document.createElement("iR");
    iRemove.className = 'bi bi-trash3';
    divRemove.appendChild(iRemove);
    document.querySelector("#controls-note").appendChild(divRemove);
};

const dateFormat = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toLocaleDateString("pt-BR");
    return date;
};

const editNote = (note) =>{
    document.querySelector("#input-id").value = note.id;
    document.querySelector("#input-title").value = note.title;
    document.querySelector("#input-content").value = note.content;
    modalView.style.display = "none";
    modal.style.display = "block";

}

listNotes();

