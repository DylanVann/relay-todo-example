/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoRootQueryVariables = {
    id: string;
    userId: string;
};
export type TodoRootQueryResponse = {
    readonly user: {
        readonly " $fragmentRefs": FragmentRefs<"Todo_user">;
    } | null;
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
  $userId: String!
) {
  user(id: $userId) {
    ...Todo_user
    id
  }
  node(id: $id) {
    __typename
    ...Todo_todo
    id
  }
}

fragment Todo_todo on Todo {
  id
  text
  complete
}

fragment Todo_user on User {
  id
  userId
  totalCount
  completedCount
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Todo_user"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
            "name": "totalCount",
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
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "complete",
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
    "cacheID": "78aea362e53fcdea08fd97cf154cade5",
    "id": null,
    "metadata": {},
    "name": "TodoRootQuery",
    "operationKind": "query",
    "text": "query TodoRootQuery(\n  $id: ID!\n  $userId: String!\n) {\n  user(id: $userId) {\n    ...Todo_user\n    id\n  }\n  node(id: $id) {\n    __typename\n    ...Todo_todo\n    id\n  }\n}\n\nfragment Todo_todo on Todo {\n  id\n  text\n  complete\n}\n\nfragment Todo_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n}\n"
  }
};
})();
(node as any).hash = '38222a1a765b89d39e7021707d75c41d';
export default node;
