import styles from './styles.module.css'

function Loading() {
    return (
        <div role='loading' className={styles['loading']}><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading