const socket=io()
//MOSTRAR USUARIOS
socket.on("servidorEnviarUsuarios",(usuarios)=>{
    var tr="";
    //<td>${usuario._id}</td>
    usuarios.forEach((usuario,idLocal)=>{
        tr=tr+`
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.password}</td>
                <td>
                    <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a> / 
                    <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datos").innerHTML=tr;
});
//FIN MOSTRAR USUARIOS

//GUARDAR USUARIO
var formNuevoUsuario=document.getElementById("formNuevoUsuario");
var datos=document.getElementById("datos");
var mensajes=document.getElementById("mensajes");
formNuevoUsuario.addEventListener("submit",(e)=>{
    e.preventDefault();
    var usuario={
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado",(mensaje)=>{
        console.log("Usuario guardado");
        mensajes.innerHTML=mensaje;
        document.getElementById("nombre").value="";
        document.getElementById("usuario").value="";
        document.getElementById("password").value="";
        document.getElementById("nombre").focus();
        setTimeout(()=>{mensajes.innerHTML=""},3000);
    });
});
//FIN GUARDAR USUARIO
//EDITAR USUARIO PARTE1
function editarUsuario(id){
    console.log("Estas en editar usuario "+id);
    socket.emit("clienteObtenerUsuarioId",id);
    socket.on("servidorObtenerUsuarioId",(usuario)=>{
        document.getElementById("id").value=usuario._id;
        document.getElementById("nombre").value=usuario.nombre;
        document.getElementById("usuario").value=usuario.usuario;
        document.getElementById("password").value=usuario.password;
    });
}
//FIN EDITAR USUARIO PARTE1

//BORRAR USUARIO
function borrarUsuario(id){
    socket.emit("clienteBorrarUsuario",id);
}
//FIN BORRAR USUARIO


////////////////////INICIO DE PRODUCTOS///////////////////////////

//MOSTRAR PRODUCTOS

socket.on("servidorEnviarProductos",(productos)=>{
    var tr="";

    productos.forEach((producto,idLocal)=>{
        tr=tr+`
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> / 
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datospro").innerHTML=tr;
});
//FIN MOSTRAR USUARIOS

//GUARDAR USUARIO
var formNuevoProducto=document.getElementById("formNuevoProducto");
var datospro=document.getElementById("datospro");
var mensajespro=document.getElementById("mensajespro");
formNuevoProducto.addEventListener("submit",(e)=>{
    e.preventDefault();
    var producto={
        id:document.getElementById("idpro").value,
        nombre:document.getElementById("nombrepro").value,
        precio:document.getElementById("precio").value,
        cantidad:document.getElementById("cantidad").value
    }
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado",(mensaje)=>{
        console.log("Producto guardado");
        mensajespro.innerHTML=mensaje;
        document.getElementById("nombrepro").value="";
        document.getElementById("precio").value="";
        document.getElementById("cantidad").value="";
        document.getElementById("nombrepro").focus();
        setTimeout(()=>{mensajespro.innerHTML=""},3000);
    });
});
//FIN GUARDAR USUARIO
//EDITAR USUARIO PARTE1
function editarProducto(id){
    console.log("Estas en editar producto "+id);
    socket.emit("clienteObtenerProductoId",id);
    socket.on("servidorObtenerProductoId",(producto)=>{
        document.getElementById("idpro").value=producto._id;
        document.getElementById("nombrepro").value=producto.nombre;
        document.getElementById("precio").value=producto.precio;
        document.getElementById("cantidad").value=producto.cantidad;
    });
}
//FIN EDITAR USUARIO PARTE1

//BORRAR USUARIO
function borrarProducto(id){
    socket.emit("clienteBorrarProducto",id);
}