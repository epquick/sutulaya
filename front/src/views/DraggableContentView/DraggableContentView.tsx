import styles from './DraggableContentView.module.scss'
import {useRef, useState} from "react";

interface GridViewProps {
    contentWidth: number
    contentHeight: number
    children
}

export default function DraggableContentView(props:GridViewProps) {
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [startX, setStartX] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const [isMovement, setIsMovement] = useState<boolean>(false)
    const [isMovementNonZero, setIsMovementNonZero] = useState<boolean>(false)
    const fieldRef = useRef()

    const onMouseDown = (e) => {
        setIsMovement(true)
        setStartX(e.clientX)
        setStartY(e.clientY)
    }

    const onMouseMove = (e) => {
        if (isMovement) {
            if (e.clientX != startX || e.clientY != startY) {
                setIsMovementNonZero(true)
            }
            // @ts-ignore
            const offsetWidth = fieldRef.current !== undefined ? fieldRef.current.offsetWidth : 0
            // @ts-ignore
            const offsetHeight = fieldRef.current !== undefined ? fieldRef.current.offsetHeight : 0
            setX(Math.min(Math.max(x + e.clientX - startX, -props.contentWidth + offsetWidth), 0))
            setY(Math.min(Math.max(y + e.clientY - startY, -props.contentHeight + offsetHeight), 0))
            setStartX(e.clientX)
            setStartY(e.clientY)
        }
    }

    const onMouseUp = (e) => {
        setIsMovement(false)
        setIsMovementNonZero(false)
    }

    return (
        <div
            className={styles.draggableField}
            ref={fieldRef}
            style={{left: x, top: y, cursor: isMovementNonZero ? 'move' : undefined}}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >{props.children}</div>
    )
}
