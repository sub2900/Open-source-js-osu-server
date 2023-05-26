class Reader {
  constructor(buffer) {
    this.buffer_ = buffer;
    this.pos = 0;
  }

  buffer() {
    return this.buffer_.slice(this.pos);
  }

  readByte() {
    return this.buffer_[this.pos++];
  }

  readI16() {
    let ret = this.buffer_.readInt16LE(this.pos);
    this.pos += 2;
    return ret;
  }

  readU16() {
    let ret = this.buffer_.readUInt16LE(this.pos);
    this.pos += 2;
    return ret;
  }

  readI32() {
    let ret = this.buffer_.readInt32LE(this.pos);
    this.pos += 4;
    return ret;
  }

  readU32() {
    let ret = this.buffer_.readUInt32LE(this.pos);
    this.pos += 4;
    return ret;
  }

  readI64() {
    let ret = this.buffer_.readBigInt64LE(this.pos);
    this.pos += 8;
    return ret;
  }

  readU64() {
    let ret = this.buffer_.readBigUInt64LE(this.pos);
    this.pos += 8;
    return ret;
  }

  readString() {
    this.pos += 1;
    let shift = 0;
    let result = 0;

    while (true) {
      let b = this.buffer_[this.pos++];
      result |= (b & 0x7F) << shift;
      if ((b & 0x80) === 0) break;
      shift += 7;
    }

    let ret = this.buffer_.slice(this.pos, this.pos + result).toString();
    this.pos += result;
    return ret;
  }

  readF32() {
    let ret = this.buffer_.readFloatLE(this.pos);
    this.pos += 4;
    return ret;
  }

  readF64() {
    let ret = this.buffer_.readDoubleLE(this.pos);
    this.pos += 8;
    return ret;
  }

  readI32_l() {
    let len = this.readU16();
    let i32_l = [];

    for (let i = 0; i < len; i++) {
      i32_l.push(this.readI32());
    }

    return i32_l;
  }
}

module.exports = { Reader };
