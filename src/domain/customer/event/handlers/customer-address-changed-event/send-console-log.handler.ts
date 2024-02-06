import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import EventInterface from "../../../../@shared/event/event.interface";
import CustomerAddressChangedEvent from "../../customer-address-changed.event";

export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handler(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
