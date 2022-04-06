import React, {useEffect, useRef} from "react";
import {ImageData} from "canvas";
import style from "./drawTable.module.scss";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {HubConnection} from "redux-signalr";

interface Point {
    x: number,
    y: number
}

const scale = 10

const DrawTable: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    let isDraw = false;
    let prevPoint: Point = {x: 0, y: 0};
    let ctx: CanvasRenderingContext2D | null = null;
    const historyStack: ImageData[] = [];

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = canvas.width * scale
            canvas.height = canvas.height * scale
            const startImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            historyStack.push(startImage);
        }
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [canvasRef.current])

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        isDraw = true;
        const point = getCurrentPoint(e)
        if (point) {
            prevPoint = point;
        }
    }

    const endDraw = () => {
        if (isDraw && canvasRef.current && ctx) {
            isDraw = false;
            const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            historyStack.push(imageData);
            postCanvas();
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && historyStack.length > 1) {
            historyStack.pop();
            ctx?.putImageData(historyStack[historyStack.length - 1], 0, 0);
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
        if (isDraw) {
            const point = getCurrentPoint(e)
            if (ctx && point) {
                ctx.lineCap = "round"
                ctx.lineWidth = 10
                ctx.beginPath()
                ctx.moveTo(prevPoint.x, prevPoint.y)
                ctx.lineTo(point.x, point.y)
                ctx.stroke()
                prevPoint = point;
            }
        }
    }

    let connection: HubConnection | null = null;

    useEffect(() => {
        connection = new HubConnectionBuilder()
            .withUrl('https://localhost:8080/canvas')
            .withAutomaticReconnect()
            .build();
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(res => {
                    console.log('Chat Connected!');

                    connection?.on('ReceiveCanvas', canvas => {
                        console.log('Receive Canvas!')
                        let img = new Image();
                        img.onload = () => {
                            ctx?.drawImage(img, 0, 0, ctx?.canvas.width, ctx?.canvas.height);
                        }
                        img.src = canvas.img;
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [])

    const postCanvas = () => {
        console.log('Post Canvas!');
        fetch('https://localhost:8080/canvas/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({img: ctx?.canvas.toDataURL(), groupName: sessionStorage.getItem("groupName")})
        })
    }

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