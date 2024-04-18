
import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './chatbot.module.css';
import { PropsChatbot, PropsChatbotShow } from '../../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { postChatBot } from '../../services';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ChatBotIcon from './ChatBotIcon';

const ModalForm = ({ setPostChatResult }: any) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const formik = useFormik({
        initialValues: {
            conversation_id: `${uuidv4()}_${Date.now()}`,
            question: '',
            answer: '',
            created_on: '',
            id: 1
        },
        validationSchema: Yup.object({
            question: Yup.string().required('You must fill in this section')
        }),

        onSubmit: async (
            values: PropsChatbot,
            { resetForm }: { resetForm: () => void }
        ) => {
            try {
                const result = await postChatBot(values.question);
                setPostChatResult(result);
                resetForm();
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            } catch (error) {
                console.error('Form submission error:', error);
            }
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                required
                type="text"
                name="question"
                placeholder=""
                value={formik.values.question}
                onChange={formik.handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        formik.handleSubmit
                    }
                }}
            />
            <button type="submit" name="Submit">
                <SendIcon />
            </button>
        </form>
    )
}

export default function ModalChatBot({ handleClose, setChatHistory, chatHistory }: any) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postChatResult, setPostChatResult] = useState<PropsChatbot | null>(null);

    useEffect(() => {
        if (postChatResult) {
            setChatHistory((prevHistory: PropsChatbot[] | null) => [
                ...(prevHistory || []),
                postChatResult
            ]);
        }
    }, [postChatResult, setChatHistory]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

                const isScrollingFar = scrollTop > 200;
                const isAtBottom = scrollHeight - scrollTop === clientHeight;
                setShowScrollTopButton(isScrollingFar);
                setShowScrollBottomButton(!isAtBottom && !isScrollingFar);
            }
        };

        chatContainerRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            chatContainerRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            setShowScrollBottomButton(false);
        }
    };

    useEffect(() => {
        const displayAnswersWithDelay = () => {
            const hasUnansweredItems = chatHistory?.some(
                (item: PropsChatbotShow) => item.answer && !item.showing
            );
            if (hasUnansweredItems) {
                setLoading(true);
                const timeout = setTimeout(() => {
                    setChatHistory((prevHistory: PropsChatbotShow[] | null) => {
                        const updatedHistory = [...(prevHistory || [])];
                        updatedHistory.forEach((item, index) => {
                            if (item?.answer && !item.showing) {
                                updatedHistory[index] = {
                                    ...item,
                                    showing: true
                                };
                            }
                        });
                        setLoading(false);
                        return updatedHistory;
                    });
                }, 700);
                return () => clearTimeout(timeout);
            }
        };

        displayAnswersWithDelay();
    }, [chatHistory, setChatHistory]);

    return (
        <div className={styles.modalChatBot}>
            <div className={styles.content}>
                <div className={styles.chatTitle}>
                    <h2>Chat with AVT Consulting & Technology</h2>
                </div>
                <div className={styles.chatSession} ref={chatContainerRef}>
                    <ul>
                        <li className={styles.myChat}>
                            <span>
                                <ChatBotIcon type='icon' />
                            </span>
                            <p>Hello!</p>
                        </li>
                        {chatHistory?.map((item: PropsChatbotShow) => {
                            return (
                                <Fragment key={`${uuidv4()}`}>
                                    <li className={styles.clientChat}>
                                        <p>{item?.question}</p>
                                    </li>
                                    {item?.answer && item?.showing && (
                                        <li className={styles.myChat}>
                                            <span>
                                                <ChatBotIcon type='icon' />
                                            </span>
                                            <p>{item?.answer}</p>
                                        </li>
                                    )}
                                </Fragment>
                            );
                        })}
                        <div className={styles.scrollBottomBox}>
                            {showScrollBottomButton && (
                                <button onClick={scrollToBottom} className={styles.scrollBottomBtn}>
                                    <ArrowCircleDownIcon />
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingWave}>
                                <div className={styles.loadingBar}></div>
                                <div className={styles.loadingBar}></div>
                                <div className={styles.loadingBar}></div>
                                <div className={styles.loadingBar}></div>
                            </div>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
                <div className={styles.newchat}>
                    <ModalForm setPostChatResult={setPostChatResult} />
                </div>
            </div >
            <button onClick={handleClose} className={styles.closeChat}>
                <CloseIcon />
            </button>
        </div >
    );
};


