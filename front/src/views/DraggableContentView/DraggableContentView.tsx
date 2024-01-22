import styles from './DraggableContentView.module.scss'
import {useRef, useState} from "react";

interface GridViewProps {
    contentWidth: number
    contentHeight: number
    onOffsetChange: (x, y) => any
    children
}

export default function DraggableContentView(props:GridViewProps) {
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [shiftX, setShiftX] = useState<number>(0)
    const [shiftY, setShiftY] = useState<number>(0)
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
            const
                newX = Math.min(Math.max(x + e.clientX - startX, -props.contentWidth + offsetWidth), 0),
                newY = Math.min(Math.max(y + e.clientY - startY, -props.contentHeight + offsetHeight), 0)
            setX(newX)
            setY(newY)
            setStartX(e.clientX)
            setStartY(e.clientY)
            props.onOffsetChange(newX, newY)
        }
    }

    const onMouseUp = (e) => {
        setIsMovement(false)
        setIsMovementNonZero(false)
    }

    // @ts-ignore
    const offsetWidth = fieldRef.current !== undefined ? fieldRef.current.offsetWidth : 0
    // @ts-ignore
    const offsetHeight = fieldRef.current !== undefined ? fieldRef.current.offsetHeight : 0
    const
        newShiftX = props.contentWidth < offsetWidth ? Math.floor((offsetWidth - props.contentWidth) / 2) : 0,
        newShiftY = props.contentHeight < offsetHeight ? Math.floor((offsetHeight - props.contentHeight) / 2) : 0

    return (
        <div
            className={styles.draggableField}
            ref={fieldRef}
            style={{left: x + newShiftX, top: y + newShiftY, cursor: isMovementNonZero ? 'move' : undefined}}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >{props.children}</div>
    )
}
