import React, {useCallback} from 'react';
import UserMessage from './UserMessage';
import InputSearch from "../inputSearch/InputSearch";
import styles from './userMessagesStyle.module.css'
import {ReactComponent as SvgMale} from '../../img/male.svg'
import {ReactComponent as SvgFemale} from '../../img/female.svg'
import {ReactComponent as SvgViber} from '../../img/viber.svg'
import {ReactComponent as SvgTelegram} from '../../img/telegram.svg'
import {ReactComponent as SvgRefresh} from '../../img/refresh.svg'
import 'antd/dist/antd.css';
import {Pagination} from 'antd';

const HighLight = (props) => {
    const {filter, str} = props
    if (!filter) return str
    const regex = new RegExp(filter, 'ig')
    const matchValue = str.match(regex)
    if (matchValue) {
        return str.split(regex).map((s, index, array) => {
            if (index < array.length - 1) {
                const c = matchValue.shift()
                return <>{s}<span className={styles.highLight}>{c}</span></>
            }
            return s
        })
    }
    return str
}

function UserMessagesList(props) {
    const {
        data,
        handleChange,
        handleChangeFilter,
        getDataRefresh,
        filter,
        setBg,
        changeBgMessage,
        cancelClick,
        counter
    } = props;

    const light = useCallback((str) => {
        return <HighLight filter={filter} str={str}/>
    }, [filter]);

    return (
        <div>
            <div>
                <InputSearch handleChange={handleChange} handleChangeFilter={handleChangeFilter}
                             cancelClick={cancelClick} filter={filter}/>
            </div>
            {(data.length === 0) ? <div className={styles.loadMessage}>Зачекайте данні завантажуються!</div> :
                <div className={styles.messagesWrapperBox}>
                    <div className={styles.header}><SvgRefresh className={styles.svgRefresh} onClick={getDataRefresh}/>
                        Знайдено {counter} {counter === 1 ? "клієнт" : "клієнтів"}
                    </div>
                    {data.map((item) =>
                        <div key={item.id} className={styles.tableBoxRead} id={item.name}
                             onLoadedData={setBg(item.status, item.name)}
                             onClick={(event) => changeBgMessage(item.name, item.status, event)}
                        >
                            <div>
                                <div>
                                    {item.sex === "male" ?
                                        <div className={styles.maleBox}><SvgMale className={styles.svgMale}/></div> :
                                        <div className={styles.femaleBox}><SvgFemale className={styles.svgFemale}/>
                                        </div>}
                                </div>
                                <div>
                                    {item.messenger === "viber" ? <SvgViber className={styles.messenger}/> :
                                        <SvgTelegram className={styles.messenger}/>}
                                </div>
                            </div>
                            <div className={styles.nameAndPhoneStyle}>
                                <UserMessage message={item.name}/>
                                <UserMessage message={light(item.phone)} light={light}/>
                            </div>

                            <div className={styles.messageText}>
                                <UserMessage message={item.message}/>
                            </div>
                            <div className={styles.time}>
                                <UserMessage message={item.time}/>

                            </div>

                            <div className={styles.time}>
                                <UserMessage message={item.date}/>
                            </div>

                        </div>
                    )}

                </div>
            }
            <div className={styles.pagination}>
                <Pagination size="small" current="1" total="50"/>
            </div>
        </div>
    );
}

export default UserMessagesList;
