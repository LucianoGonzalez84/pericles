import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBoiv6Jm3q0LAbnnaajj2qfNShZF10WTsA",
  authDomain: "pericles---despacho-de-cerveza.firebaseapp.com",
  projectId: "pericles---despacho-de-cerveza",
  storageBucket: "pericles---despacho-de-cerveza.appspot.com",
  messagingSenderId: "189675901510",
  appId: "1:189675901510:web:5801dc3d55a8f15cf67047"
};

const FirebaseApp = initializeApp(firebaseConfig);
const DB = getFirestore(FirebaseApp);


export async function getSingleProductFromDataBase(id) {

  const docRef = doc(DB, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } else {
    console.error("El producto no existe");
  }
}

export async function getProductsFromDataBase() {

  const collectionProducts = collection(DB, 'products');
  let respuesta = await getDocs(collectionProducts);

  const products = respuesta.docs.map(docu => {
    return {
      ...docu.data(),
      id: docu.id,
    };
  });

  return (products);
}

export async function getProductsFromDataBaseByStyle(categoryId) {
  const productsRef = (collection(DB, "products"));
  const myQuery = query(productsRef, where("estilo", "==", categoryId));

  const productsSnapshot = await getDocs(myQuery);

  const products = productsSnapshot.docs.map(docu => {
    return {
      ...docu.data(),
      id: docu.id,
    };
  });

  return products;
}

export async function createBuyOrderFirestore(buyOrderData) {
  const collectionRef = collection(DB, "buyorders");
  const docRef = await addDoc(collectionRef, buyOrderData)
  return (docRef.id);
}

// export async function exportItemsToFirestore() {
//   const productsDataBase =
//     [
//       {
//         "id": 1,
//         "nombre": "Blest IPA",
//         "estilo": "Ipa",
//         "tamaño": "355 ml",
//         "ibu": "54 IBU",
//         "alcohol": "6,5 %",
//         "precio": 441.00,
//         "descripcion": "Blest IPA es una cerveza de color ámbar, rojizo, aportado por las maltas caramelizadas. Cuya caracteristica principal se basa en un gran aroma cítrico y un instenso amargor proporcionado por el lúpulo, anto nacional como importado.",
//         "imagen": "/img/cervezas/blestipa.png",
//         "stock": 216,
//       },
//       {
//         "id": 2,
//         "nombre": "Bavaria 8.6 Black",
//         "estilo": "Negra",
//         "tamaño": "500 ml",
//         "ibu": "25 IBU",
//         "alcohol": "7,9 %",
//         "precio": 648.00,
//         "descripcion": "Cerveza color oscura, con aroma a granos de cacao y café recién tostado. En su consumo se pueden degustar los sabores cálidos, dulces y amargos. Su final tiene notas a regaliz en esta cerveza robusta e intensa.",
//         "imagen": "/img/cervezas/bavariablack.png",
//         "stock": 60,
//       },
//       {
//         "id": 3,
//         "nombre": "Blest Bock",
//         "estilo": "Negra",
//         "tamaño": "355 ml",
//         "ibu": "19 IBU",
//         "alcohol": "5,8 %",
//         "precio": 432.00,
//         "descripcion": "Cerveza de color oscuro gracias a las maltas tostadas. En el paladar podemos percibir notas de café y chocolate embebidas de una suavidad de carbonatación moderada.",
//         "imagen": "/img/cervezas/blestbock.png",
//         "stock": 72,
//       },
//       {
//         "id": 4,
//         "nombre": "Cusqueña Dark",
//         "estilo": "Negra",
//         "tamaño": "330 ml",
//         "ibu": "20 IBU",
//         "alcohol": "5,6 %",
//         "precio": 473.00,
//         "descripcion": "Probá la cerveza peruana Cusqueña Dark.. La más preciada del Perú. Sabor delicado y color dorado. Su aroma proviene de su combinación 100% malta y lúpulo aromático.",
//         "imagen": "/img/cervezas/cusqueñadark.png",
//         "stock": 90,
//       },
//       {
//         "id": 5,
//         "nombre": "Guinness Extra Stout",
//         "estilo": "Negra",
//         "tamaño": "473 ml",
//         "ibu": "30 IBU",
//         "alcohol": "5,0 %",
//         "precio": 281.00,
//         "descripcion": "Un balance equilibrado, con caracteres tostados y sutil afrutado de fermentación con aromas cálidos y tostados de café y caramelo. Una cerveza negra distintiva y con cuerpo, con una rica y cremosa espuma.",
//         "imagen": "/img/cervezas/guinnessextrastout.png",
//         "stock": 102,
//       },
//       {
//         "id": 6,
//         "nombre": "Antares Scotch",
//         "estilo": "Roja",
//         "tamaño": "473 ml",
//         "ibu": "18 IBU",
//         "alcohol": "6,0 %",
//         "precio": 367.00,
//         "descripcion": "Escocia es tierra de cebada y la Scotch Ale lleva ese paisaje impregnado en su código genético. Rubí intenso. Seis grados de alcohol. Dulce y maltosa. La Antares más servida en nuestro Brewpub. Una fórmula a prueba del paso del tiempo.",
//         "imagen": "/img/cervezas/antaresscotch.png",
//         "stock": 108,
//       },
//       {
//         "id": 7,
//         "nombre": "Bavaria 8.6 Red",
//         "estilo": "Roja",
//         "tamaño": "500 ml",
//         "ibu": "18 IBU",
//         "alcohol": "7,9 %",
//         "precio": 606.00,
//         "descripcion": "Esta cerveza roja oscura es dulce. Una cerveza con un aroma complejo de granos y caramelo y un final agridulce en el que persiste el alto porcentaje de alcohol.",
//         "imagen": "/img/cervezas/bavaria8.6red.png",
//         "stock": 150,
//       },
//       {
//         "id": 8,
//         "nombre": "Cusqueña Red",
//         "estilo": "Roja",
//         "tamaño": "330 ml",
//         "ibu": "25 IBU",
//         "alcohol": "5,0 %",
//         "precio": 514.00,
//         "descripcion": "Cusqueña Red Lager es una edición especial creada para los paladares más exigentes, con un color rojizo-dorado, resultado de la combinación perfecta de maltas cuidadosamente seleccionadas y el proceso natural de tostar la cebada.",
//         "imagen": "/img/cervezas/cusqueñared.png",
//         "stock": 192,
//       },
//       {
//         "id": 9,
//         "nombre": "Erdinger Dunker",
//         "estilo": "Roja",
//         "tamaño": "500 ml",
//         "ibu": "14 IBU",
//         "alcohol": "5,6 %",
//         "precio": 964.00,
//         "descripcion": "La Erdinger Weissbier Dunkel es una cerveza de trigo de color marrón oscuro de abundante espuma de color crema de duración media y de burbujas finas y suaves, con un 5,6% de alcohol en volumen, su aroma destaca por las notas a malta tostada.",
//         "imagen": "/img/cervezas/erdingerdunkel.png",
//         "stock": 60,
//       },
//       {
//         "id": 10,
//         "nombre": "AC/DC",
//         "estilo": "Rubia",
//         "tamaño": "568 ml",
//         "ibu": "15 IBU",
//         "alcohol": "5,0 %",
//         "precio": 964.00,
//         "descripcion": "Es la unión perfecta entre la cerveza alemana y la legendaria banda australiana de Hard Rock AC/DC. 568 ml de verdadera cerveza alemana. Rubia intensa, refrescante y con espuma persistente",
//         "imagen": "/img/cervezas/acdc.png",
//         "stock": 10,
//       },
//       {
//         "id": 11,
//         "nombre": "Bavaria 8.6 Extreme",
//         "estilo": "Rubia",
//         "tamaño": "500 ml",
//         "ibu": "25 IBU",
//         "alcohol": "10,5 %",
//         "precio": 648.00,
//         "descripcion": "La cerveza más intensa de todo el paquete 8.6. Su cuerpo completo es una combinación de un agradable aroma a lúpulo amargo con un sabor a miel y pomelo y toques potentes de pimienta negra. Una cerveza suave y lisa que es fácil de beber.",
//         "imagen": "/img/cervezas/bavaria8.6extreme.png",
//         "stock": 78,
//       },
//       {
//         "id": 12,
//         "nombre": "Bavaria 8.6 Gold",
//         "estilo": "Rubia",
//         "tamaño": "500 ml",
//         "ibu": "17 IBU",
//         "alcohol": "6,5 %",
//         "precio": 648.00,
//         "descripcion": "Esta birra dorada es poderosa a primera vista, pero tiene un acabado dulce, parecido al caramelo. Su aroma es afrutado y lupulado con tonos de nueces tostadas, miel, flor y manzanilla.",
//         "imagen": "/img/cervezas/bavaria8.6gold.png",
//         "stock": 78,
//       },
//       {
//         "id": 13,
//         "nombre": "Bavaria 8.6 Original",
//         "estilo": "Rubia",
//         "tamaño": "500 ml",
//         "ibu": "18 IBU",
//         "alcohol": "8,6 %",
//         "precio": 606.00,
//         "descripcion": "Color neblina dorado claro, rico en boca, lleno de tonos frutales y picantes. Agradablemente dulce y viscoso en su retrogusto. Aroma agradable con muchos tonos frutales y anís mezclado con la dulzura del grano.",
//         "imagen": "/img/cervezas/bavaria8.6original.png",
//         "stock": 90,
//       },
//       {
//         "id": 14,
//         "nombre": "Bavaria Premiun",
//         "estilo": "Rubia",
//         "tamaño": "500 ml",
//         "ibu": "18 IBU",
//         "alcohol": "5,0 %",
//         "precio": 505.00,
//         "descripcion": "Bavaria Premium es una cerveza rubia, brillante, que no contiene más que cebada, trigo y el lúpulo. Tiene un aroma con notas de granos y frutas, limpio y puro. Tiene un sabor natural y juega con un amargo agradable.",
//         "imagen": "/img/cervezas/bavariapremiun.png",
//         "stock": 108,
//       },
//       {
//         "id": 15,
//         "nombre": "Blest Honey",
//         "estilo": "Rubia",
//         "tamaño": "335 ml",
//         "ibu": "10 IBU",
//         "alcohol": "5,2 %",
//         "precio": 441.00,
//         "descripcion": "Blest Honey es un producto elaborado con miel casera obtenida de colmenas ubicadas en la ciudad de EL Bolsón. Con un bajo porcentaje de lúpulo para no opacar ni el aroma ni el sabor de la miel como predominante en el producto. Su color es dorado.",
//         "imagen": "/img/cervezas/bleshoney.png",
//         "stock": 96,
//       },
//       {
//         "id": 16,
//         "nombre": "Blest Pilsen",
//         "estilo": "Rubia",
//         "tamaño": "335 ml",
//         "ibu": "24 IBU",
//         "alcohol": "5,0 %",
//         "precio": 432.00,
//         "descripcion": "Es de color dorado claro y su volumen de alcohol es de 5%. Utilizamos lúpulos nacionales e importados, que brindan un característico aroma y sabor amargos, de todos modos su sabor maltoso predomina sobre el lúpulo. Es una cerveza fresca, muy bien balanceada, de cuerpo medio en boca.",
//         "imagen": "/img/cervezas/blestpilsen.png",
//         "stock": 84,
//       },
//       {
//         "id": 17,
//         "nombre": "Blest Scotch",
//         "estilo": "Rubia",
//         "tamaño": "350 ml",
//         "ibu": "28 IBU",
//         "alcohol": "5,5 %",
//         "precio": 432.00,
//         "descripcion": "La utilización de maltas caramelizadas aportan un sabor dulce y la malta tostada en bajas cantidades, un leve sabor tostado. Es de un hermoso color ámbar, cobrizo intenso, con buena expuma de color claro.",
//         "imagen": "/img/cervezas/blestscotch.png",
//         "stock": 102,
//       },
//       {
//         "id": 18,
//         "nombre": "Blue Moon",
//         "estilo": "Rubia",
//         "tamaño": "335 ml",
//         "ibu": "9 IBU",
//         "alcohol": "5,4 %",
//         "precio": 447.00,
//         "descripcion": "Una cerveza de trigo elaborada con cáscara de naranja para una sutil dulzura y un brillante aroma cítrico. Sabor ácido y vigoroso al inicio, y un toque especiado a cilantro y naranja al final. La cáscara de naranja de Valencia da una sutil dulzura a la cerveza.",
//         "imagen": "/img/cervezas/bluemoon.png",
//         "stock": 60,
//       },
//       {
//         "id": 19,
//         "nombre": "Corona Botella",
//         "estilo": "Rubia",
//         "tamaño": "710 ml",
//         "ibu": "18 IBU",
//         "alcohol": "4,5 %",
//         "precio": 449.00,
//         "descripcion": "La cerveza mexicana de mayor venta en el mundo y la marca más valiosa de Latinoamérica de acuerdo con Millward Brown. Es una cerveza tipo Pilsner de 4.5º de alcohol. Corona Extra se enfoca la gente que busca relajarse y refrescarse.",
//         "imagen": "/img/cervezas/coronabotella.png",
//         "stock": 228,
//       },
//       {
//         "id": 20,
//         "nombre": "Corona Lata",
//         "estilo": "Rubia",
//         "tamaño": "269 ml",
//         "ibu": "18 IBU",
//         "alcohol": "4,5 %",
//         "precio": 184.00,
//         "descripcion": "La cerveza mexicana de mayor venta en el mundo y la marca más valiosa de Latinoamérica de acuerdo con Millward Brown. Es una cerveza tipo Pilsner de 4.5º de alcohol. Corona Extra se enfoca la gente que busca relajarse y refrescarse.",
//         "imagen": "/img/cervezas/coronalata.png",
//         "stock": 288,
//       },
//       {
//         "id": 21,
//         "nombre": "Cusqueña Golden",
//         "estilo": "Rubia",
//         "tamaño": "330 ml",
//         "ibu": "22 IBU",
//         "alcohol": "5,0 %",
//         "precio": 500.00,
//         "descripcion": "Descubre su exquisito sabor y color dorado profundo. Se obtiene de la combinación de 100% malta de cebada y los más finos lúpulos aromáticos. Combínalo con platos medianamente condimentos o donde prime la acidez.",
//         "imagen": "/img/cervezas/cusqueñagolden.png",
//         "stock": 90,
//       },
//       {
//         "id": 22,
//         "nombre": "Heineken",
//         "estilo": "Rubia",
//         "tamaño": "330 ml",
//         "ibu": "19 IBU",
//         "alcohol": "5,0 %",
//         "precio": 208.00,
//         "descripcion": "Es una cerveza de tipo Lager y estilo Pilsen de color amarillo claro y brillante. Cerveza seca de cuerpo ligero con buen paso de boca, que proporciona un final amargo muy fresco y nada astringente.",
//         "imagen": "/img/cervezas/heineken.png",
//         "stock": 252,
//       },
//       {
//         "id": 23,
//         "nombre": "Patagonia Amber Laguer",
//         "estilo": "Rubia",
//         "tamaño": "473 ml",
//         "ibu": "14 IBU",
//         "alcohol": "4,5 %",
//         "precio": 268.00,
//         "descripcion": "En Patagonia Amber Lager encontrarás una cerveza de un suave sabor a caramelo, elaborada con una combinación de 4 maltas, que le dan su característico color ámbar y sabor maltoso, dejando un sutil dulzor en boca.",
//         "imagen": "/img/cervezas/patagoniaamberlaguer.png",
//         "stock": 234,
//       },
//       {
//         "id": 24,
//         "nombre": "Patagonia Bohemian",
//         "estilo": "Rubia",
//         "tamaño": "473 ml",
//         "ibu": "18 IBU",
//         "alcohol": "5,2 %",
//         "precio": 255.00,
//         "descripcion": "Cerveza con un proceso de macerado de sus maltas y lúpulo patagónico que la hace atractivamente dorada, le da un buen cuerpo y le otorga un amargor deliciosamente equilibrado. Es perfecta para acompañar con carnes blancas.",
//         "imagen": "/img/cervezas/patagoniabohemian.png",
//         "stock": 102,
//       },
//       {
//         "id": 25,
//         "nombre": "Stella Artois Lata",
//         "estilo": "Rubia",
//         "tamaño": "473 ml",
//         "ibu": "24 IBU",
//         "alcohol": "5,2 %",
//         "precio": 231.00,
//         "descripcion": "Tiene un Sabor sutil, proviene de la mezcla de la mejor malta y las mejores variedades de lúpulo. Utilizando sólo ingredientes naturales que garantiza una lager fresca, de alta calidad con un ligero sabor amargo",
//         "imagen": "/img/cervezas/stellaartoislata.png",
//         "stock": 198,
//       },
//       {
//         "id": 26,
//         "nombre": "Stella Artois Porron",
//         "estilo": "Rubia",
//         "tamaño": "330 ml",
//         "ibu": "24 IBU",
//         "alcohol": "5,2 %",
//         "precio": 201.00,
//         "descripcion": "Tiene un Sabor sutil, proviene de la mezcla de la mejor malta y las mejores variedades de lúpulo. Utilizando sólo ingredientes naturales que garantiza una lager fresca, de alta calidad con un ligero sabor amargo",
//         "imagen": "/img/cervezas/stellaartoisporron.png",
//         "stock": 180,
//       },
//       {
//         "id": 27,
//         "nombre": "Erdinger Sin Alcohol",
//         "estilo": "Sin Alcohol",
//         "tamaño": "500 ml",
//         "ibu": "13 IBU",
//         "alcohol": "0,4 %",
//         "precio": 902.00,
//         "descripcion": "Un vaso fresco de Erdinger sin alcohol no solo tiene un sabor fantástico, sino que también es saludable, gracias a la vitamina B9 que apoya un metabolismo fuerte.",
//         "imagen": "/img/cervezas/erdingersh.png",
//         "stock": 60,
//       },
//       {
//         "id": 28,
//         "nombre": "Cusqueña Trigo",
//         "estilo": "Trigo",
//         "tamaño": "330 ml",
//         "ibu": "18 IBU",
//         "alcohol": "5,0 %",
//         "precio": 902.00,
//         "descripcion": "Es una cerveza elaborada con el mejor trigo malteado, su proceso especial levemente filtrado le permite conservar su sabor, aroma y color natural, propios del trigo convertiéndola en una cerveza refrescante, ideal para los momentos especiales.",
//         "imagen": "/img/cervezas/cusqueñatrigo.png",
//         "stock": 96,
//       },
//     ];

//   const collectionRef = collection(DB, "products");
  
//   for (let item of productsDataBase){
//     const docRef = await addDoc(collectionRef, item);
//     console.log('Document created with ID:', docRef.id);
//   }
// }
