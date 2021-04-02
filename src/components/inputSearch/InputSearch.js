import React from 'react';
import styles from './inputSearchStyle.module.css'
import {ReactComponent as SvgSearch} from '../../img/search.svg'
import {ReactComponent as SvgCancel} from '../../img/cancel.svg'

function InputSearch(props) {
    const {handleChange, handleChangeFilter, cancelClick, filter} = props

    return (
        <div className={styles.box}>
            <input className={styles.searchArea} value={filter} type="text" onChange={handleChange}
                   onKeyUp={handleChangeFilter}/>
            <SvgSearch className={styles.searchIcon}/>
            <SvgCancel className={styles.cancelIcon} onClick={cancelClick}/>
        </div>
    );
}

export default InputSearch;
