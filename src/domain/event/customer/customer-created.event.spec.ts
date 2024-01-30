import Customer from "../../entity/customer";

describe("Customer created event unit tests", () => {
  it("should create new customer and notify", () => {
    const customer = new Customer("123", "Eduardo");
    const spyEventHandler = jest.spyOn(customer, "customerCreated");

    customer.customerCreated();

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
