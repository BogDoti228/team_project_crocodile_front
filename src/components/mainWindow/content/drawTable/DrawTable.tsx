import React, {useEffect, useRef, useState} from "react";
import {ImageData} from "canvas";
import style from "./drawTable.module.scss";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {HubConnection} from "redux-signalr";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import {postCanvas} from "../../../../store/web-slices/canvas_slice";

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
        }
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const startDraw = (e : React.MouseEvent<HTMLCanvasElement>) =>  {
        isDrawing.current = true;
        const point = getCurrentPoint(e)
        if (point)
            prevPointRef.current = point;
    }

    const endDraw = () =>  {
        isDrawing.current = false;
        if (canvasRef.current && ctxRef.current){
            const imageData = ctxRef.current.getImageData(0,0, canvasRef.current.width,  canvasRef.current.height);
            stackImageRef.current.push(imageData);
            dispatch(postCanvas(ctxRef.current?.canvas.toDataURL()));
        }
    }
    console.log('rerender');
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
                ctxRef.current.lineCap = "round"
                ctxRef.current.lineWidth = 10
                ctxRef.current.beginPath()
                ctxRef.current.moveTo(prevPointRef.current.x, prevPointRef.current.y)
                ctxRef.current.lineTo(point.x, point.y)
                ctxRef.current.stroke()
                prevPointRef.current = point;
            }

        }
    }

    useEffect(() => {
        let img = new Image();
        img.onload = () => {
            ctxRef.current?.drawImage(img, 0, 0, ctxRef.current?.canvas.width, ctxRef.current?.canvas.height);
        }
        img.src = url;
    }, [url]);

    return (
        <canvas className={style.canvas + ' unselectable'} ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={(e) => getMousePose(e)}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
        />
    )
}

export default DrawTable