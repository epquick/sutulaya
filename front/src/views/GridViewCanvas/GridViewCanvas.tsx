import {useEffect, useRef, useState} from "react"
import styles from './GridViewCanvas.module.scss'
import DraggableContentView from "../DraggableContentView/DraggableContentView";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

interface GridViewProps {
    width: number
    height: number
    cellWidth: number
    cellHeight: number
    cellRenderer: (i, j, left, top, width, height, ctx) => any
    iteration: number
}

const GridView = observer((props: GridViewProps) => {
    const [contentOffsetX, setContentOffsetX] = useState(0)
    const [contentOffsetY, setContentOffsetY] = useState(0)
    const [windowSize, setWindowSize] = useState([0, 0])  // update to rerender on window resize

    useEffect(() => {
        const handleResize = () => setWindowSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const canvasRef = useRef()

    useEffect(() => {
        // @ts-ignore
        const ctx = canvasRef?.current?.getContext('2d')

        ctx.clearRect(0, 0, 10000, 10000)

        for (let i = 0; i < props.width; i++) {
            for (let j = 0; j < props.height; j++) {
                const left = i * props.cellWidth, top = j * props.cellHeight
                props.cellRenderer(i, j, left, top, props.cellWidth, props.cellHeight, ctx)
            }
        }

        ctx.scale(1, 1)
    }, [props.iteration, props.cellWidth, props.cellHeight])

    const lines = []

    const
        xStartCell = Math.floor((-contentOffsetX) / props.cellWidth),
        yStartCell = Math.floor((-contentOffsetY) / props.cellHeight),
        xEndCell = Math.min(xStartCell + Math.ceil(window.innerWidth / props.cellWidth) + 1, props.width),
        yEndCell = Math.min(yStartCell + Math.ceil(window.innerHeight / props.cellHeight) + 1, props.height)

    const verticalStartLine = Math.max(1, xStartCell)
    const verticalEndLine = Math.min(Math.ceil(props.width - 1), xEndCell)

    for (let i = verticalStartLine; i <= verticalEndLine; i += 1) {
        const height = Math.min(props.height * props.cellHeight, window.innerHeight)
        lines.push(
            <div
                className={classNames(styles.verticalLine, (i % 10 == 0) && styles.verticalLineBold)}
                style={{left: i * props.cellWidth, top: -contentOffsetY, height}}
                id={`vline_${i}`}
            ></div>
        )
        if (i % 10 == 0) {
            const opacity = Math.min(Math.abs(i * props.cellWidth + contentOffsetX) - 30, 30) / 30
            lines.push(
                <div
                    className={styles.verticalLineMarker}
                    style={{left: i * props.cellWidth, top: -contentOffsetY, opacity}}
                    id={`vline_m1_${i}`}
                >{i}</div>
            )
        }
    }

    const horizontalStartLine = Math.max(1, yStartCell)
    const horizontalEndLine = Math.min(props.height - 1, yEndCell)

    for (let i = horizontalStartLine; i <= horizontalEndLine; i += 1) {
        const width = Math.min(props.width * props.cellWidth, window.innerWidth)
        lines.push(
            <div
                className={classNames(styles.horizontalLine, (i % 10 == 0) && styles.horizontalLineBold)}
                style={{top: i * props.cellHeight, left: -contentOffsetX, width}}
                id={`hline_${i}`}
            ></div>
        )
        if (i % 10 == 0) {
            const opacity = Math.min(Math.abs(i * props.cellHeight + contentOffsetY) - 30, 30) / 30
            lines.push(
                <div
                    className={styles.horizontalLineMarker}
                    style={{top: i * props.cellHeight, left: -contentOffsetX, opacity}}
                    id={`hline_m1_${i}`}
                >{i}</div>
            )
        }
    }

    const onOffsetChange = (x, y) => {
        setContentOffsetX(x)
        setContentOffsetY(y)
    }

    return (
        <div className={styles.field}>
            <DraggableContentView
                contentWidth={props.cellWidth * props.width}
                contentHeight={props.cellHeight * props.height}
                onOffsetChange={onOffsetChange}
            >
                <canvas ref={canvasRef} width={props.cellWidth * props.width} height={props.cellHeight * props.height} />
                {lines}
            </DraggableContentView>
        </div>
    )
})

export default GridView

