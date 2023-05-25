// unlike the vlang counter part javascript cannot distinguish between different integer sizes (i8, i16, i32, and etc) and uses floating point numbers conversion logic for different numeric types :)
class Stream {
    constructor() {
      this.content = [];
    }
  
    write_u8(i) {
      this.content.push(i);
    }
  
    write_i8(i) {
      this.content.push(i & 0xFF);
    }
  
    write_u16(i) {
      this.content.push(i & 0xFF, (i >> 8) & 0xFF);
    }
  
    write_i16(i) {
      this.write_u16(i & 0xFFFF);
    }
  
    write_u32(i) {
      this.content.push(
        i & 0xFF,
        (i >> 8) & 0xFF,
        (i >> 16) & 0xFF,
        (i >> 24) & 0xFF
      );
    }
  
    write_i32(i) {
      this.write_u32(i & 0xFFFFFFFF);
    }
  
    write_packet_length(len) {
      let b = len;
      this.content[3] = b & 0xFF;
    }
  
    write_u64(i) {
      this.content.push(
        i & 0xFF,
        (i >> 8) & 0xFF,
        (i >> 16) & 0xFF,
        (i >> 24) & 0xFF,
        (i >> 32) & 0xFF,
        (i >> 40) & 0xFF,
        (i >> 48) & 0xFF,
        (i >> 56) & 0xFF
      );
    }
  
    write_i64(i) {
      this.write_u64(i);
    }
  
    write_str(str) {
      let length = str.length;
  
      if (length === 0) {
        this.write_u8(0);
        return;
      }
  
      this.write_u8(11);
  
      while (length >= 127) {
        this.write_u8(128);
        length -= 127;
      }
  
      this.write_u8(length);
  
      for (let i = 0; i < str.length; i++) {
        this.write_u8(str.charCodeAt(i));
      }
    }
  
    write_i32_l(vals) {
      this.write_i16(vals.length);
  
      for (let val of vals) {
        this.write_i32(val);
      }
    }
  }
  
  const make_packet = (packet, ...values) => {
    let s = new Stream();
  
    s.write_u16(packet);
    s.write_u8(0);
    s.write_i32(0);
  
    for (let v of values) {
      if (typeof v === 'number') {
        if (Number.isInteger(v)) {
          if (v >= 0) {
            if (v <= 0xFF) {
              s.write_u8(v);
            } else if (v <= 0xFFFF) {
              s.write_u16(v);
            } else if (v <= 0xFFFFFFFF) {
              s.write_u32(v);
            } else {
              s.write_u64(v);
            }
          } else {
            if (v >= -0x80) {
              s.write_i8(v);
            } else if (v >= -0x8000) {
              s.write_i16(v);
            } else if (v >= -0x80000000) {
              s.write_i32(v);
            } else {
              s.write_i64(v);
            }
          }
        } else {
          throw new Error('Cannot handle non-integer numbers');
        }
      } else if (typeof v === 'string') {
        s.write_str(v);
      } else {
        throw new Error('Unknown value type');
      }  }
  
    s.write_packet_length(s.content.length - 7);
  
    return s.content;
  };
  
module.exports = { make_packet };
  
  
