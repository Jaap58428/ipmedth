var tests = [];

let number = 1
let msg = "the number isnt correct"
console.assert(number === 2, {number: number, msg: msg})


class Test {
    constructor(input, expected, msg) {
        this.input = input;
        this.expected = expected;
        this.msg = msg;
    }

    setupTest() {

    }

    assertTest() {
        console.assert(this.input === this.expected, msg)
    }
}

testMain = () => {

}

