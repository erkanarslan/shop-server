import express from "express";
import { products as allProducts } from "./products.js";

const app = express();
const port = 3000;
app.use(express.json());

let orders = [];
let nextOrderId = 1;

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.get('/api/products', (req, res) => {
	let products = [...allProducts];

	if(req.query.name) {
		products = products.filter(p => p.name.toLowerCase().includes(req.query.name.toLowerCase()));
	}

	res.send(products);
});


app.get('/api/products/:productId', (req, res) => {
	console.log("GET", req.params);

	let product = allProducts.find(p => p.id == +req.params.productId);
	if(!product) {
		res.sendStatus(404);
		return;
	}

	res.send(product);
});

app.get('/api/orders', (req, res) => {
	res.send(orders);
});


app.post('/api/orders', (req, res) => {
	console.log("POST", req.body);

	let newOrder = {id : nextOrderId, count : +req.body.count, cost : +req.body.cost};
	orders.push(newOrder);
	nextOrderId++;
	res.send(newOrder);
});


app.delete('/api/orders/:orderId', (req, res) => {
	console.log("DELETE", req.params);

	if(!req.params.orderId) {
		res.sendStatus(400);
		return;
	}

	let index = orders.findIndex(o => o.id == +req.params.orderId);
	if(index == -1) {
		res.sendStatus(404);
		return;
	}

	orders.splice(index, 1);

	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});