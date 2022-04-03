import React, {useEffect, useRef, useState} from "react";
import {ImageData} from "canvas";
import style from "./drawTable.module.scss";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {HubConnection} from "redux-signalr";
import {CanvasType, postCanvasImage} from "../../../../store/web-slices/canvas_slice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";

interface Point {
    x: number,
    y: number
}

const scale = 10

const DrawTable: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawBegin, setIsDrawBegin] = useState<boolean>(false)
    const [prevPoint, setPrevPoint] = useState<Point>({x: 0, y: 0})
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [prevSavedImages, setPrevSavedImages] = useState<Array<ImageData>>([])

    const {img} = useSelector((state: RootState) => state.canvasReducer);

    const dispatch = useTypeDispatch()

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ct = (canvas.getContext('2d') as CanvasRenderingContext2D)
            canvas.width = canvas.width * scale
            canvas.height = canvas.height * scale
            const startImage = ctx?.getImageData(0, 0, canvas.width, canvas.height);
            // @ts-ignore
            prevSavedImages.push(startImage);
            setCtx(ct)
        }
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawBegin(true)
        const point = getCurrentPoint(e)
        if (point) {
            setPrevPoint(point);
        }
    }

    useEffect(() => {
        let image = new Image();
        image.src = img;
        ctx?.drawImage(image, 0, 0, ctx?.canvas.width, ctx?.canvas.height);
    }, [img])

    const endDraw = () => {
        if (isDrawBegin && canvasRef.current && ctx) {
            setIsDrawBegin(false);
            const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            prevSavedImages.push(imageData);
            dispatch(postCanvasImage(ctx.canvas.toDataURL()));
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && prevSavedImages.length > 1) {
            prevSavedImages.pop();
            ctx?.putImageData(prevSavedImages[prevSavedImages.length - 1], 0, 0);
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
        if (isDrawBegin) {
            const point = getCurrentPoint(e)
            if (ctx && point) {
                ctx.lineCap = "round"
                ctx.lineWidth = 10
                ctx.beginPath()
                ctx.moveTo(prevPoint.x, prevPoint.y)
                ctx.lineTo(point.x, point.y)
                ctx.stroke()
                setPrevPoint(point);
            }
        }
    }

    return (
            <canvas className={style.canvas + ' ' + 'unselectable'} ref={canvasRef}
                  onMouseDown={startDraw}
                  onMouseMove={(e) => getMousePose(e)}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
        />
)
}

export default DrawTable
