/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-11-15 18:11:13
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-19 23:10:35
 * @FilePath: \diff\src\App.tsx
 * @Description:
 */
import React, { FC, useState } from "react";

import Menu from "./pages/Menu/menu-index";
import Main from "./pages/Main/main-index";

const App: FC = () => {
	const [dom, setDom] = useState("");
	const changeDom = (value: React.SetStateAction<string>) => {
		setDom(value);
	};
	// const vDom = getVirtualDom(document.getElementById("app")!);
	return (
		<div
			style={{
				backgroundColor: "#C6F6D5",
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<Main setDom={changeDom} />
			<Menu dom={dom} setDom={changeDom} />
		</div>
	);
};

export default App;
