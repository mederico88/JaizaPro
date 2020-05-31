let ADDarticulo = document.querySelectorAll('.add-carro');
let productos = [
    {
        name:'Collar Cruz Cristal',
        tag: 'IMG-20180514-WA0003',
        precio: 100,
        cantidadCarrito: 0
    },
    {
        name:'Collar Chino',
        tag: 'IMG-20180514-WA0006',
        precio: 150,
        cantidadCarrito: 0
    },
    {
        name:'Collar Boton Cristal',
        tag: 'IMG-20180514-WA0007',
        precio: 90,
        cantidadCarrito: 0
    },
    {
        name:'Collar Estrella Metal',
        tag: 'IMG-20180514-WA0011',
        precio: 120,
        cantidadCarrito: 0
    }
]


for(let i=0; i <ADDarticulo.length; i++){
    ADDarticulo[i].addEventListener('click', () => {
        botonCarrito(productos[i]);
        costoTotal(productos[i]);
    })
};

function botonCarrito(productos) {
    let numProducts = localStorage.getItem('botonCarrito');
    numProducts = parseInt(numProducts);

    if (numProducts ){
        localStorage.setItem('botonCarrito', numProducts + 1);
        document.querySelector('.carro span').textContent = numProducts+1;
    }else{
        localStorage.setItem('botonCarrito', 1);
        document.querySelector('.carro span').textContent = 1;
    }

    AnadirPP(productos);
}

function AnadirPP(productos){

    let itemsCarrito = localStorage.getItem('productosEnCarro');
    itemsCarrito = JSON.parse(itemsCarrito);
    if(itemsCarrito != null) {

        if(itemsCarrito[productos.tag]==undefined){
            itemsCarrito = {
                ...itemsCarrito,
                [productos.tag]:productos
            }
        }
        itemsCarrito[productos.tag].cantidadCarrito +=1;
    }else{
        productos.cantidadCarrito =1;

        itemsCarrito =  {
            [productos.tag]: productos
        }
    }
    localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));

}
    
function costoTotal(productos){
    let costoENcarro = localStorage.getItem('costoTotal');

    if(costoENcarro !=null){
        costoENcarro=parseInt(costoENcarro);
        localStorage.setItem("costoTotal", costoENcarro+productos.precio);
    }else{
        localStorage.setItem("costoTotal", productos.precio);
    }
}

function carroF5 (){
    let numProducts = localStorage.getItem('botonCarrito');
    
    if( numProducts){
        document.querySelector('.carro span').textContent = numProducts
    }
}
carroF5();

//--------------pagina del carrito-----------
function dentroDELcarro(){
    let itemsCarrito = localStorage.getItem("productosEnCarro");
    itemsCarrito = JSON.parse(itemsCarrito);
    let costoENcarro = localStorage.getItem('costoTotal');
    let productoscontenidos = document.querySelector(".productos");

    
    if(itemsCarrito && productoscontenidos){
        productoscontenidos.innerHTML = '';
        Object.values(itemsCarrito).map(item => { //el simbolo => significa funcion
            productoscontenidos.innerHTML += `
                <div class="cadaArticulo">
                    <div class="productico">
                        <div class ="imagencarrito">
                            <button type="button" id="btnborrar" class="fa fa-trash eliminar"></button>
                            <img src="imagenes/${item.tag}.jpg">
                        </div>
                        <span>${item.name}</span>
                    </div>
                    <div class="precio">$${item.precio},00</div>
                    <div class="cantidades">
                        <button type="button" id="btnincrementar"class="fa fa-arrow-up btnincrementar"></button>
                        <span>${item.cantidadCarrito}</span>
                        <button type="button" id="btndecrementar" class="fa fa-arrow-down btndecrementar"></button>
                    </div>
                    <div class="totales">
                        $${item.cantidadCarrito * item.precio},00
                    </div>
                </div>
            `;
        });
        productoscontenidos.innerHTML += /*el simbolo += indica que variable a = a+la nueva variable. -= seria a= a-nueva variable*/` 
            <div class="compraTotalContenido">
                <h4 class="compraTotalTITULO">COMPRA TOTAL</h4>
                <h4 class="compraTotal">
                    $${costoENcarro},00
                </h4>
            </div>
        `
    }
}
dentroDELcarro();
    

//----funciones en cada boton disponible en los productos-----
let botonesDisponibles = document.querySelector('.productos');

function botonActivo (element) {
    let itemsCarrito = localStorage.getItem('productosEnCarro'); 
    let costoENcarro = localStorage.getItem('costoTotal');
    let botonAzul = localStorage.getItem('botonCarrito');
    itemsCarrito = JSON.parse(itemsCarrito);
    botonAzul = parseInt(botonAzul);
    costoENcarro=parseInt(costoENcarro);   
    
        if (element.classList.contains('eliminar')) {
            let image = element.parentElement.getElementsByTagName('img')[0].attributes[0].nodeValue;
            let newtag = image.slice(image.lastIndexOf('/')+1,image.lastIndexOf('.'));
            Object.values(itemsCarrito).map(item => {
                if (item.tag=== newtag){
                let encarro = item.cantidadCarrito;
                let totalPorArticulo = encarro*item.precio;
                localStorage.setItem("costoTotal", costoENcarro-totalPorArticulo);
                localStorage.setItem("botonCarrito", botonAzul-encarro);
                delete itemsCarrito[item.tag];
                localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
                carroF5();
                dentroDELcarro();
                }
            });
        }
        if (element.classList.contains('btnincrementar')) {
            let incremento = element.parentElement.parentElement.getElementsByTagName('img')[0].attributes[0].nodeValue;
            let newtag = incremento.slice(incremento.lastIndexOf('/')+1,incremento.lastIndexOf('.'));           
            Object.values(itemsCarrito).map(item => {
                if (item.tag=== newtag){
                    item.cantidadCarrito = item.cantidadCarrito+1;
                    localStorage.setItem("costoTotal",costoENcarro+item.precio); 
                    localStorage.setItem("botonCarrito", botonAzul+1);
                    localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
                    carroF5();
                    dentroDELcarro();

                }
            }); 
        }
        
        if (element.classList.contains('btndecrementar')) {
            let incremento = element.parentElement.parentElement.getElementsByTagName('img')[0].attributes[0].nodeValue;
            let newtag = incremento.slice(incremento.lastIndexOf('/')+1,incremento.lastIndexOf('.'));           
            Object.values(itemsCarrito).map(item => {
                if (item.tag=== newtag){
                    if (item.cantidadCarrito===1){ 
                        item.cantidadCarrito = item.cantidadCarrito-1;
                        localStorage.setItem("costoTotal",costoENcarro-item.precio); 
                        localStorage.setItem("botonCarrito", botonAzul-1);
                        delete itemsCarrito[item.tag];
                        localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
                        carroF5();
                        dentroDELcarro();
                    }else{
                        item.cantidadCarrito = item.cantidadCarrito-1;
                        localStorage.setItem("costoTotal",costoENcarro-item.precio); 
                        localStorage.setItem("botonCarrito", botonAzul-1);
                        localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
                        carroF5();
                        dentroDELcarro();
                    }

                }
            }); 
        }
}
if(botonesDisponibles != null){
    botonesDisponibles.addEventListener('click',function(e){
    botonActivo(e.target);
})};

