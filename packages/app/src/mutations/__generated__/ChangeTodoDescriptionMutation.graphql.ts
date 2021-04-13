/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangeTodoDescriptionInput = {
    id: string;
    description?: string | null;
    clientMutationId?: string | null;
};
export type ChangeTodoDescriptionMutationVariables = {
    input: ChangeTodoDescriptionInput;
};
export type ChangeTodoDescriptionMutationResponse = {
    readonly changeTodoDescription: {
        readonly todo: {
            readonly id: string;
            readonly description: string | null;
        };
    } | null;
};
export type ChangeTodoDescriptionMutation = {
    readonly response: ChangeTodoDescriptionMutationResponse;
    readonly variables: ChangeTodoDescriptionMutationVariables;
};



/*
mutation ChangeTodoDescriptionMutation(
  $input: ChangeTodoDescriptionInput!
) {
  changeTodoDescription(input: $input) {
    todo {
      id
      description
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangeTodoDescriptionPayload",
    "kind": "LinkedField",
    "name": "changeTodoDescription",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "todo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeTodoDescriptionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeTodoDescriptionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a783dbe2a9620d7311fcf0643e9d67ae",
    "id": null,
    "metadata": {},
    "name": "ChangeTodoDescriptionMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeTodoDescriptionMutation(\n  $input: ChangeTodoDescriptionInput!\n) {\n  changeTodoDescription(input: $input) {\n    todo {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '85aa2a2cc77030369283235435c0553d';
export default node;
