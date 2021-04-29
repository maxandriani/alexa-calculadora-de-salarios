import { getIntentName, getRequestType } from "ask-sdk-core";
import { RequestEnvelope } from "ask-sdk-model";

export function isIntent(request: RequestEnvelope, name: string): boolean {
  return getRequestType(request) === 'IntentRequest' && getIntentName(request) === name;
}