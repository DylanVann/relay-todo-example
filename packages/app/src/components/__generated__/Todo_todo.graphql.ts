/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Todo_todo = {
    readonly id: string;
    readonly text: string;
    readonly " $refType": "Todo_todo";
};
export type Todo_todo$data = Todo_todo;
export type Todo_todo$key = {
    readonly " $data"?: Todo_todo$data;
    readonly " $fragmentRefs": FragmentRefs<"Todo_todo">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Todo_todo",
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
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "Todo",
  "abstractKey": null
};
(node as any).hash = '95d759c7537f26d962f3382ebd5c35b7';
export default node;
