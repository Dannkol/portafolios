const mainHtml = document.getElementById('mainMd')
const head = document.getElementsByTagName('head')


var converter = new showdown.Converter()



fetch('asset/sobremi.md')
    .then(res => res.ok ? res.text() : Promise.reject(res))
    .then(res => {
        console.log(res)
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
        console.log(res)
        text      = res,
        html      = converter.makeHtml(text);
        mainHtml.innerHTML = html
    })

}

