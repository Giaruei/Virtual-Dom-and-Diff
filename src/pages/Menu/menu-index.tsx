/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-11-29 11:43:01
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-28 14:33:03
 * @FilePath: \diff\src\pages\Menu\menu-index.tsx
 * @Description: 这是展示虚拟dom的菜单界面
 */
import { FC } from "react";
import domDiff from "../../Diff/domDiff";
import doPatch from "../../Diff/doPatch";
import { ElemType } from "../../Diff/Element";
import getVirtualDom from "../../Diff/getVirtualDom";

interface Iprops {
	dom: string;
	setDom: (value: React.SetStateAction<string>) => void;
}

const Menu: FC<Iprops> = ({ dom, setDom }) => {
	/**
	 * @description: 右方按钮点击事件
	 * @return {*}
	 */
	function render(): void {
		// 获取老的虚拟节点
		const vDom = getVirtualDom(document.getElementById("app")!) as ElemType;
		// 获取新旧节点差异，得到补丁包，把补丁渲染在页面中，更新;
		const patch = domDiff(vDom, JSON.parse(dom));
		console.log("patch补丁包", patch);
		doPatch(document.getElementById("app")!, patch);
	}
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "800px" }}>
			<textarea
				style={{
					backgroundColor: "#cee7f3",
					border: "2px solid #B794F4",
					margin: "auto",
					width: "500px",
					height: "500px",
					outline: "none",
					resize: "none",
					fontSize: "16px",
					lineHeight: "25px",
				}}
				value={dom}
				onChange={(e) => {
					setDom(e.target.value);
				}}
			/>
			<div
				style={{
					cursor: "grab",
					backgroundColor: "#9F7AEA",
					borderRadius: "30px",
					width: "150px",
					height: "60px",
					lineHeight: "60px",
					textAlign: "center",
					margin: "10px auto ",
					fontSize: "20px",
					color: "white",
					transition: "all .5s",
				}}
				onMouseEnter={(e) => {
					const target = e.target as HTMLElement;
					target.style.backgroundColor = "#6B46C1";
				}}
				onMouseLeave={(e) => {
					const target = e.target as HTMLElement;
					target.style.backgroundColor = "#9F7AEA";
				}}
				onClick={() => render()}
			>
				渲染虚拟DOM
			</div>
		</div>
	);
};

export default Menu;
