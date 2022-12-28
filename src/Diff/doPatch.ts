/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-12-19 23:13:51
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-27 13:50:55
 * @FilePath: \diff\src\components\doPatch.ts
 * @Description: 打补丁
 */

import { ATTR, TEXT, REPLACE, REMOVE } from "./patchesType";
import { ElemType } from "./Element";
import { IPatch } from "./domDiff";
import { renderDom, setAttrs } from "./renderDom";

interface IPatches {
	type: "ATTR" | "TEXT" | "REPLACE" | "REMOVE";
	index?: number;
	text?: string;
	attrs?: {
		[key: string]: string;
	};
	newNode?: ElemType;
}

let rnIndex = 0;
let finalPatches: IPatch = {};

export default function doPatch(rDom: HTMLElement, patches: IPatch) {
	finalPatches = patches;
	rNodeWalk(rDom);
}

function rNodeWalk(rNode: HTMLElement) {
	console.log(rnIndex);
	const rnPatch = finalPatches[rnIndex++] as Array<IPatches>;
	console.log(rnPatch);
	const childNode = rNode.childNodes;

	// 深度优先遍历子节点
	if (childNode.length > 0) {
		Array.prototype.forEach.call(childNode, (child: HTMLElement) => {
			rNodeWalk(child);
		});
	}
	if (rnPatch) {
		// 如果节点存在补丁 那么进行操作
		console.log("进入patchAction");
		patchAction(rNode, rnPatch);
	}
}

function patchAction(rNode: HTMLElement, rnPatch: Array<IPatches>) {
	console.log("原来的节点", rNode);
	rnPatch.forEach((p: IPatches): void => {
		switch (p.type) {
			// 属性变动
			case ATTR:
				for (let key in p.attrs) {
					const value = p.attrs[key];
					if (value) {
						setAttrs(rNode, key, value);
					} else {
						rNode.removeAttribute(key);
					}
				}
				break;
			// 文本变动
			case TEXT:
				rNode.textContent = p.text as string;
				break;
			// 标签替换
			case REPLACE:
				// 替换节点：如果属于ELem类构造，那么重新生成节点，否则就为文本节点
				// const newNode =
				// 	p.newNode instanceof Elem
				// 		? renderDom(p.newNode)
				// 		: document.createTextNode(p.newNode as unknown as string);
				// 若如此做 会因为类型问题导致text变成 [object object]
				const newNode = renderDom(p.newNode as ElemType);
				console.log("替换后的新节点", newNode);
				// 用新节点newNode替换掉原来的节点
				rNode.parentNode!.replaceChild(newNode, rNode);
				break;
			// 标签删除
			case REMOVE:
				rNode.parentNode!.removeChild(rNode);
				break;
			default:
				break;
		}
	});
}
