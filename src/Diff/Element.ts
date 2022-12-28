/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-11-16 10:17:56
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-20 17:33:41
 * @FilePath: \diff\src\components\Element.ts
 * @Description: 构建Element类
 */

/**
 * @description: Element类的接口类型
 * @return {*}
 */
export interface ElemType {
	type: string;
	props: {
		[propsName: string]: string | number | undefined;
	};
	children: Array<ElemType | string>;
	appendChild?: (node: ElemType | string) => void;
}

export class Elem implements ElemType {
	type: string;
	props: {
		[propsName: string]: string | number | undefined;
	};
	children: Array<ElemType | string>;

	constructor(
		type: string,
		props: {
			[propName: string]: string | number | undefined;
		},
		children: Array<ElemType | string>
	) {
		this.type = type.toLocaleLowerCase();
		this.props = props;
		this.children = children;
	}

	appendChild(node: ElemType | string) {
		this.children.push(node);
	}
}

/**
 * @description: 返回Elem类型的构造函数 也即是虚拟dom的结构
 * @return {*}
 */
const Element = (
	type: string,
	props: {
		[propName: string]: string | number | undefined;
	},
	children: Array<ElemType | string>
): ElemType => {
	return new Elem(type, props, children);
};

export default Element;
