import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Julio");
    }).toThrow("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("customer: Name is required");
  });

  it("should throw error when name and id are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("customer: Id is required,customer: Name is required");
  });

  it("should change name in customer", () => {
    let customer = new Customer("123", "Eduardo");
    customer.changeName("Monica");
    expect(customer.name).toBe("Monica");
  });

  it("should activate customer", () => {
    let customer = new Customer("123", "Julio");
    let address = new Address("Rua dois", 2, "12345-678", "São Paulo");
    customer.address = address;
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when address is undefined when you activate customer", () => {
    expect(() => {
      let customer = new Customer("123", "Julio");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    let customer = new Customer("123", "Julio");
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const customer = new Customer("c1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
