/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoAppRootQueryVariables = {
    id: string;
};
export type TodoAppRootQueryResponse = {
    readonly user: {
        readonly " $fragmentRefs": FragmentRefs<"TodoApp_user">;
    } | null;
};
export type TodoAppRootQuery = {
    readonly response: TodoAppRootQueryResponse;
    readonly variables: TodoAppRootQueryVariables;
};



/*
query TodoAppRootQuery(
  $id: String!
) {
  user(id: $id) {
    ...TodoApp_user
    id
  }
}

fragment TodoApp_user on User {
  id
  totalCount
  ...TodoMarkAllComplete_user
  ...TodoListFooter_user
  ...TodoList_user
}

fragment TodoListFooter_user on User {
  id
  userId
  completedCount
  completedTodos: todos(status: "completed", first: 2147483647) {
    edges {
      node {
        id
        complete
      }
    }
  }
  totalCount
}

fragment TodoListItem_todo on Todo {
  complete
  id
  text
}

fragment TodoListItem_user on User {
  id
  userId
  totalCount
  completedCount
}

fragment TodoList_user on User {
  todos(first: 2147483647) {
    edges {
      node {
        id
        complete
        ...TodoListItem_todo
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
  userId
  totalCount
  completedCount
  ...TodoListItem_user
}

fragment TodoMarkAllComplete_user on User {
  id
  userId
  totalCount
  completedCount
  todos(first: 2147483647) {
    edges {
      node {
        id
        complete
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 2147483647
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "complete",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoAppRootQuery",
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
            "name": "TodoApp_user"
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
    "name": "TodoAppRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "userId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "completedCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "TodoConnection",
            "kind": "LinkedField",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/),
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
                        "name": "text",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "todos(first:2147483647)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "TodoList_todos",
            "kind": "LinkedHandle",
            "name": "todos"
          },
          {
            "alias": "completedTodos",
            "args": [
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "completed"
              }
            ],
            "concreteType": "TodoConnection",
            "kind": "LinkedField",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "todos(first:2147483647,status:\"completed\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "66c9465472d3c3d2eeb11884f96b6675",
    "id": null,
    "metadata": {},
    "name": "TodoAppRootQuery",
    "operationKind": "query",
    "text": "query TodoAppRootQuery(\n  $id: String!\n) {\n  user(id: $id) {\n    ...TodoApp_user\n    id\n  }\n}\n\nfragment TodoApp_user on User {\n  id\n  totalCount\n  ...TodoMarkAllComplete_user\n  ...TodoListFooter_user\n  ...TodoList_user\n}\n\nfragment TodoListFooter_user on User {\n  id\n  userId\n  completedCount\n  completedTodos: todos(status: \"completed\", first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n      }\n    }\n  }\n  totalCount\n}\n\nfragment TodoListItem_todo on Todo {\n  complete\n  id\n  text\n}\n\nfragment TodoListItem_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n}\n\nfragment TodoList_user on User {\n  todos(first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n        ...TodoListItem_todo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n  userId\n  totalCount\n  completedCount\n  ...TodoListItem_user\n}\n\nfragment TodoMarkAllComplete_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n  todos(first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6da4509184b4b76efb3d66c1feab3709';
export default node;
