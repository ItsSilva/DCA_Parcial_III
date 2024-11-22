export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	products: [];
	productToEdit: {};
};

export enum Screens {
	"ADMIN" = "ADMIN",
	"USER" = "USER"
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'ADDPRODUCTS' = 'ADDPRODUCTS',
	'GETPRODUCTS' = 'GETPRODUCTS',
	'DELETEPRODUCT' = 'DELETEPRODUCT',
	'UPDATEPRODUCT' = 'UPDATEPRODUCT',
}

export enum SomeActions {
  "X" = "X",
}

//export interface XAction {
//  action: SomeActions.X;
//  payload: Pick<AppState, "something">;
//}

//export type Actions = XAction;
