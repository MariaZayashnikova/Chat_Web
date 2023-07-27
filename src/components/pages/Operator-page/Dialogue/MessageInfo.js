import React, { useEffect, useState } from 'react'
import { usePubNub } from 'pubnub-react'
import './Dialogue.css'
// todo: когда будет мобильное приложение, протестировать
function Message({ itemId }) {
    /*    const pubnub = usePubNub()
    const channels = ['idDialogue']
    let [valueOp, setValueOp] = useState('')
    let [valueC, setValueC] = useState('')
    const handleMessage = (event) => {
        const message = event.message
        switch (message) {
            case 'operator':
                setValueOp('Пользователь набирает сообщение')
                break
            case 'client':
                setValueC('Пользователь набирает сообщение')
                break
            case 'не печатает':
                setValueOp('')
                setValueC('')
        }
    }

    const start = (presenceEvent) => {
        let message = presenceEvent
        pubnub.publish({ channel: channels, message })
    }

    const end = () => {
        let message = 'не печатает'
        pubnub.publish({ channel: channels, message })
    }

    useEffect(() => {
        pubnub.addListener({
            message: handleMessage,
        })
        pubnub.subscribe({ channels })
    }, [pubnub, channels])

    return (
        <div>
            <div>
                <div>
                    <div>{valueOp}</div>
                    <input
                        type="text"
                        placeholder="operator"
                        onKeyUp={debounce(end, 2000)}
                        onInput={() => start('operator')}
                    />
                </div>
                <div>
                    <div>{valueC}</div>
                    <input
                        type="text"
                        placeholder="client"
                        onKeyUp={debounce(end, 2000)}
                        onInput={() => start('client')}
                    />
                </div>
            </div>
        </div>
    )*/
    const pubnub = usePubNub()
    let [channels] = useState([`${itemId}`])
    let [value, setValue] = useState('')

    const handleMessage = (event) => {
        const message = event.message
        switch (message) {
            case 'client':
                setValue('Пользователь набирает сообщение...')
                break
            case 'client onTypingEnd':
                setValue('')
                break
            default:
                return null
        }
    }

    useEffect(() => {
        pubnub.addListener({
            message: handleMessage,
        })
        pubnub.subscribe({ channels })
    }, [pubnub, channels])

    return <div className="messageInfo">{value}</div>
}

export default Message
