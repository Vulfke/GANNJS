// ну что я могу сказать, так я хотя бы не буду нихрена не делать
// первое что я хочу сделать обычную нейронку со статической сеткой плотных слоев
// потом может быть сделаю что-то на основе эволюционного алгоритма
// далее будет сеть с динамической структурой внутренних слоев, но сначала нужен каркас
// что мне нужно от матриц - умножение сложение вроде все,


class vector {
    constructor(arr, copy = false) {
        this.n = arr.length
        if(copy)
            this.vec = arr.slice();
        else
            this.vec = arr;
    }

    static zeros(dim) {
        let res = []
        for(let i = 0;  i < dim; i++) {
            res.push(0);
        }
        return new vector(res);
    }

    static ones(dim) {
        let res = []
        for(let i = 0;  i < dim; i++) {
            res.push(1);
        }
        return new vector(res);
    }

    static rand(dim) {
        let res = []
        for(let i = 0;  i < dim; i++) {
            res.push(Math.random());
        }
        return new vector(res);
    }

    add(other) {
        if(this.n !== other.n) {
            throw new Error("Vector. Addition. Dimensions aren't agreed.");
        }
        res = vector.zeros(this.n);
        for(let i = 0 ; i < this.n; i++) {
            res.vec[i] = this.vec[i] + other.vec[i];
        }
        return res;
    }
    mult(other) {
        if(this.n !== other.n) {
            throw new Error("Vector. Addition. Dimensions aren't agreed.");
        }
        res = vector.zeros(this.n);
        for(let i = 0 ; i < this.n; i++) {
            res.vec[i] = this.vec[i] * other.vec[i];
        }
        return res;
    }

    dot(other) {
        if(this.n !== other.n) {
            throw new Error("Vector. Addition. Dimensions aren't agreed.");
        }
        res = 0;
        for(let i = 0 ; i < this.n; i++) {
            res += this.vec[i] + other.vec[i];
        }
        return res;
    }

    get get(id) {
        try {
            return this.vec[id]
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    set set(id, val) {
        this.vec[id] = val;
    }

}


class vmatrix {
    constructor(arr, copy = false) {
        if(copy) {
            this.mat = arr.slice();
            this.T = arr.slice();
        }
        else {
            this.mat = arr;
            this.T = arr.slice();
        }
        this.n = arr.length;
    }

    static zeros(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push(vector.zeros(m));
        }
        return new vmatrix(res)
    }

    static ones(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push(vector.ones(m));
        }
        return new vmatrix(res);
    }

    static rand(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push(vector.rand(m));
        }
        return new vmatrix(res);
    }

    add(other) {
        if(n !== other.n && m !== other.m) {
            throw new Error("Addition. Dimensions aren't agreed.");
        }
        res = [];
        for(let i = 0; i < this.n; i++) {
            res.push(this.mat[i].add(other.mat[i]));
        }
        return new vmatrix(res);
    }

    T() {
        res = []
        let m = this.mat[0].length
        for(let k = 0; k < m; k++) {
            let cur = []
            for(let i = 0; i < this.n; i++) {
                cur.push(this.mat[i].get(j))
            }
            res.push(new vector(cur));
        }
        return new vmatrix(res)
    }

    mult(other) {

        let res = [];
        let A = this;
        let B = other.T();
        for(let i = 0; i < this.n; i++) {
            let vec = []
            for(let j = 0; j < B.m; j++) {
                vec.push(A.mat[i].dot(B.mat[j]));
            }
            res.push(new vector(vec));
        }
        return new matrix(res);
    }

}

class matrix {
    constructor(arr, copy = false) {
        if(copy) {
            this.mat = arr.slice();
        }
        else {
            this.mat = arr;
        }
        this.n = arr.length;
        this.m = arr[0].length;
    }

    static zeros(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push([]);
            for(let j = 0; j < m; j++) {
                res[i].push(0);
            }
        }
        return new matrix(res, n, m)
    }

    static ones(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push([]);
            for(let j = 0; j < m; j++) {
                res[i].push(1);
            }
        }
        return new matrix(res, n, m);
    }

    static rand(dims) {
        let res= [];
        let [n, m] = dims;
        for(let i = 0; i < n; i++) {
            res.push([]);
            for(let j = 0; j < m; j++) {
                res[i].push(Math.random());
            }
        }
        return new matrix(res, n, m);
    }

    add(other) {
        if(n !== other.n && m !== other.m) {
            throw new Error("Addition. Dimensions aren't agreed.");
        }
        res = matrix.zeros([n, m]);
        for(let i = 0; i < this.n; i++) {
            for(let j = 0; j < this.m; j++) {
                res.mat[i][j] = this.mat[i][j] + other.mat[i][j];
            }
        }

        return res;
    }

    mult(other) {
        if(this.m !== other.n) {
            throw new Error("Multiplitcation. Dimensions aren't agreed");
        }

        let res = matrix.zeros([this.n, other.m]);
        for(let i = 0; i < this.n; i++) {
            for(let j = 0; j < other.m; j++) {
                for(let k = 0; k < this.m; k++) {
                    res.mat[i][j] += this.mat[i][k] * other.mat[k][j];
                }
            }
        }
        return res;
    }

}