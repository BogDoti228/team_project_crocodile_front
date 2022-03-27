import React, {useCallback, useEffect, useRef, useState} from "react";
import {ImageData} from "canvas";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

interface Point {
    x : number,
    y : number
}

const scale = 10
let initImage : ImageData;

const DrawTable : React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawBegin, setIsDrawBegin] = useState<boolean>(false)
    const [prevPoint, setPrevPoint] = useState<Point>({x: 0, y: 0})
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [prevSavedImages, setPrevSavedImages] = useState<Array<ImageData>>([])

    const fun = useCallback( async (draw: boolean) => {
        console.log(draw)
            if (draw) {
                await sendCanvas();
            }
        },
        [isDrawBegin]
    )

    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D

            canvas.width = canvas.width * scale
            canvas.height = canvas.height * scale
            const startImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setPrevSavedImages([startImage])
            initImage = startImage;
            setCtx(ctx)
        }


    }, [])

    useEffect(() => {
        if (prevSavedImages.length === 0) {
            setPrevSavedImages([initImage])
        }
        document.addEventListener('keydown', backChanges, false);
        return () => {
            document.removeEventListener('keydown', backChanges)
        }
    }, [prevSavedImages])

    const startDraw = (e : React.MouseEvent<HTMLCanvasElement>) =>  {
        setIsDrawBegin(true)
        const point = getCurrentPoint(e)
        if (point)
            setPrevPoint(point)
    }

    const endDraw = () =>  {
        setIsDrawBegin(false)
        if (canvasRef.current && ctx){
            const imageData = ctx.getImageData(0,0, canvasRef.current.width,  canvasRef.current.height);
            setPrevSavedImages([...prevSavedImages, imageData])
            console.log(prevSavedImages.length)
        }

    }

    const backChanges = (e: KeyboardEvent) => {
        console.log(prevSavedImages.length)
        if (e.ctrlKey && e.key === "z") {
            if (ctx && prevSavedImages.length - 1 > 0) {
                console.log("adsad")

                const lastImage = prevSavedImages[prevSavedImages.length - 2] as ImageData
                ctx.putImageData(lastImage, 0, 0);
                setPrevSavedImages(prevSavedImages.slice(0, -1))
            }
        }
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



    const startPushCanvas = async () => {
        if (isDrawBegin) {
            await sendCanvas();
        }
    }


    //метод пост, контет тайп - json
    //он передает json объекта, на сервере имеется такой же тип объекта.
    //в jsone отправляет base64 код картинки
    const post = () => {
        fetch('https://localhost:8080/canvas/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({canvas: ctx?.canvas.toDataURL()})
        })
    }

    //просто получает данные и пихает их в ctx
    const get = () => {
        fetch('https://localhost:8080/canvas/get')
            .then(x => x.json())
            .then(x => {
                let img = new Image();
                img.src = x.canvas;
                ctx?.drawImage(img, 0, 0, ctx?.canvas.width, ctx?.canvas.height);
                console.log(img.x);
            });
    }
    //каждые 25 мс происзодит пост
    const setPost = () => {
        setInterval(post, 25);
    }

    const setGet = () => {
        setInterval(get, 25);
    }

    const [ connection, setConnection ] = useState<HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:8080/canvasHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const conOn = () => {
        connection?.on('ReceiveMessage', async x => {
            console.log("ПРИШЛО");
            //console.log(x.canvas);
            //ctx?.clearRect(0, 0, ctx?.canvas.width, ctx?.canvas.height);
            let img = new Image();
            //img.src = x.canvas;
            await new Promise(f => {
                img.onload = f;
                img.src = x.canvas;
                ctx?.drawImage(img, 0, 0, ctx?.canvas.width, ctx?.canvas.height);
            });

            console.log(img.x);
        });
    }

    const sendCanvas = async () => {
        if (connection) {
            try {
                console.log('SEND')
                await connection.send('SendMessage', {canvas: ctx?.canvas.toDataURL()});
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendTwoCanvas = async () => {
        console.log('push')
        try {
            await  fetch('https://localhost:8080/canvastwo/canvasPost', {
                method: 'POST',
                body: JSON.stringify({canvas: ctx?.canvas.toDataURL()}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }


    const startSend = () => {
        /*setInterval( () => {
            fun(isDrawBegin);
        }, 100);*/
    }
    const startPull = () => {
        conOn();
    }

    return (
        <div onMouseMove={sendTwoCanvas}><canvas className={"canvas unselectable"} ref={canvasRef}
                     onMouseDown={startDraw}
                     onMouseMove={(e) => {
                         getMousePose(e)
                     }}
                     onMouseUp={endDraw}
                     onMouseLeave={endDraw}>
        </canvas>
            {/*эти кнопки нужны чтобы определить кто отправляет. а кто принимает. Что будет если нажать их одновременно я хз*/}
            <button className="enter-window__btn btn" onClick={startSend}>Start Send</button>
            <button className="enter-window__btn btn" onClick={startPull}>Start Pull</button>

            <button className="enter-window__btn btn" onClick={setPost}>POST</button>
            <button className="enter-window__btn btn" onClick={setGet}>GET</button>
        </div>

    )
}

export default DrawTable