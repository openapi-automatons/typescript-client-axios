import {Security} from "@automatons/parser";
import {OptionalKind, MethodDeclarationOverloadStructure, Scope} from "ts-morph";
import {render} from "./render";
import {docs} from "./comment";

const BASE_STATEMENTS = [
  "const DateFormat = /^\\d{4}-\\d{2}-\\d{2}([tT]\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:\\d{2})|Z)?$/;",
  "const reviver = (_key: string, value: any) => typeof value === 'string' && DateFormat.test(value) ? new Date(value) : value;",
  "const BASE_AXIOS = Axios.create({ transformResponse: (data) => JSON.parse(data, reviver) });",
];

const overload = (security: Security): OptionalKind<MethodDeclarationOverloadStructure> => {
  const base = {scope: Scope.Protected, isAsync: true};
  if (security.type === "http" && security.scheme === "basic") {
    return {
      ...base,
      parameters: [{name: "key", type: `"${security.name}"`}],
      returnType: "Promise<{username: string; password: string;}>",
    };
  }
  if (security.type === "oauth2" || security.type === "openIdConnect") {
    return {
      ...base,
      parameters: [{name: "key", type: `"${security.name}"`}, {name: "scopes", type: "string[]"}],
      returnType: "Promise<string>",
    };
  }
  return {...base, parameters: [{name: "key", type: `"${security.name}"`}], returnType: "Promise<string>"};
};

/**
 * Emit apis/abstractApi.ts: the shared axios setup plus the AbstractConfig / AbstractApi base classes.
 */
export const emitAbstractApi = (securities: Security[]): string =>
  render((sf) => {
    sf.addImportDeclaration({defaultImport: "Axios", namedImports: ["AxiosInstance"], moduleSpecifier: "axios"});
    sf.addImportDeclaration({
      isTypeOnly: true,
      namedImports: securities.length ? ["Config", "Security"] : ["Config"],
      moduleSpecifier: "../config",
    });
    sf.addStatements(BASE_STATEMENTS);

    const abstractConfig = sf.addClass({isExported: true, name: "AbstractConfig", docs: docs({title: "AbstractConfig"})});
    if (securities.length) {
      abstractConfig.addProperty({name: "#security", isReadonly: true, type: "Security"});
      abstractConfig.addConstructor({
        docs: docs({title: "constructor"}),
        parameters: [{name: "security", type: "Security", initializer: "{}"}],
        statements: ["this.#security = security;"],
      });
      const scoped = securities.some((s) => s.type === "oauth2" || s.type === "openIdConnect");
      abstractConfig.addMethod({
        scope: Scope.Protected,
        isAsync: true,
        name: "security",
        overloads: securities.map(overload),
        parameters: [
          {name: "key", type: "keyof Security"},
          ...(scoped ? [{name: "scopes", type: "string[]", hasQuestionToken: true}] : []),
        ],
        returnType: "Promise<string | {username: string; password: string;}>",
        statements: [
          "const security = this.#security[key];",
          'if (!security) { throw new Error("Unauthorized user request."); }',
          `else if (security instanceof Function) { ${scoped ? "return scopes ? security(scopes) : security();" : "return security();"} }`,
          "return security;",
        ],
      });
    }

    const abstractApi = sf.addClass({isExported: true, name: "AbstractApi", docs: docs({title: "AbstractApi"})});
    abstractApi.addProperty({scope: Scope.Protected, name: "axios", type: "AxiosInstance", initializer: "BASE_AXIOS"});
    abstractApi.addConstructor({
      docs: docs({title: "constructor"}),
      parameters: [{name: "{axios}", type: "Config"}],
      statements: ["if (axios) this.axios = axios;"],
    });
  });
