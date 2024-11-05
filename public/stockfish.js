let stockfishInstance;

async function initStockfish() {
    if (!stockfishInstance) {
        const response = await fetch('https://bepisie.github.io/chess-extension-endpoint/public/stockfish-16.1.wasm');
        const buffer = await response.arrayBuffer();
        const module = await WebAssembly.instantiate(buffer);
        stockfishInstance = module.instance.exports;
        // You can set up any initial configuration here if needed
    }
    return stockfishInstance;
}

function sendCommand(command) {
    if (stockfishInstance) {
        stockfishInstance.postMessage(command);
    }
}

function onMessage(callback) {
    stockfishInstance.onmessage = event => callback(event.data);
}

window.initStockfish = initStockfish;
window.sendCommand = sendCommand;
window.onMessage = onMessage;
