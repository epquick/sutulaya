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
    const cells = []

    for (let i = 0; i < props.width; i++) {
        for (let j = 0; j < props.height; j++) {
            const left = i * props.cellWidth, top = j * props.cellHeight

            const cell = (
                <div
                    id={`${i}_${j}`}
                    className={styles.cell}
                    style={{top, left, width: props.cellWidth - 1, height: props.cellHeight - 1}}
                >&#x2661;</div>
            )

            cells.push(cell)
        }
    }

    return (
        <div className={styles.field}>
            <DraggableContentView
                contentWidth={props.cellWidth * props.width + 1}
                contentHeight={props.cellHeight * props.height + 1}
            >
                {cells}
            </DraggableContentView>
        </div>
    )
}
