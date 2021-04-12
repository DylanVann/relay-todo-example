/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoRootQueryVariables = {
    id: string;
};
export type TodoRootQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"Todo_todo">;
    } | null;
};
export type TodoRootQuery = {
    readonly response: TodoRootQueryResponse;
    readonly variables: TodoRootQueryVariables;
};



/*
query TodoRootQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...Todo_todo
    id
  }
}

fragment Todo_todo on Todo {
  id
  text
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Todo_todo"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "type": "Todo",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b8d170999fbed49602c819c6d5f7907",
    "id": null,
    "metadata": {},
    "name": "TodoRootQuery",
    "operationKind": "query",
    "text": "query TodoRootQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Todo_todo\n    id\n  }\n}\n\nfragment Todo_todo on Todo {\n  id\n  text\n}\n"
  }
};
})();
(node as any).hash = 'a88efbcd6dda4c44e70f6e38b5a0600b';
export default node;
