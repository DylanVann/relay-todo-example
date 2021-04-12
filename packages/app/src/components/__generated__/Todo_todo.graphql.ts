/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Todo_todo = {
    readonly id: string;
    readonly text: string;
    readonly complete: boolean;
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
};
(node as any).hash = '9688ea4ed5397f08547476ec6b95d8d9';
export default node;
