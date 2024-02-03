import styles from './DraggableContentView.module.scss'
import {useEffect, useRef, useState} from "react";

interface GridViewProps {
    contentWidth: number
    contentHeight: number
    onOffsetChange: (x, y) => any
    children
}

export default function DraggableContentView(props:GridViewProps) {
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [boundX, setBoundX] = useState<number>(0)
    const [boundY, setBoundY] = useState<number>(0)
    const [startX, setStartX] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const [startClientX, setStartClientX] = useState<number>(0)
    const [startClientY, setStartClientY] = useState<number>(0)
    const [isMovement, setIsMovement] = useState<boolean>(false)
    const [isMovementNonZero, setIsMovementNonZero] = useState<boolean>(false)
    const fieldRef = useRef()

    const getFieldSize = () => {
        // @ts-ignore
        const width = fieldRef.current !== undefined ? fieldRef.current.offsetWidth : 0
        // @ts-ignore
        const height = fieldRef.current !== undefined ? fieldRef.current.offsetHeight : 0
        return {width, height}
    }

    const setBoundOffsets = () => {
        const {width, height} = getFieldSize()
        setBoundX(props.contentWidth < width ? Math.floor((width - props.contentWidth) / 2) : 0)
        setBoundY(props.contentHeight < height ? Math.floor((height - props.contentHeight) / 2) : 0)
        const
            newX = Math.min(Math.max(x, -props.contentWidth + width), 0),
            newY = Math.min(Math.max(y, -props.contentHeight + height), 0)
        setX(newX)
        setY(newY)
        props.onOffsetChange(newX, newY)
    }

    useEffect(() => {
        setBoundOffsets()
    })

    useEffect(() => {
        window.addEventListener('resize', setBoundOffsets);
        return () => window.removeEventListener('resize', setBoundOffsets)
    }, [])

    const onMouseDown = (e) => {
        const {width, height} = getFieldSize()
        if (props.contentWidth > width || props.contentHeight > height) {
            setIsMovement(true)
            setStartX(x)
            setStartY(y)
            setStartClientX(e.clientX)
            setStartClientY(e.clientY)
        }
    }

    const onMouseMove = (e) => {
        if (isMovement) {
            if (e.clientX != startX || e.clientY != startY) {
                setIsMovementNonZero(true)
            }
            const {width, height} = getFieldSize()
            const
                newX = Math.min(Math.max(startX + Math.round((e.clientX - startClientX) * 1.5), -props.contentWidth + width), 0),
                newY = Math.min(Math.max(startY + Math.round((e.clientY - startClientY) * 1.5), -props.contentHeight + height), 0)
            setX(newX)
            setY(newY)
            props.onOffsetChange(newX, newY)
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
            style={{left: x + boundX, top: y + boundY, cursor: isMovementNonZero ? 'move' : undefined}}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >{props.children}</div>
    )
}
