import React, {useEffect, useRef, useState} from "react";

interface Point {
    x : number,
    y : number
}

const scale = 10

const DrawTable : React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawBegin, setIsDrawBegin] = useState<boolean>(false)
    const [prevPoint, setPrevPoint] = useState<Point>({x: 0, y: 0})
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D
            canvas.width = canvas.width * scale
            canvas.height = canvas.height * scale
            setCtx(ctx)
        }
    }, [])

    const startDraw = (e : React.MouseEvent<HTMLCanvasElement>) =>  {
        setIsDrawBegin(true)
        const point = getCurrentPoint(e)
        if (point)
            setPrevPoint(point)
    }

    const endDraw = () =>  {
        setIsDrawBegin(false)
    }

    const getCurrentPoint = (e : React.MouseEvent<HTMLCanvasElement>) : Point | undefined => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) / (rect.right - rect.left) * canvasRef.current.width,
                y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvasRef.current.height
            }
        }
    }

    const getMousePose = (e : React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawBegin) {
            const point = getCurrentPoint(e)
            if (ctx && point) {
                ctx.lineWidth = 10
                ctx.beginPath()
                ctx.moveTo(prevPoint.x, prevPoint.y)
                ctx.lineTo(point.x, point.y)
                ctx.stroke()
                setPrevPoint(point)
            }
        }
    }

    return (
        <canvas className={"canvas unselectable"} ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={(e) => getMousePose(e)}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}>

        </canvas>
    )
}

export default DrawTable