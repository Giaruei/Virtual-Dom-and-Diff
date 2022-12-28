/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2022-12-19 13:36:35
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2022-12-28 14:35:15
 * @FilePath: \diff\src\pages\Main\main-index.tsx
 * @Description: 页面的主体部分
 */
import React, { FC } from "react";
import getVirtualDom from "../../Diff/getVirtualDom";

interface Iprops {
	setDom: (value: React.SetStateAction<string>) => void;
}

const Main: FC<Iprops> = ({ setDom }) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "800px" }}>
			<div
				style={{
					margin: "auto",
					width: "500px",
					height: "500px",
					border: "2px solid #38B2AC",
				}}
			>
				<ul className="list" id="app" style={{ backgroundColor: "#FBD38D" }}>
					<img
						alt="666"
						src="http://p1.music.126.net/pTtNmd-vBn_0kRrydZiBdQ==/109951168177331493.jpg?imageView&quality=89"
						title="音乐"
						style={{
							width: "100%",
						}}
					/>
					<div>
						<li className="item">
							<input
								type="text"
								placeholder="domDiff"
								style={{
									width: "180px",
									height: "30px",
									fontSize: "20px",
									borderColor: "#F56565",
									outline: "none",
								}}
							/>
						</li>
						<i
							style={{
								color: "#6B46C1",
								fontSize: "28px",
							}}
						>
							TypeScript
						</i>
					</div>
					<p>
						<b
							className="text"
							style={{
								color: "#0BC5EA",
								fontSize: "28px",
							}}
						>
							react.js
						</b>
						<span
							style={{
								color: "#D53F8C",
								fontSize: "28px",
							}}
						>
							npm run start
						</span>
					</p>
				</ul>
			</div>
			<div
				style={{
					cursor: "grab",
					backgroundColor: "#38B2AC",
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
					target.style.backgroundColor = "#2C7A7B";
				}}
				onMouseLeave={(e) => {
					const target = e.target as HTMLElement;
					target.style.backgroundColor = "#38B2AC";
				}}
				onClick={() => {
					const dom = JSON.stringify(
						getVirtualDom(document.getElementById("app")!),
						null,
						2
					);
					console.log(
						"生成虚拟DOM",
						getVirtualDom(document.getElementById("app")!)
					);
					setDom(dom);
				}}
			>
				生成虚拟DOM
			</div>
		</div>
	);
};

export default Main;
