/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListItem_todo = {
    readonly complete: boolean;
    readonly id: string;
    readonly text: string;
    readonly " $refType": "TodoListItem_todo";
};
export type TodoListItem_todo$data = TodoListItem_todo;
export type TodoListItem_todo$key = {
    readonly " $data"?: TodoListItem_todo$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoListItem_todo">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListItem_todo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "complete",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "Todo",
  "abstractKey": null
};
(node as any).hash = '558cf97f1012cd93ca1d2242e66c130c';
export default node;
