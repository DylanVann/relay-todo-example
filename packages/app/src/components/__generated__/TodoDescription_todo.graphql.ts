/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoDescription_todo = {
    readonly id: string;
    readonly description: string | null;
    readonly " $refType": "TodoDescription_todo";
};
export type TodoDescription_todo$data = TodoDescription_todo;
export type TodoDescription_todo$key = {
    readonly " $data"?: TodoDescription_todo$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoDescription_todo">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoDescription_todo",
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
  "type": "Todo",
  "abstractKey": null
};
(node as any).hash = '2a6ffeeeb5b66a8d7d6d48152bcbc606';
export default node;
