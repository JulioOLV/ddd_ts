import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Julio");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Julio");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "123", "São Paulo");
    const customer = CustomerFactory.createWithAddress("Julio", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Julio");
    expect(customer.address).toBe(address);
  });
});
