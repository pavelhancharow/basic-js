const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(arg) {
    this.arg = arg;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.n = 0;
    this.re = /[A-Z]/gi;
    this.array = [];
  }
  start(message, key, decrypt = false) {
    if (typeof message != 'string' || typeof key != 'string') {
      throw new Error()
    } else {
      this.array = [];
      this.mess = this.findArr(this.findIdx(message));
      this.key = this.findArr(this.findIdx(key));

      this.key = this.crypt(this.mess, this.key, decrypt);

      return this.result(this.mess, this.key);
    }
  }
  encrypt(message, key) {
    return this.start(message, key);
  }
  decrypt(message, key) {
    return this.start(message, key, true);
  }
  findIdx(val) {
    return val.toUpperCase().split(' ')
      .map(item => item.split('')
        .map(letter => letter.match(this.re) ?
          this.alphabet.indexOf(letter) : letter));
  }
  findArr(arr) {
    const array = arr;
    return array.length - 1 < 1 ? array[0] : array;
  }
  result(message, key) {
    let word = ''

    message.forEach(item => {
      if (Array.isArray(item)) {
        this.result(item, key)
      } else {
        if (typeof item != 'string') {
          word += key[this.n];
          this.n++;
        } else {
          word += item;
        }
      }
    });

    this.array.push(word);
    return this.array.join(' ').trim();
  }
  crypt(message, key, decrypt) {
    message = message.flat();
    let arr = [];
    let keyArr = [];

    message.forEach(item => typeof item != 'string' ? arr.push(item) : null);
    arr = this.arg == false ? arr.reverse() : arr

    for (let i = 0; i < arr.length; i++) {
      if (i < key.length) {
        if (decrypt) {
          arr[i] >= key[i] ?
            keyArr.push(arr[i] - key[i]) :
            keyArr.push(arr[i] + this.alphabet.length - key[i])
        } else {
          key[i] + arr[i] >= this.alphabet.length ?
            keyArr.push(key[i] + arr[i] - this.alphabet.length) :
            keyArr.push(key[i] + arr[i])
        }
      } else if (i % key.length == 0 && i >= key.length) {
        if (decrypt) {
          arr[i] >= key[this.n = 0] ?
            keyArr.push(arr[i] - key[this.n]) :
            keyArr.push(arr[i] + this.alphabet.length - key[this.n])
        } else {
          key[this.n = 0] + arr[i] >= this.alphabet.length ?
            keyArr.push(key[this.n] + arr[i] - this.alphabet.length) :
            keyArr.push(key[this.n] + arr[i]);
        }
        this.n++
      } else {
        if (decrypt) {
          arr[i] >= key[this.n] ?
            keyArr.push(arr[i] - key[this.n]) :
            keyArr.push(arr[i] + this.alphabet.length - key[this.n])
        } else {
          key[this.n] + arr[i] >= this.alphabet.length ?
            keyArr.push(key[this.n] + arr[i] - this.alphabet.length) :
            keyArr.push(key[this.n] + arr[i])
        }

        this.n++
      }
    }
    this.n = 0
    return keyArr.map(item => this.alphabet.charAt(item)).join('');;
  }
}

module.exports = VigenereCipheringMachine;
