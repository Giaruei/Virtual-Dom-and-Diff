/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-11-17 22:27:27
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-20 17:05:39
 * @FilePath: \diff\src\components\getVirtualDom.ts
 * @Description:  将真实dom节点转换成虚拟dom
 */

import Element, { ElemType } from "./Element";

interface Iprops {
	[key: string]: string;
}

/**
 * @description: 将真实dom节点转换成虚拟dom 返回Element类
 * @param {HTMLElement} node
 * @return {*}
 */
export default function getVirtualDom(node: HTMLElement): ElemType | string {
	let vDom: ElemType | string;
	if (node.nodeType === 1) {
		let props = node.attributes;
		let propsObj: Iprops = {};

		for (let i = 0; i < props.length; i++) {
			propsObj[props[i].nodeName] = props[i].nodeValue as string;
		}
		vDom = Element(node.nodeName, propsObj, []);

		let childrenNode = node.childNodes;
		for (let i = 0; i < childrenNode.length; i++) {
			// 递归调用
			vDom.appendChild!(getVirtualDom(childrenNode[i] as HTMLElement));
		}
	} else if (node.nodeType === 3) {
		return node.nodeValue!;
	}

	return vDom!;
}
