const qs = target => {return document.querySelector(target);}
const sendToHTML = (value, target) => {
    const objetive = qs(target);
    return objetive.innerHTML = value;
};

//Introduce los datos de contacto de manera individual.
const injectHTML = (value, target,position) => {
    const objetive = qs(target);
    return objetive.insertAdjacentHTML(position, value);
};

//Plantilla de las secciones Principales.
const tInfo = (title,text,url) => {
    return typeof(url) !== 'string' ? `<div class="info"><h4>${title}</h4><p>${text}</p></div>` : `<div class="info"><h4>${title}</h4><p>${text}</p><a href="${url}" target="_blank" rel="noopener noreferrer">Ir al sitio</a></div>`;
};

//Introduce los datos a las 3 secciones del CV (Educación, Experiencia y Proyectos).
const putTitleText = (data,target) => {
    let ouput = '';    
    for(let i=0; i < data.length; i++) {
        let key = Object.keys(data[i])[0];
        let obj = data[i][key];
        if (typeof(obj) === 'object') {
            for(let i=0; i < obj.length; i++) {
                if(typeof(obj[i].url) == 'string') {ouput += tInfo(key,obj[i+1].resumen,obj[i].url)}
            }
        } else {
            ouput += tInfo(key,obj);
        }
    }    
    injectHTML(ouput,target,'afterend');
}

//elementos a completar.
const nombre            = 'header .name';
const titulo            = 'header .title span';
const resumen           = '.about--us';
const sitioWeb          = '.personal--data li:first-of-type a img';
const hrefWeb            = '.personal--data li:first-of-type a';
const domicilio         = '.personal--data li:nth-of-type(2) a img';
const hrefDomicilio     = '.personal--data li:nth-of-type(2) a';
const telefono          = '.personal--data li:nth-of-type(3) a img';
const hrefTelefono      = '.personal--data li:nth-of-type(3) a';
const correo            = '.personal--data li:nth-of-type(4) a img';
const hrefCorreo        = '.personal--data li:nth-of-type(4) a';
const tecnologia        = '.personal--tecnologia ul';
const bloqueEducacion   = '.details .section--child .child:first-of-type h1';
const bloqueExperiencia = '.details .section--child .child:nth-of-type(2) h1';
const bloqueProyectos   = '.details .section--child .child:nth-of-type(3) h1';

const cargarDatos = (localData) => {
    const apeynom = localData.personal.nombre.apeynom;
    
    //Cambia el color de los restantes caracteres despues del 13.
    const nombreCompleto = (apeynom.length >= 13) ? `${apeynom.slice(0, 13)}<b>${apeynom.slice(13)}</b></div>` : apeynom;   
    
    sendToHTML(nombreCompleto, nombre);
    sendToHTML(localData.personal.nombre.titulo, titulo);
    qs('.resume--profile picture img').src = localData.personal.picture;
    
    injectHTML(localData.personal.web, sitioWeb, 'afterend'); 
    injectHTML(`${localData.personal.ubicacion.domicilio.calle} ${localData.personal.ubicacion.domicilio.numero} (${localData.personal.ubicacion.provincia})`, domicilio, 'afterend');
    injectHTML(localData.personal.phone,telefono,'afterend');
    injectHTML(localData.personal.email,correo,'afterend');
    
    qs(hrefWeb).href        = `https://${localData.personal.web}`;
    qs(hrefDomicilio).href  = `http://maps.google.com/maps?q=${localData.personal.ubicacion.coordenadas.latitud},${localData.personal.ubicacion.coordenadas.longitud}&ll=${localData.personal.ubicacion.coordenadas.latitud},${localData.personal.ubicacion.coordenadas.longitud},z=13`;
    qs(hrefTelefono).href   = `tel:${localData.personal.phone}`;
    qs(hrefCorreo).href     = `mailto:${localData.personal.email}`;

    const tecnologias = (localData.tecnologias).split(',');
    let tecnologiasHTML='';
    for(let i=0; i < tecnologias.length; i++) {tecnologiasHTML += `<li>${tecnologias[i]}</li>`;}
    sendToHTML(tecnologiasHTML,tecnologia);
    
    putTitleText(localData.educacion,bloqueEducacion);
    putTitleText(localData.experiencia,bloqueExperiencia);
    putTitleText(localData.proyectos,bloqueProyectos);
    
}

if (localStorage.getItem("localData") === null) {
    fetch('assets/js/person.json')
    .then((response) => response.json())
    .then((data) => {
        window.localStorage.setItem("localData", JSON.stringify(data));
        const localData = JSON.parse(window.localStorage.getItem("localData"));
        cargarDatos(localData);        
    });
}
else {
    const localData = JSON.parse(window.localStorage.getItem("localData"));
    cargarDatos(localData);      
}

//Imagenes del boton de contacto.
const svgMail = {
    'close':'<svg version="1.0" class="closeMessage" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none" style="stroke:#000000;stroke-opacity:1;stroke-width:259.0000005;stroke-dasharray:none"><path style="stroke:#000000;stroke-opacity:1;stroke-width:259.0000005;stroke-dasharray:none" d="M4580 4789 c-14 -5 -474 -458 -1022 -1007 l-998 -997 -997 997 c-1085 1084 -1016 1021 -1110 1003 -49 -9 -109 -69 -118 -118 -18 -94 -81 -25 1003 -1109 l997 -998 -1002 -1002 c-1087 -1089 -1026 -1021 -1009 -1114 9 -47 73 -111 120 -120 93 -17 25 -78 1113 1009 l1003 1002 1002 -1002 c1090 -1089 1021 -1026 1115 -1008 49 9 109 69 118 118 18 94 81 25 -1008 1114 l-1002 1003 1002 1002 c1086 1087 1026 1021 1009 1113 -17 91 -127 149 -216 114z"/></g></svg>',
    'open':'<svg width="20" height="30" version="1.1" viewBox="-7 0 45 23" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-3.2141 -3.1304)"><path d="m5.4096 25.947c-0.49246-0.11938-0.87987-0.33419-1.2937-0.71737-0.41008-0.37966-0.74138-0.97475-0.84062-1.5099-0.081428-0.43915-0.081428-17.831 0-18.27 0.099235-0.53517 0.43054-1.1303 0.84062-1.5099 0.19962-0.18481 0.49436-0.40261 0.65499-0.48401 0.67437-0.34173-0.059904-0.32429 13.695-0.32525 8.1762-4.51e-4 12.769 0.020205 12.977 0.058708 1.0909 0.20229 2.051 1.163 2.2592 2.2607 0.03973 0.20949 0.06059 3.393 0.06002 9.158-9.01e-4 9.5907 0.01156 9.2124-0.32525 9.877-0.0814 0.16062-0.2992 0.45538-0.48401 0.65499-0.37966 0.41008-0.97475 0.74138-1.5099 0.84062-0.2081 0.03858-4.7926 0.05784-13.006 0.05462-10.606-0.004175-12.741-0.018582-13.027-0.087813zm25.49-8.2933c0-4.4022-0.01517-5.5131-0.07458-5.4771-0.04102 0.02488-0.82633 0.63815-1.7451 1.3628-0.9188 0.72468-2.3418 1.8461-3.1621 2.4921-0.82036 0.64596-1.8943 1.5001-2.3865 1.898-1.9575 1.5827-3.2954 2.2523-4.7187 2.3617-0.90049 0.06921-1.7452-0.12222-2.7988-0.63428-0.78685-0.38241-1.4772-0.84728-2.5655-1.7276-0.49222-0.39815-1.7541-1.4004-2.8041-2.2271-1.0501-0.82677-2.4932-1.9669-3.207-2.5335-0.71376-0.56666-1.3111-1.0303-1.3275-1.0303-0.01636 0-0.02974 2.4835-0.02974 5.5188v5.5188h24.82zm-11.693-0.34108c0.75262-0.25697 1.5453-0.7868 3.1952-2.1357 0.42434-0.34692 1.9797-1.5804 3.4563-2.7412 1.4766-1.1607 3.2151-2.5354 3.8632-3.0549l1.1783-0.94453v-2.4431h-24.82v2.4307l0.73087 0.59487c0.40198 0.32718 2.2075 1.7575 4.0123 3.1785 1.8048 1.421 3.617 2.8573 4.0272 3.1918 1.4769 1.2044 2.1491 1.6467 2.9116 1.9158 0.50392 0.17787 0.93974 0.18022 1.4447 0.0078z" stroke-width=".059662"/></g></svg>'
};

const btnMenu = qs('.burger');
const btnContacto = qs('.message');
const menu = qs('.menu');
const allLinksM = document.querySelectorAll('.menu a');
const contacto = qs('.modal--contact');

btnMenu.addEventListener('click', (e)=>{e.preventDefault();menu.classList.toggle('op-0');btnMenu.classList.toggle('active');});
for (let i = 0; i < allLinksM.length; i++) {
    allLinksM[i].addEventListener('click', ()=>{menu.classList.toggle('op-0');btnMenu.classList.toggle('active');});
}

btnContacto.addEventListener('click', (e)=>{
    e.preventDefault();
    contacto.classList.toggle('op-0');
    btnContacto.classList.toggle('active');
    if(btnContacto.classList.contains('active')) {
        btnContacto.innerHTML = svgMail['close'];
    } else {
        btnContacto.innerHTML = svgMail['open'];
    };
});