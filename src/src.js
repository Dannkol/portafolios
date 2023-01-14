const mainHtml = document.getElementById('mainMd')
const menu = document.getElementById('menu')
const menu_movil_button = document.getElementById('menu_movil_button')

let act = 1

let converter = new showdown.Converter()



fetch('asset/sobremi.md')
    .then(res => res.ok ? res.text() : Promise.reject(res))
    .then(res => {
        text      = res,
        html      = converter.makeHtml(text);
        mainHtml.innerHTML = html
    })



function borrar(){
    return mainHtml.innerHTML = ''
}

function cargando(){
    return mainHtml.innerHTML = '<h1>cargando...</h1>'
}


function screen(name){
    borrar()
    cargando()

    fetch('asset/'+name+'.md')
    .then(res => res.ok ? res.text() : Promise.reject(res))
    .then(res => {
        text      = res,
        html      = converter.makeHtml(text);
        mainHtml.innerHTML = html
    })

}

function menu_movil(){

    switch (act){

        case 1:
            menu.style.display = "flex";
            menu_movil_button.innerHTML = '✖️'
            act++;
            break;
        case 2:
            menu.style.display = "none";
            menu_movil_button.innerHTML = '⬅️'
            act--
            break
        default:
            act == 0
            break;
    }   



}
