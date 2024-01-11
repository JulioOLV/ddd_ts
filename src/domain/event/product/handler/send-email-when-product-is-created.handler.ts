import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log("Email sending to ... ", event);
  }
}
