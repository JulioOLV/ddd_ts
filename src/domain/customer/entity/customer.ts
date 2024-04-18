import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendConsoleLog1Handler from "../event/handlers/customer-created-event/send-console-log-1.handler";
import SendConsoleLog2Handler from "../event/handlers/customer-created-event/send-console-log-2.handler";
import SendConsoleLogHandler from "../event/handlers/customer-address-changed-event/send-console-log.handler";
import Address from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    this.customerCreated();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validate();
    this.customerAddressChanged();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(rewardPoints: number) {
    this._rewardPoints += rewardPoints;
  }

  customerCreated() {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
      rewardPoints: this._rewardPoints,
    });

    eventDispatcher.notify(customerCreatedEvent);
  }

  customerAddressChanged() {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: this._address.toString(),
    });

    eventDispatcher.notify(customerAddressChangedEvent);
  }
}
