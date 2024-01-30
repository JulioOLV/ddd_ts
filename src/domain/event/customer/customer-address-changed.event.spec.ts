import Address from "../../entity/address";
import Customer from "../../entity/customer";

describe("Customer address changed event unit tests", () => {
  it("should update address and notify", () => {
    const customer = new Customer("123", "Julio");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
    const spyEventHandler = jest.spyOn(customer, "customerAddressChanged");

    customer.changeAddress(address);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
