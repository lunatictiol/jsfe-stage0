// // @ts-nocheck

// /* 
// Refactor below code for 

// 1- Improve efficiency.
// 2- Make it more readable and maintainable.
// 3- Handle potential errors in data (e.g., negative stock).
// 4- Separate the logic into more modular and reusable functions.
// 5- Utilize ES6+ features where appropriate.

// */

// export function handleEcommerceData(data) {
//   var products = data.products;
//   var orders = data.orders;
//   var shipments = data.shipments;

//   var finalData = {};

//   for (var i = 0; i < products.length; i++) {
//     if (products[i].stock > 0) {
//       finalData[products[i].id] = {
//         name: products[i].name,
//         price: products[i].price,
//         stock: products[i].stock,
//       };
//     }
//   }

//   for (var j = 0; j < orders.length; j++) {
//     var order = orders[j];
//     if (finalData[order.productId]) {
//       var productData = finalData[order.productId];
//       productData.stock -= order.quantity;
//       if (!productData.orders) productData.orders = [];
//       productData.orders.push(order.orderId);
//     }
//   }

//   for (var k = 0; k < shipments.length; k++) {
//     var shipment = shipments[k];
//     if (finalData[shipment.productId]) {
//       var productDataForShipment = finalData[shipment.productId];
//       productDataForShipment.stock += shipment.quantity;
//       if (!productDataForShipment.shipments)
//         productDataForShipment.shipments = [];
//       productDataForShipment.shipments.push(shipment.shipmentId);
//     }
//   }

//   var outOfStockProducts = [];
//   for (var productId in finalData) {
//     if (finalData[productId].stock <= 0) {
//       outOfStockProducts.push(productId);
//     }
//   }

//   for (var l = 0; l < outOfStockProducts.length; l++) {
//     delete finalData[outOfStockProducts[l]];
//   }

//   return finalData;
// }


interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  orderId: string;
  productId: number;
  quantity: number;
}

interface Shipment {
  shipmentId: string;
  productId: number;
  quantity: number;
}

interface EcommerceData {
  products: Product[];
  orders: Order[];
  shipments: Shipment[];
}

interface ProductSalesData {
  name: string;
  price: number;
  stock: number;
  orders: string[];
  shipments: string[];
}

export function handleEcommerceData(data: EcommerceData): { [key: number]: ProductSalesData } {
  const productMap = initializeProductMap(data.products);
  applyOrders(productMap, data.orders);
  applyShipments(productMap, data.shipments);
  removeOutOfStock(productMap);
  return Object.fromEntries(productMap);
}

function initializeProductMap(products: Product[]): Map<number, ProductSalesData> {
  const map = new Map<number, ProductSalesData>();
  for (const product of products) {
    if (product.stock >= 0) {
      map.set(product.id, {
        name: product.name,
        price: product.price,
        stock: product.stock,
        orders: [],
        shipments: [],
      });
    }
  }
  return map;
}

function applyOrders(productMap: Map<number, ProductSalesData>, orders: Order[]): void {
  for (const order of orders) {
    const product = productMap.get(order.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - order.quantity); // Prevent negative stock
      product.orders.push(order.orderId);
    }
  }
}

function applyShipments(productMap: Map<number, ProductSalesData>, shipments: Shipment[]): void {
  for (const shipment of shipments) {
    const product = productMap.get(shipment.productId);
    if (product) {
      product.stock += shipment.quantity;
      product.shipments.push(shipment.shipmentId);
    }
  }
}

function removeOutOfStock(productMap: Map<number, ProductSalesData>): void {
  for (const [id, product] of productMap) {
    if (product.stock <= 0) {
      productMap.delete(id);
    }
  }
}

