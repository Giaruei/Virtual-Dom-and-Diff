/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-12-19 22:02:50
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-28 14:29:46
 * @FilePath: \diff\src\components\domDiff.ts
 * @Description: 对新旧虚拟dom节点进行差异分析并生成补丁包
 */
import { ElemType } from "./Element";
import { ATTR, TEXT, REPLACE, REMOVE } from "./patchesType";

export interface IPatch {
	[key: string]: Array<object>;
}

let vnIndex = 0;
/**
 * @description: 对新旧虚拟dom节点进行差异分析 生成并返回补丁包
 * @param {*} oldDom
 * @param {*} newDom
 * @return {*}
 */
export default function domDiff(oldDom: ElemType, newDom: ElemType): IPatch {
	let index = 0;
	let patches: IPatch = {};
	vNodeWalk(oldDom, newDom, index, patches);
	return patches;
}

function vNodeWalk(
	oldNode: ElemType,
	newNode: ElemType,
	index: number,
	patches: IPatch
): void {
	let vnPatch = [];
	if (!newNode) {
		// 节点被删除
		vnPatch.push({
			type: REMOVE,
			index,
		});
	} else if (typeof oldNode === "string" && typeof newNode === "string") {
		if (oldNode !== newNode) {
			// 如果节点文本内容改变
			vnPatch.push({
				type: TEXT,
				text: newNode,
			});
		}
	} else if (oldNode.type === newNode.type) {
		const attrPatch = attrsWalk(oldNode.props, newNode.props);
		// 判断返回的Patch是否为空对象
		if (Object.keys(attrPatch).length > 0) {
			vnPatch.push({
				type: ATTR,
				attrs: attrPatch,
			});
		}
		// 递归遍历子节点
		childrenWalk(
			oldNode.children as ElemType[],
			newNode.children as ElemType[],
			patches
		);
	} else {
		// 节点被替换了
		vnPatch.push({
			type: REPLACE,
			newNode: newNode,
		});
	}
	// 如果元素存在补丁
	if (vnPatch.length > 0) {
		patches[index] = vnPatch;
	}
}

/**
 * @description: 生成节点属性的补丁
 * @return {*}
 */
function attrsWalk(
	oldAttrs: {
		[propsName: string]: any;
	},
	newAttrs: {
		[propsName: string]: any;
	}
): { [propName: string]: string | number | undefined } {
	let attrPatch: { [propName: string]: string | number | undefined } = {};
	for (let key in oldAttrs) {
		if (oldAttrs[key] !== newAttrs[key]) {
			// 修改属性内容 比如更改样式
			attrPatch[key] = newAttrs[key];
		}
	}
	for (let key in newAttrs) {
		// 新增属性
		if (!oldAttrs.hasOwnProperty(key)) {
			attrPatch[key] = newAttrs[key];
		}
	}
	return attrPatch;
}

/**
 * @description: 递归对每一个子节点进行同样的打补丁操作
 * @param {ElemType} oldChildren
 * @param {ElemType} newChildren
 * @return {*}
 */
function childrenWalk(
	oldChildren: ElemType[],
	newChildren: ElemType[],
	patches: IPatch
): void {
	oldChildren.forEach((child, index) => {
		vNodeWalk(child, newChildren[index], ++vnIndex, patches);
	});
}
