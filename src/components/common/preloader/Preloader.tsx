import loader from './../../../assets/images/loader.svg'
import style from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={style.loader}>
            <img src={loader} alt="loader"/>
        </div>
    )
}