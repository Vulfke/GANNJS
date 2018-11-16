function sigmoid(x) {
    return math.exp(-x) / (math.exp(-x) + 1);
}

class Neuron {
    constructor() {
        this.value = 0;
        this.change = 0;
    }
    
    normalize() {
        this.value = sigmoid(value);
    }
}