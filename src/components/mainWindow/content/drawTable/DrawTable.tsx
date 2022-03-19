import React, {useEffect, useRef, useState} from "react";

interface RectBoundType {
    top : number,
    left : number
}

const scale = 10

const DrawTable : React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawBegin, setIsDrawBegin] = useState<boolean>(false)
    const [offset, setOffset] = useState<RectBoundType>({top: 0, left: 0})
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

    const startDraw = () =>  {
        setIsDrawBegin(true)
    }

    const endDraw = () =>  {
        setIsDrawBegin(false)
    }

    const getMousePose = (e : React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawBegin) {

            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect && canvasRef.current) {
                canvasRef.current.ariaDisabled = "disabled"
                const point = {
                    x: (e.clientX - rect.left) / (rect.right - rect.left) * canvasRef.current.width,
                    y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvasRef.current.height
                }

                if (ctx) {
                    ctx.fillRect(point.x,point.y,15,15);

                    console.log("PagePoint : " + e.pageX + " " + e.pageY)
                    console.log("CalculatedPoint : " + point.x + " " + point.y)
                    console.log("Offsets : " + rect.left + " " + rect.top)
                }
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