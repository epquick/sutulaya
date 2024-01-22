import styles from './Layout.module.scss'

export default function LayoutView(props) {
    return (
        <div className={styles.layout}>{props.children}</div>
    )
}
