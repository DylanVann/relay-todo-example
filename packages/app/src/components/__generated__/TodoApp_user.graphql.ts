/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoApp_user = {
    readonly id: string;
    readonly totalCount: number;
    readonly " $fragmentRefs": FragmentRefs<"TodoMarkAllComplete_user" | "TodoListFooter_user" | "TodoList_user">;
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
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '3333563876d1767aeadd3fb5d2af36e1';
export default node;
