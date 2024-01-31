import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import EventInterface from "../../../../@shared/event/event.interface";

export default class SendConsoleLog2Handler implements EventHandlerInterface {
  handler(event: EventInterface): void {
    console.log(
      "Esse é o segundo console.log do evento: CustomerCreated ",
      event
    );
  }
}
