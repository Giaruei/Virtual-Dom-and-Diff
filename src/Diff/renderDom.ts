/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-12-19 23:16:22
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-27 19:56:25
 * @FilePath: \diff\src\components\renderDom.ts
 * @Description: 把补丁渲染到页面
 */
import { ElemType } from "./Element";

/**
 * @description: 将虚拟dom转化成真实节点
 * @param {ElemType} vDom
 * @return {*}
 */
export function renderDom(vDom: ElemType): HTMLElement {
	const { type, props, children } = vDom;

	const elem = document.createElement(type);

	for (let key in props) {
		setAttrs(elem, key, props[key] as string);
	}

	if (typeof children[0] === "string") {
		// console.log("qaq");
		let text = document.createTextNode(children as unknown as string);
		elem.appendChild(text);
	} else {
		(children as ElemType[]).forEach((child: ElemType | HTMLElement) => {
			child = renderDom(child as ElemType);

			elem.appendChild(child as HTMLElement);
		});
	}

	return elem;
}

/**
 * @description:
 * @param {HTMLElement} node
 * @param {string} props
 * @param {string} value
 * @return {*}
 */
export function setAttrs(
	node: HTMLElement,
	props: string,
	value: string
): void {
	switch (props) {
		case "value":
			if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
				let valueNode = node as HTMLInputElement | HTMLTextAreaElement;
				valueNode.value = value;
			} else {
				node.setAttribute(props, value);
			}
			break;
		case "style":
			node.style.cssText = value;
			break;
		default:
			node.setAttribute(props, value);
			break;
	}
}
