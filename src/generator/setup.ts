import helpers from "handlebars-helpers";
import HB from "handlebars";
import {register} from "./register";

HB.registerHelper('every', function (value: Record<string, unknown>[], key: string, text?: unknown) {
  if (text === undefined) {
    return value.every(item => (item[key] == undefined ? false : item[key]))
  }
  return value.every(item => (item[key] == undefined ? false : item[key]) === text)
});

HB.registerHelper('any', function (value: Record<string, unknown>[], key: string, text?: unknown) {
  if (text === undefined) {
    return value.some(item => (item[key] == undefined ? false : item[key]))
  }
  return value.some(item => (item[key] == undefined ? false : item[key]) === text)
});

helpers({handlebars: HB});
export const setup = () => register();
