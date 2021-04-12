/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoApp_user = {
    readonly id: string;
    readonly totalCount: number;
    readonly " $fragmentRefs": FragmentRefs<"TodoMarkAllComplete_user" | "TodoListFooter_user" | "TodoList_user" | "TodoClearCompleted_user">;
    readonly " $refType": "TodoApp_user";
};
export type TodoApp_user$data = TodoApp_user;
export type TodoApp_user$key = {
    readonly " $data"?: TodoApp_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoApp_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoApp_user",
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
      "name": "totalCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoMarkAllComplete_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoListFooter_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoList_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoClearCompleted_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '9e83c8c5cec6cbd07b6309a377e235a1';
export default node;
