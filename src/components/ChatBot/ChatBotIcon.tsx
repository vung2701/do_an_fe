import styles from './chatbot.module.css';

export default function ChatBotIcon({ type, handleShow }: { type?: string; handleShow?: any }) {
    // Xác định xem có nên thêm lớp 'small' hay không
    const additionalClass = type === 'icon' ? styles.icon : '';
    return (
        <button className={`${styles.chatBotIcon} ${additionalClass}`} onClick={handleShow}>
            <img loading='lazy' className={styles.chatbotImg} src='/public/images/chatbot1.png' alt="chatbot" />
        </button >
    );
}
