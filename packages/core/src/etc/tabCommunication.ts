/**
 * 创建一个跨标签页通信的对象
 * @param storageKey
 * @returns {{release: release, sendMessage: sendMessage, addMessageListener: addMessageListener, removeMessageListener: removeMessageListener, removeAllMessageListeners: removeAllMessageListeners}}
 */
export function createTabCommunication(storageKey:string='tabCommunicationKey') {
    const listeners = [] as Function[];

    function sendMessage(message:any) {
        localStorage.setItem(storageKey, JSON.stringify({
            time: Date.now(),
            data:message
        }));
    }

    function addMessageListener(callback:Function) {
        listeners.push(callback);
    }

    function removeMessageListener(callback:Function) {
        const index = listeners.indexOf(callback);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    function removeAllMessageListeners() {
        listeners.length = 0;
        window.removeEventListener('storage', handleStorageEvent)
    }

    function release(){
        removeAllMessageListeners();
    }

    function handleStorageEvent(event:any) {
        if (event.key === storageKey) {
            const message = JSON.parse(event.newValue);
            listeners.forEach(callback => {
                callback(message.data);
            });
        }
    }

    window.addEventListener('storage', handleStorageEvent);

    return {
        release,
        sendMessage,
        addMessageListener,
        removeMessageListener,
        removeAllMessageListeners,
    };
}

// // 使用示例：
// const tabComm = createTabCommunication('myTabCommunication');
//
// const listener = (message:string) => {
//   console.log('Received message:', message);
// };
//
// tabComm.addMessageListener(listener);
//
// tabComm.sendMessage('Hello, other tab!');
//
// tabComm.removeMessageListener(listener);
