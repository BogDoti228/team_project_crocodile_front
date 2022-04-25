import React, {useEffect, useRef, useState} from "react";
import {ImageData} from "canvas";
import style from "./drawTable.module.scss";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import {postCanvas} from "../../../../store/web-slices/canvas_slice";
import ToolPanel from "./toolPanel/ToolPanel";
import GameResultPanel from "./gameResultPanel/GameResultPanel";
import {NICK_IN_STORAGE} from "../../../enterWindow/Enter";
import Settings from "../../settings/Settings";

interface Point {
    x: number,
    y: number
}

const scale = 10;

const DrawTable: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false);
    const prevPointRef = useRef<Point>({x: 0, y: 0});
    const stackImageRef = useRef<Array<ImageData>>([]);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [penSize, setPenSize] = useState(10);
    const [penColor, setPenColor] = useState("#000");
    const [showToolPanel, setShowToolPanel] = useState(false);
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const {gameState} = useSelector((state: RootState) => state.gameProcessReducer)
    const {name} = useSelector((state : RootState) => state.profileReducer)
    const {settingsShow} = useSelector((state : RootState) => state.usersListReducer)

    const {url} = useSelector((state: RootState) => state.canvasReducer);
    const dispatch = useTypeDispatch();

    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D
            canvas.width = canvas.width * scale
            canvas.height = canvas.height * scale
            const startImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            stackImageRef.current = [startImage];
            ctxRef.current = ctx;
            ctxRef.current.lineCap = "round";
        }
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    useEffect(() => {
        let img = new Image();
        img.onload = () => {
            ctxRef.current?.clearRect(0,0,ctxRef.current?.canvas.width, ctxRef.current?.canvas.height);
            ctxRef.current?.drawImage(img, 0, 0, ctxRef.current?.canvas.width, ctxRef.current?.canvas.height);
        }
        img.src = url;
    }, [url]);

    useEffect(() => {
        setShowToolPanel(currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE) && gameState === 'during')
    }, [gameState, currentStartUser])

    useEffect(() => {
        clearCanvas();
    }, [gameState])

    const startDraw = (e : React.MouseEvent<HTMLCanvasElement>) =>  {
        isDrawing.current = (name === currentStartUser && gameState === 'during');
        const point = getCurrentPoint(e)
        if (point && ctxRef.current){
            prevPointRef.current = point;
            ctxRef.current.lineWidth = penSize;
            ctxRef.current.strokeStyle = penColor;
        }
    }

    const endDraw = () =>  {
        isDrawing.current = false;
        if (canvasRef.current && ctxRef.current){
            const imageData = ctxRef.current.getImageData(0,0, canvasRef.current.width,  canvasRef.current.height);
            stackImageRef.current.push(imageData);
            if (currentStartUser === name){
                dispatch(postCanvas(ctxRef.current?.canvas.toDataURL()));
            }

        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && stackImageRef.current.length > 1) {
            stackImageRef.current.pop();
            ctxRef.current?.putImageData(stackImageRef.current[stackImageRef.current.length - 1], 0, 0);
        }
    }

    const getCurrentPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point | undefined => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) / (rect.right - rect.left) * canvasRef.current.width,
                y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvasRef.current.height
            }
        }
    }

    const getMousePose = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing.current) {
            const point = getCurrentPoint(e)
            if (ctxRef.current && point) {
                ctxRef.current.beginPath()
                ctxRef.current.moveTo(prevPointRef.current.x, prevPointRef.current.y)
                ctxRef.current.lineTo(point.x, point.y)
                ctxRef.current.stroke()
                prevPointRef.current = point;
            }
        }
    }

    const clearCanvas = () => {
        ctxRef.current?.clearRect(0,0,ctxRef.current?.canvas.width, ctxRef.current?.canvas.height);
        endDraw();
    }

    return (
        <div className={style.canvasWrapper}>
            <canvas className={style.canvas + ' unselectable'} ref={canvasRef}
                    onMouseDown={startDraw}
                    onMouseMove={(e) => getMousePose(e)}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
            />
            {showToolPanel && <ToolPanel setSize={setPenSize} clear={clearCanvas} activeSize={penSize} activeColor={penColor}
                                         setColor={setPenColor}/>}
            {settingsShow && <Settings/>}
            {gameState === "betweenRound" && <GameResultPanel/>}
        </div>

    )
}

export default DrawTable