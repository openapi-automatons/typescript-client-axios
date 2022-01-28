import {Automaton} from "@automatons/tools";
import {generate} from "./generator";

const generatorTypescriptAxiosClient: Automaton = (openapi, settings) =>
  generate(openapi, settings);

export default generatorTypescriptAxiosClient;
