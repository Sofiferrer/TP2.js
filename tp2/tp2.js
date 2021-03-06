var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};

const { vendedoras, ventas, precios } = local;

/*1) precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina 
que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.*/

const precioMaquina = (componentes) => {
  let precioTotal = 0;
  for (elemento of precios) {
    for (comp of componentes) {
      if (elemento.componente === comp) {
        precioTotal = precioTotal + elemento.precio;
      }
    }    
  }
  return precioTotal;
}  
console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]));
// 320 ($200 del monitor + $120 del motherboard)

const agregarValorVenta = () => {
  for (i=0; i<ventas.length; i++) { 
    valorMaquina = precioMaquina(ventas[i].componentes);  
  ventas[i].valorVenta = valorMaquina;
  } 
  return local.ventas;
}
local.ventas = agregarValorVenta();

/*2) cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, 
o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, 
se asume que está identificada por la variable ventas.*/

const cantidadVentasComponente = (componente) => {
  let totalVentas = 0;
  for (venta of ventas) {
    for (i=0; i<venta.componentes.length; i++) {
      if (venta.componentes[i] === componente) {
        totalVentas++;
      }
    }
  }
  return totalVentas;
}
console.log(cantidadVentasComponente("Monitor ASC 543")) // 2

/*3) vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/

const filtroFecha = (mes, anio) => {
  const ventasFiltradas = [];
  for (venta of ventas) {
    const month = venta.fecha.getMonth();
    const year = venta.fecha.getFullYear();
    if (month+1 === mes && year === anio) {
      ventasFiltradas.push(venta);
    }
  }
  return ventasFiltradas;
}

const filtroVendedoras = (nombre, ventas) => {
  const ventasFiltradas = [];
  for (venta of ventas) {
    if (venta.nombreVendedora === nombre) {
      ventasFiltradas.push(venta);
    }
  }
  return ventasFiltradas;
} 

const totalVendido = (ventas) => {
  let totalVendido = 0;
  for (venta of ventas) {
    totalVendido = totalVendido + venta.valorVenta;
  }
  return totalVendido;
}

const vendedoraDelMes = (mes, anio) => {
  let vendedoraMes = 0;
  let nombre = "";
  const ventasXmes = filtroFecha(mes, anio);

  for (vendedora of vendedoras) {
    const ventasPorVendedora = filtroVendedoras(vendedora,ventasXmes);
    let totalVentas = totalVendido(ventasPorVendedora);
    if (totalVentas > vendedoraMes) {
      vendedoraMes = totalVentas;
      nombre = vendedora;
    }    
  }
  return nombre;
} 
console.log(vendedoraDelMes(1, 2019));

/*4) ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/

const ventasMes = (mes, anio) => {
  let ventasMes = filtroFecha (mes, anio);
  let total = totalVendido(ventasMes);
  return total;
}
console.log( ventasMes(1, 2019) ); // 1250


/*5) ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.*/

const ventasVendedora = (nombre) => {
  let ventasVendedora = filtroVendedoras(nombre, ventas) 
  let valorVentas = totalVendido(ventasVendedora);
  return valorVentas;
}
console.log(ventasVendedora("Grace")); // 900

/*6) componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. 
El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente*/

const componenteMasVendido = () => {
  let componentesVendidos = {};
  let masVendido = 0;
  for (venta of ventas) {
    for (i=0; i<venta.componentes.length; i++) {
      if(componentesVendidos[venta.componentes[i]]) {
        componentesVendidos[venta.componentes[i]]++;
      } else {
        componentesVendidos[venta.componentes[i]] = 1;
      }   
    }    
  }
  for (comp in componentesVendidos) {   
    if (componentesVendidos[comp] > masVendido){
      masVendido = comp;
    }
  }
  return masVendido;
}
console.log(componenteMasVendido()); // Monitor GPRS 3000


/*7)huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/

const huboVentas = (mes, anio) => {
  for (venta of ventas) {
    let month = venta.fecha.getMonth();
    let year = venta.fecha.getFullYear();
    if ((month+1 === mes) && (year === anio)) {
      return true;
    }
  }
  return false;
} 
console.log( huboVentas(3, 2019) ); // false

//------------------------------------------------------------------------------------------------------------------


/*Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas 
también tienen el nombre de la sucursal en la cual se realizó. 

Por ejemplo: 
{fecha: new Date(2019, 1, 1), 
nombreVendedora: "Ada", 
componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], 
sucursal: 'Centro' }. 

Por este cambio, se pide:*/

/*1) En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro 
(ya que es la sucursal original).*/

const agregarSucursalCentro = () => {
  for (venta of ventas) {  
  venta.sucursal = 'Centro';
  } 
  return local.ventas;
}
local.ventas = agregarSucursalCentro();


/*2) Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']*/

  local.sucursales = ['Centro', 'Caballito'];
  console.log(local);
  const { sucursales } = local;

/*3) Cargar la siguiente información en el array ventas, creando sus respectivos objetos 
siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal*/

// 12/02/2019, Hedy, [Monitor GPRS 3000, HDD Toyiva], Centro
// 24/02/2019, Sheryl, [Motherboard ASUS 1500, HDD Wezter Dishital], Caballito
// 01/02/2019, Ada, [Motherboard MZI, RAM Quinston Fury], Centro
// 11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito
// 15/02/2019, Ada, [Motherboard ASUS 1200, RAM Quinston Fury], Centro
// 12/02/2019, Hedy, [Motherboard ASUS 1500, HDD Toyiva], Caballito
// 21/02/2019, Grace, [Motherboard MZI, RAM Quinston], Centro
// 08/02/2019, Sheryl, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 16/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston Fury], Centro
// 27/02/2019, Hedy, [Motherboard ASUS 1200, HDD Toyiva], Caballito
// 22/02/2019, Grace, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 05/02/2019, Ada, [Motherboard ASUS 1500, RAM Quinston], Centro
// 01/02/2019, Grace, [Motherboard MZI, HDD Wezter Dishital], Centro
// 07/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston], Caballito
// 14/02/2019, Ada, [Motherboard ASUS 1200, HDD Toyiva], Centro

const agregarVentas = () => {
  ventas.push(
  {fecha: new Date (2019, 1, 12), nombreVendedora: 'Hedy',componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 24), nombreVendedora: 'Sheryl',componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: 'Caballito'},
  {fecha: new Date (2019, 1, 1), nombreVendedora: 'Ada',componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 11), nombreVendedora: 'Grace',componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: 'Caballito'},  
  {fecha: new Date (2019, 1, 15), nombreVendedora: 'Ada',componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 12), nombreVendedora: 'Hedy',componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: 'Caballito'},
  {fecha: new Date (2019, 1, 21), nombreVendedora: 'Grace',componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 8), nombreVendedora: 'Sheryl',componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 16), nombreVendedora: 'Sheryl',componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 27), nombreVendedora: 'Hedy',componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: 'Caballito'},
  {fecha: new Date (2019, 1, 22), nombreVendedora: 'Grace',componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 5), nombreVendedora: 'Ada',componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 1), nombreVendedora: 'Grace',componentes: ['Motherboard MZI', "HDD Wezter Dishital"], sucursal: 'Centro'},
  {fecha: new Date (2019, 1, 7), nombreVendedora: 'Sheryl',componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: 'Caballito'},
  {fecha: new Date (2019, 1, 14), nombreVendedora: 'Ada',componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: 'Centro'});
}
agregarVentas();
agregarValorVenta();


/*4) Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas 
por una sucursal sin límite de fecha.*/

const filtroSucursal = (sucursal,ventas) =>{
  const ventasFiltradas = [];
  for (venta of ventas) {
    if (venta.sucursal === sucursal) {
      ventasFiltradas.push(venta);
    }
  }
  return ventasFiltradas;
}

const ventasSucursal = (sucursal) => {
  let ventasLocal = filtroSucursal(sucursal, ventas);
  let total = totalVendido(ventasLocal);
  return total;
}
console.log( ventasSucursal("Centro") ); // 4195

/*5) Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, 
ya que es la misma funcionalidad pero trabajando con una propiedad distinta. 
Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?*/

const ventasSegunParametro = (parametro) => {
  let ventasXparametro = 0;
  for (venta of ventas) {
      if (venta.sucursal === parametro || venta.nombreVendedora === parametro) {
        ventasXparametro += precioMaquina(venta.componentes);
      }
  }
  return ventasXparametro;
}
console.log(ventasSegunParametro('Hedy'));


/*6) Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, 
(mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. 
No cantidad de ventas, sino importe total de las ventas. 
El importe de una venta es el que indica la función precioMaquina. 
El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/



const sucursalDelMes = (mes, anio) =>{
  let sucursalMes = 0;
  let nombre = "";
  const ventasXmes = filtroFecha(mes, anio);

  for (sucursal of sucursales) {
    const ventasPorSucursal = filtroSucursal(sucursal,ventasXmes);
    let totalVentas = totalVendido(ventasPorSucursal);
    if (totalVentas > sucursalMes) {
      sucursalMes = totalVentas;
      nombre = sucursal;
    }    
  }
  return nombre;
}

console.log( sucursalDelMes(1, 2019) ); // "Centro"

//--------------------------------------------------------------------------------------------------------------------

/*Para tener una mejor muestra de como está resultando el local, queremos desarrollar 
un reporte que nos muestre las ventas por sucursal y por mes. 
Para esto, necesitamos crear las siguientes funciones:*/

/*1) renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año*/

const renderPorMes = () => {
  let ventasMes = {};
  for (venta of ventas) {
    const month = venta.fecha.getMonth();
    const year = venta.fecha.getFullYear();           
      
      if(ventasMes[month]) {
          ventasMes[month] = ventasMes[month] + venta.valorVenta;
        } else {
          ventasMes[month] = venta.valorVenta;
      }      
  }
  return `Total ventas Enero 2019: ${ventasMes[0]}    ||    Total ventas Febrero 2019: ${ventasMes[1]}`;
}
console.log( renderPorMes() );
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210


/*2) renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal*/

const renderPorSucursal = () => {
  let ventasSucursal = {};
  for (sucursal of sucursales) {
    for (venta of ventas) {  
      if (venta.sucursal === sucursal)  {
        if(ventasSucursal[sucursal]) {
          ventasSucursal[sucursal] = ventasSucursal[sucursal] + venta.valorVenta;
        } else {
          ventasSucursal[sucursal] = venta.valorVenta;
        } 
      }            
    }
  }
  return `Total ventas Centro: ${ventasSucursal['Centro']}    ||    Total ventas Caballito: ${ventasSucursal['Caballito']}`;
}
console.log( renderPorSucursal() );

// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265


/*3) render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
console.log( render() );*/

const mejorVendedora = () => {
  let mejorVendedora = 0;
  let nombre = "";

  for (vendedora of vendedoras) {
    const ventasPorVendedora = filtroVendedoras(vendedora,ventas);
    let totalVentas = totalVendido(ventasPorVendedora);
    if (totalVentas > mejorVendedora) {
      mejorVendedora = totalVentas;
      nombre = vendedora;
    }    
  }
  return nombre;
}

const render = () => {  
  const ventasXmes = renderPorMes();
  const ventasXsucursal = renderPorSucursal();
  const productoEstrella = componenteMasVendido();
  const vendedoraEstrella = mejorVendedora();
  const render = {};
  render.ventasPorMes = ventasXmes;
  render.ventasPorSucursal = ventasXsucursal;
  render.productoEstrella = productoEstrella;
  render.vendedoraEstrella = vendedoraEstrella;
  return render;
}
console.log(render());


// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace