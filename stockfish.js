let stockfishInstance;

async function initStockfish() {
    if (!stockfishInstance) {
        // Load and initialize the Stockfish WASM
        const response = await fetch('stockfish.wasm');
        const buffer = await response.arrayBuffer();
        const module = await WebAssembly.instantiate(buffer);
        stockfishInstance = module.instance.exports;
    }
    return stockfishInstance;
}

// Example: Send a command to Stockfish
function sendCommand(command) {
    if (stockfishInstance) {
        stockfishInstance.postMessage(command);
    }
}

// Example: Set up a callback to receive messages from Stockfish
function onMessage(callback) {
    stockfishInstance.onmessage = event => callback(event.data);
}

// Export functions so they can be used externally
window.initStockfish = initStockfish;
window.sendCommand = sendCommand;
window.onMessage = onMessage;
