import {useState} from "react"
import styles from './GridView.module.scss'
import DraggableContentView from "../DraggableContentView/DraggableContentView";

interface GridViewProps {
    width: number
    height: number
    cellWidth: number
    cellHeight: number
}

export default function GridView(props: GridViewProps) {
    const [contentOffsetX, setContentOffsetX] = useState(0)
    const [contentOffsetY, setContentOffsetY] = useState(0)

    const
        xStartCell = Math.floor((-contentOffsetX) / props.cellWidth),
        yStartCell = Math.floor((-contentOffsetY) / props.cellHeight),
        xEndCell = Math.min(xStartCell + Math.ceil(window.innerWidth / props.cellWidth) + 1, props.width),
        yEndCell = Math.min(yStartCell + Math.ceil(window.innerHeight / props.cellHeight) + 1, props.height)

    const cells = []

    for (let i = xStartCell; i < xEndCell; i++) {
        for (let j = yStartCell; j < yEndCell; j++) {
            const left = i * props.cellWidth, top = j * props.cellHeight

            const cell = (
                <div
                    id={`cell_${i}_${j}`}
                    className={styles.cell}
                    style={{top, left, width: props.cellWidth - 1, height: props.cellHeight - 1}}
                >&#x2661;</div>
            )

            cells.push(cell)
        }
    }

    const lines = []

    const verticalStartLine = Math.max(1, Math.ceil(xStartCell / 10)) * 10
    const verticalEndLine = Math.min(Math.ceil(props.width - 1) / 10, Math.floor(xEndCell / 10)) * 10

    for (let i = verticalStartLine; i <= verticalEndLine; i += 10) {
        const height = Math.min(props.height * props.cellHeight, window.innerHeight)
        lines.push(
            <div
                className={styles.verticalLine}
                style={{left: i * props.cellWidth, top: -contentOffsetY, height}}
                id={`vline_${i}`}
            ></div>
        )
        const opacity = Math.min(Math.abs(i * props.cellWidth + contentOffsetX) - 30, 30) / 30
        lines.push(
            <div
                className={styles.verticalLineMarker}
                style={{left: i * props.cellWidth, top: -contentOffsetY, opacity}}
                id={`vline_m1_${i}`}
            >{i}</div>
        )
    }

    const horizontalStartLine = Math.max(1, Math.ceil(yStartCell / 10)) * 10
    const horizontalEndLine = Math.min(Math.ceil(props.height - 1) / 10, Math.floor(yEndCell / 10)) * 10

    for (let i = horizontalStartLine; i <= horizontalEndLine; i += 10) {
        const width = Math.min(props.width * props.cellWidth, window.innerWidth)
        lines.push(
            <div
                className={styles.horizontalLine}
                style={{top: i * props.cellHeight, left: -contentOffsetX, width}}
                id={`hline_${i}`}
            ></div>
        )
        const opacity = Math.min(Math.abs(i * props.cellHeight + contentOffsetY) - 30, 30) / 30
        lines.push(
            <div
                className={styles.horizontalLineMarker}
                style={{top: i * props.cellHeight, left: -contentOffsetX, opacity}}
                id={`hline_m1_${i}`}
            >{i}</div>
        )
    }

    const onOffsetChange = (x, y) => {
        setContentOffsetX(x)
        setContentOffsetY(y)
    }

    return (
        <div className={styles.field}>
            <DraggableContentView
                contentWidth={props.cellWidth * props.width + 1}
                contentHeight={props.cellHeight * props.height + 1}
                onOffsetChange={onOffsetChange}
            >
                {cells}
                {lines}
            </DraggableContentView>
        </div>
    )
}
