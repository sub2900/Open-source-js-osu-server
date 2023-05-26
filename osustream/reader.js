class Reader {
  // Initialize Reader with a buffer and set position to 0
  constructor(buffer) {
    this.buffer_ = buffer;
    this.pos = 0;
  }

  // Returns the buffer from the current position
  buffer() {
    return this.buffer_.slice(this.pos);
  }

  // Read a single byte and increment the position
  readByte() {
    return this.buffer_[this.pos++];
  }

  // Read 16 bit integer and increment the position
  readI16() {
    let ret = this.buffer_.readInt16LE(this.pos);
    this.pos += 2;
    return ret;
  }

  // Read 16 bit unsigned integer and increment the position
  readU16() {
    let ret = this.buffer_.readUInt16LE(this.pos);
    this.pos += 2;
    return ret;
  }

  // Read 32 bit integer and increment the position
  readI32() {
    let ret = this.buffer_.readInt32LE(this.pos);
    this.pos += 4;
    return ret;
  }

  // Read 32 bit unsigned integer and increment the position
  readU32() {
    let ret = this.buffer_.readUInt32LE(this.pos);
    this.pos += 4;
    return ret;
  }

  // Read 64 bit integer and increment the position
  readI64() {
    let ret = this.buffer_.readBigInt64LE(this.pos);
    this.pos += 8;
    return ret;
  }

  // Read 64 bit unsigned integer and increment the position
  readU64() {
    let ret = this.buffer_.readBigUInt64LE(this.pos);
    this.pos += 8;
    return ret;
  }

  // Read a string and increment the position
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

  // Read a 32 bit float and increment the position
  readF32() {
    let ret = this.buffer_.readFloatLE(this.pos);
    this.pos += 4;
    return ret;
  }

  // Read a 64 bit float and increment the position
  readF64() {
    let ret = this.buffer_.readDoubleLE(this.pos);
    this.pos += 8;
    return ret;
  }

  // Read an array of 32 bit integers and increment the position
  readI32_l() {
    let len = this.readU16();
    let i32_l = [];

    for (let i = 0; i < len; i++) {
      i32_l.push(this.readI32());
    }

    return i32_l;
  }
}

// Export Reader class for usage in other modules
module.exports = { Reader };