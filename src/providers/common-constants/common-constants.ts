import { Injectable } from '@angular/core';

@Injectable()
export class CommonConstants {

  static readonly ErrorMessages = {
    POPUP_TTILE : "We're sorry.",
    ENV_DOWN_MESSAGE: "There was an unknown error while processing your request. Please try again and contact PenFed if the problem persists.",
    MAINTENANCE_MESSAGE: "The PenFed Mobile Banking Application is currently undergoing system maintenance. We appreciate your patience and look forward to serving you.",
    NOT_LISTED_USER: "This is not a PenFed username. Please re-enter."
  }

}
