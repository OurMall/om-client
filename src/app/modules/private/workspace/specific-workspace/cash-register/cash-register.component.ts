import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { InvoiceService, ProductService, MessageService, WorkspaceService } from "@app/common/services";
import { Invoice, Product, Details, Currency, Price } from '@app/common/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-cash-register',
	templateUrl: './cash-register.component.html',
	styleUrls: ['./cash-register.component.scss']
})
export class CashRegisterComponent implements OnInit {

	public id_client!: string;
	public total_price: number = 0;
	public invoice!: Invoice;
	public products!: any[];
	public showProducts!: any[];
	public payment_method!: string;
	public nameProduct!: string;
	public vatProduct!: number;
	public initialValueVAT!: number;
	public vats!: number[];
	public productos!: any[];


	public searhProduct!: Observable<Product>;
	public quantity!: number;

	// TRKRG
	public control = new FormControl()
	public searh!: Observable<string[]>
	public listNames!: string[];
	public names!: any[];
	public return!: number

	public detailsForm = this.formBuilder.group({
		Name: ["", Validators.required],
		Price: [0.0, Validators.required],
		Code: ["", Validators.required],
		Quantity: [0, Validators.required]
	})

	private workSpaceId!: string;
	@ViewChild('quantityDetails')
	public quantityDetails!: ElementRef;

	public formGroup!: FormGroup;

	constructor(
		private invoiceService: InvoiceService,
		private productService: ProductService,
		private formBuilder: FormBuilder,
		private message: MessageService,
		private workSpaceService: WorkspaceService,
		private activatedRoute: ActivatedRoute

	) {
		this.products = [];
		this.invoice = { id_client: this.id_client, details: [], total_price: this.total_price, payment_method: "Nada" };

	};

	ngOnInit(): void {
		this.getProducts();
		this.initForm();
		this.getNames();
		this.getProductos();
		this.activatedRoute.parent?.params.subscribe(params => {
			console.log(params,"params") ;
			
			this.workSpaceId = params["id"]
			this.getet()
		})
		this.workSpaceService.workspaces().subscribe()
	};

	getProductos() {
		this.workSpaceService.workspaces$.subscribe((workspace: { id: any, products: any[]; }[]) => {
			let index
		})
	}

	getet() {
		this.workSpaceService.workspace(this.workSpaceId).subscribe(response => {
			this.productos = response.products;
		})
	};

	initForm() {
		this.formGroup = this.formBuilder.group({
			'employee': ['']
		});
		this.formGroup.get('employee')?.valueChanges.subscribe((response: any) => {
			console.log('data is', response)
			this.filterData(response);
		});
	};

	calcash() {
		const icash: any = document.getElementById("i-cash");
		const calculo = (icash.value - this.total_price);
		this.return = calculo;
	}


	filterData(enteredData: any) {
		this.names = this.listNames.filter(item => {
			return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
		})
	};

	getNames() {
		this.workSpaceService.worksNames().subscribe((response: any[]) => {
			console.log(response[0],"nombres")
			console.log(response[0][0].name,"nombres")
			let listNames: any[] = []
			for (let index = 0; index < response.length + 1; index++) {
				const element = response[0][index].name;
				listNames.push(element)
			}
			this.listNames = listNames;
			console.log(this.listNames,"nombres dentro de la lista");
			this.names = listNames;
		});
	};

	getName() {
		this.workSpaceService.workspace(this.workSpaceId).subscribe(response => {
			console.log(response.products,"Productos")
			 console.log(response.products[0].name,"NOMBRES DENTRO");
			console.log(this.productos,"EN LISTA")
		})
	};


	getInvoices() {
		this.invoiceService.invoices().subscribe((invoice: any) => {
			this.products = invoice;
		})
	};

	selectProduct(nameProduct: string) {
		this.nameProduct = nameProduct;
	};

	getProducts() {
		this.productService.products().subscribe(((response: string | any[]) => {
			try {
				let range = response.length;
				let array: string[] = [];
				for (let index = 0; index < range; index++) {
					array.push(response[index].name!)
				}
				this.listNames = array
			} catch (error) {
				console.log("Error al traer productos")
			}
		}));
	};
	
	traerProductos(nombre:string, Quantity:string) {
		let index = this.productos.findIndex(p => p.name == nombre)
		let quantity = parseInt(Quantity);
		let product: Product = {
			name: "",
			price: {
				value: 0.0,
				currency: Currency.COP
			},
			code: "",
			quantity: 0,
			vat: 0.0
		};
		/* ------- Valida que s?? se ingrese un c??digo ------- */
		if (nombre === null || '' || undefined) {
			this.message.info("Por favor ingrese un c??digo de producto");
			/* ------- Valida que s?? se ingrese una cantidad para poder registrar un producto ------- */
		} else if (quantity == null || undefined) {
			this.message.info("Por favor ingrese una cantidad para este producto");
		} else {
			/* ------- Traigo el producto relacionado con el c??digo que se ingresa ------- */
				try {
					/*  ------- Asigno los valor que necesito del producto a la variable product ------- */
					const element = this.productos[index];
					let priceProduct = Math.round((element.price.value * parseFloat(`${1}.${element.vat}`)))
					console.log(priceProduct,"precio")
					product = {
						name: nombre,
						price: {
							value: priceProduct,
							currency: Currency.COP
						},
						code: element.code,
						quantity: quantity,
						vat: (element.price.value * parseFloat(`${0}.${element.vat}`))
					};
					this.initialValueVAT = element.vat;
					/* ------- Valida si el producto que se ingresa ya existe en los detalles y en caso de que exista suma la nueva cantidad a la cantidad que ya ten??a ------- */
					if (this.products.find(product => product.name == nombre)) {
						let index = this.products.findIndex(p => p.name === nombre);
						let newQuantity = this.products[index].quantity += quantity;
						this.UpdateQuantity(element.code, newQuantity, this.initialValueVAT);
					} else {
						/* ------- Ingresa los productos a los detalles que va a tener la factura -------*/
						this.products.push(product);
						console.log(this.products,"lista ");
						
					};
					/* ------- Llamo a la funci??n para que vaya sumando los valores y as?? obtener el valor total de la factura -------*/
					this.sumPrices();
					//this.calculateVat(element.vat, element.price, this.quantity, element.code);
				} catch (error) {
					/* ------- En caso de que no haya un producto con el c??digo que se ingreso salta este mensaje ------- */
					this.message.error("No hay un producto con ??ste c??digo");
				};
			};
		};

	addInvoices() {
		this.invoice.id_client = this.id_client
		this.invoice.total_price = this.total_price;
		this.invoice.details = this.products;
		/* ------- Valida que si hayan productos en los detalles para poder crear la factura ------- */
		if (this.products.length === 0) {
			this.message.info("Para crear la factura necesita m??nimo un producto");
		} else {
			this.invoiceService.create(this.invoice).subscribe(response => {
				this.message.success('Factura creada');
				this.recordLocalStorage();
			});
		};
	};

	saveVats() {
		this.vats.push(this.initialValueVAT);
	};

	UpdateQuantity(name: String, quantity: string, vat: number) {
		/* ------- Posici??n del producto que se desea actualizar -------*/
		let index = this.products.findIndex(p => p.name === name);
		/* ------- Nuevo valor que se ingresa ------- */
		let newQuantity = parseInt(quantity)
		/* ------- Se valida si el producto est?? en la lista y si su cantidad actual es mayor
		o igual a la que se est?? ingresando ------- */
		if (index > -1 && this.products[index].quantity >= newQuantity) {
			/* ------- Se cambia la cantidad que tiene el producto por la nueva ------- */
			this.products[index].quantity = newQuantity;
			this.subtractPrices();
			/* ------- Se llama a la funci??n que se encarga de restar los valores para obtener el total de la factura ------- */
			//this.calculateVat(vat, this.products[index].Price, newQuantity, this.products[index].Code)
		} else if (index > -1 && this.products[index].quantity <= newQuantity) {
			this.products[index].quantity = newQuantity;
			/* ------- Se llama a la funci??n que se encarga de sumar los valores para obtener el total de la factura ------- */
			this.sumPrices();
			//this.calculateVat(vat, this.products[index].Price, newQuantity, this.products[index].Code)
		};
	};

	deleteProductToDetails(code: String) {
		let amountToRemove = 1;
		let index = this.products.findIndex(p => p.Code === code);
		if (index > -1 && confirm('??Desea eliminar el producto?')) {
			this.products.splice(index, amountToRemove);
			this.subtractPrices();
		}
	};

	sumPrices() {
		let initialValue = 0;
		this.total_price = this.products.reduce((
			currentValue,
			object,
		) => currentValue + (object.price.value * object.quantity), initialValue);
	};

	subtractPrices() {
		let initialValue = 0;
		this.total_price = this.products.reduce((
			currentValue,
			object,
		) => currentValue - (object.price.value * object.quantity) * -1, initialValue);
	};

	recordLocalStorage() {
		let products: any[] = this.products
		localStorage.setItem("id_client", this.id_client);
		localStorage.setItem("product", JSON.stringify(products));
		localStorage.setItem("total_price", this.total_price.toString());
	};
}
