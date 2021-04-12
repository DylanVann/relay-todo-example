/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RootQueryVariables = {
    id: string;
};
export type RootQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly userId: string;
        readonly completedCount: number;
    } | null;
};
export type RootQuery = {
    readonly response: RootQueryResponse;
    readonly variables: RootQueryVariables;
};



/*
query RootQuery(
  $id: String!
) {
  user(id: $id) {
    id
    userId
    completedCount
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
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
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completedCount",
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
    "name": "RootQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RootQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5492fd3957a59525f67fcc66f8813d8",
    "id": null,
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": "query RootQuery(\n  $id: String!\n) {\n  user(id: $id) {\n    id\n    userId\n    completedCount\n  }\n}\n"
  }
};
})();
(node as any).hash = '22005c02f3e8bf585cc1f191249a38e8';
export default node;
