//Referencias
const container = document.querySelector( '.container' );
const resultado = document.querySelector( '#resultado' );
const formulario = document.querySelector( '#formulario' );

//Eventos
window.addEventListener( 'load', () => {
    formulario.addEventListener( 'submit', buscarClima );
} );



//funciones
function buscarClima( e ) {

    e.preventDefault();

    //Validar los inputs, que no esten vacios
    const ciudad = document.querySelector( '#ciudad' ).value;
    const pais = document.querySelector( '#pais' ).value;

    if( ciudad === '' || pais === '' ) {
        //Cuando los campos estan vacios mostramos un mensaje
        mostrarMensaje( 'Todos los campos son obligatorios' );

        return;
    }
    

    //Consultar la API
    consultarAPI( ciudad, pais );

}


//funcion para consultar la api
function consultarAPI( ciudad, pais ) {
    
    const appId = 'f7d3af223e920ebbbd39eb616ab25766';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    crearSpinner();

    fetch( url )
        .then( respuesta => respuesta.json() )
        .then( resultado => {
            limpiarHTML();//Limpiar el html previo
            if( resultado.cod === '404' ) {
                mostrarMensaje( 'La ciudad no existe' );

                return;
            }

            //Imprimir html 
            mostrarClima( resultado );
        } );

        formulario.reset();
}

function mostrarClima( datos ) {

    const { name ,main: { temp, temp_max, temp_min } } = datos;

    const tempActual = kelvinACentigrados( temp );
    const tempMax = kelvinACentigrados( temp_max );
    const tempMin = kelvinACentigrados( temp_min );

    //Creamos el script
    const nombre = document.createElement( 'p' );
    nombre.textContent = `Clima en ${ name }`;
    nombre.classList.add( 'font-bold', 'text-2xl' );

    const actual = document.createElement( 'p' );
    actual.innerHTML = ` ${tempActual}&#8451; `;
    actual.classList.add( 'font-bold', 'text-6xl' );

    const tempMaxima = document.createElement( 'p' );
    tempMaxima.innerHTML = `Max: ${ tempMax } &#8451; `;
    tempMaxima.classList.add( 'text-xl' );

    const tempMinina = document.createElement( 'p' );
    tempMinina.innerHTML = `Min: ${ tempMin } &#8451; `;
    tempMinina.classList.add( 'text-xl' );
    


    const resultadoDiv = document.createElement( 'div' );
    resultadoDiv.classList.add( 'text-center', 'text-white' );
    resultadoDiv.appendChild( nombre );
    resultadoDiv.appendChild( actual );
    resultadoDiv.appendChild( tempMaxima );
    resultadoDiv.appendChild( tempMinina );

    resultado.appendChild( resultadoDiv );
    
}

const kelvinACentigrados = grados => parseInt( grados - 273.15 );


function mostrarMensaje( mensaje ) {
    //Prevenir que la alerta se repita
    const alerta = document.querySelector( '.bg-red-100' );

    if( !alerta ) {

        //Creamos la alerta
        const alerta = document.createElement( 'div' );
        alerta.classList.add( 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center' );
    
        alerta.innerHTML = `
            <strong class="font-bold">¡Error!</strong>
            <span class="block">${ mensaje }</span>
        `;
    
        container.appendChild( alerta );
        
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
    
   
}

function limpiarHTML() {
    while( resultado.firstChild ){
        resultado.removeChild( resultado.firstChild );
    }   
}

function crearSpinner() {

    limpiarHTML();

    const divSpinner = document.createElement( 'div' );
    divSpinner.classList.add( 'sk-fading-circle' );
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    
    `;

    resultado.appendChild( divSpinner );
}