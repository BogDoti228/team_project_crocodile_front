import React from "react";
import style from "./toolPanel.module.scss";

type ToolPanelPropsType = {
    activeSize: number,
    setSize:  React.Dispatch<React.SetStateAction<number>>,
    setColor: React.Dispatch<React.SetStateAction<string>>,
    activeColor: string,
    clear(): void,
}

const ToolPanel : React.FC<ToolPanelPropsType> = ({setSize, clear, activeSize, setColor, activeColor}) => {
    const handleSetSize = (size: number) => {
        setSize(size);
    }

    const sizeList = [
        34,
        25,
        15,
        10,
        5,
    ];

    const colorList = [
        '#000000',
        '#ee3838',
        '#00CF0AFF',
        '#1472ff',
        '#88301c',
        '#FFBF3AED',
    ]

    const handleSetColor = (color: string) => {
        setColor(color);
    }

    const isActive = (size: number | string) => {
        if (size === activeSize || size === activeColor)
            return style.active;
        return null;
    }

    return (<div className={style.panel}>
        <div className={`${style.sizeList} ${style.list}`}>
            {sizeList.map((size) => {
                return <div key={size} className={`${style.item} ${isActive(size)}`}
                            onClick={() => handleSetSize(size)}>
                    <div style={{height: size, width: size}}/>
                </div>
            })}
        </div>
        <div className={style.clearButton} onClick={clear}>
            Очистить
        </div>
        <div className={`${style.colorList} ${style.list}`}>
            <div className={`${style.color} ${isActive("#FBFBFB")}`} onClick={() => handleSetColor("#FBFBFB")}>
                <div style={{backgroundColor: "#FBFBFB", border: "2px solid #9B9B9BFF"}}/>
            </div>
            {colorList.map((color) => {
                return <div key={color} className={`${style.color} ${isActive(color)}`} onClick={() => handleSetColor(color)}>
                    <div style={{backgroundColor: color}}/>
                </div>
            })}
        </div>

    </div>)
}

export default ToolPanel;