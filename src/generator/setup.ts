import helpers from "handlebars-helpers";
import HB from "handlebars";
import {register} from "./register";

HB.registerHelper('every', function <T extends Object>(value: T[], key: keyof T, text?: T[keyof T]) {
  if (!text) {
    return value.every(item => (item[key] == undefined ? false : item[key]))
  }
  return value.every(item => (item[key] == undefined ? false : item[key]) === text)
});

HB.registerHelper('any', function <T extends Object>(value: T[], key: keyof T, text?: T[keyof T]) {
  if (!text) {
    return value.some(item => (item[key] == undefined ? false : item[key]))
  }
  return value.some(item => (item[key] == undefined ? false : item[key]) === text)
});

helpers({handlebars: HB});
export const setup = () => register();
