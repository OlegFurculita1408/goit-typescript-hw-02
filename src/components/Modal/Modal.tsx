import { useEffect } from "react";
import css from './Modal.module.css';


interface ModalProps {
    alt: string;
    largeImageURL: string;
    onModalClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ alt, largeImageURL, onModalClick }) => {

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                onModalClick();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onModalClick]);

    const onBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onModalClick();
        }
    };

    return (
        <div className={css.Overlay} onClick={onBackDropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>
    );
};
export default Modal;