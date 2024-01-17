import OrderItem from "./order_item";

export default class Order {
  _id: string;
  _customerId: string;
  _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  changeCustomer(customerId: string): void {
    this._customerId = customerId;
  }

  updateItems(items: OrderItem[]): void {
    this._items = [];
    this._items = items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((x) => x.quantity <= 0)) {
      throw new Error("Quantity should be greater than zero");
    }
    return true;
  }

  total(): number {
    return this._items.reduce((arr, item) => arr + item.total(), 0);
  }
}
