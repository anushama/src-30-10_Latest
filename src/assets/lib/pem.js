//Written for compatibility with forge method privateKeyToAsn1()
function getPrivateKeyData() {
	var options = {version: 0,
			n: this.n,
			e: this.e,
			d: this.d,
			p: this.p,
			q: this.q,
			dP: this.dmp1,
			dQ: this.dmq1,
			qInv: this.coeff
		  };
	return options;
}

//From git://github.com/titanous/pem-js.gitmaster

var ASNIntValue, ASNLength, int2hex;
function privatePEM() {
  var encoded;
  encoded = '020100';
  encoded += ASNIntValue(this.n, true);
  encoded += ASNIntValue(this.e, false);
  encoded += ASNIntValue(this.d, false);
  encoded += ASNIntValue(this.p, true);
  encoded += ASNIntValue(this.q, true);
  encoded += ASNIntValue(this.dmp1, true);
  encoded += ASNIntValue(this.dmq1, false);
  encoded += ASNIntValue(this.coeff, false);
  encoded = '30' + ASNLength(encoded) + encoded;
  return "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----";
};

function publicPEM() {
  var encoded;
  encoded = ASNIntValue(this.n, true);
  encoded += ASNIntValue(this.e, false);
  encoded = '30' + ASNLength(encoded) + encoded;
  encoded = '03' + ASNLength(encoded, 1) + '00' + encoded;
  encoded = '300d06092a864886f70d0101010500' + encoded;
  encoded = '30' + ASNLength(encoded) + encoded;
  return "-----BEGIN PUBLIC KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END PUBLIC KEY-----";
};

RSAKey.prototype.parsePEM = function(pem) {
  pem = ASN1.decode(Base64.unarmor(pem)).sub;
  return this.setPrivateEx(pem[1].content(), pem[2].content(), pem[3].content(), pem[4].content(), pem[5].content(), pem[6].content(), pem[7].content(), pem[8].content());
};

ASNIntValue = function(integer, nullPrefixed) {
  integer = int2hex(integer);
  if (nullPrefixed) {
    integer = '00' + integer;
  }
  return '02' + ASNLength(integer) + integer;
};

ASNLength = function(content, extra) {
  var length;
  if (!(typeof extra !== "undefined" && extra !== null)) {
    extra = 0;
  }
  length = (content.length / 2) + extra;
  if (length > 127) {
    length = int2hex(length);
    return int2hex(0x80 + length.length / 2) + length;
  } else {
    return int2hex(length);
  }
};

int2hex = function(integer) {
  integer = integer.toString(16);
  if (integer.length % 2 !== 0) {
    integer = '0' + integer;
  }
  return integer;
};

/* CryptoMX Tools - Base64 encoder/decoder
 * http://www.java2s.com/Code/JavaScriptDemo/Base64EncodingDecoding.htm
 *
 * Copyright (C) 2004 - 2006 Derek Buitenhuis
 * Modified February 2009 by TimStamp.co.uk
 * GPL v2 Licensed
 */
function encode64(a){a=a.replace(/\0*$/g,"");var b="",d,e,g="",h,i,f="",c=0;do{d=a.charCodeAt(c++);e=a.charCodeAt(c++);g=a.charCodeAt(c++);h=d>>2;d=(d&3)<<4|e>>4;i=(e&15)<<2|g>>6;f=g&63;if(isNaN(e))i=f=64;else if(isNaN(g))f=64;b=b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(i)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f)}while(c<
a.length);a="";b=b.split("");for(c=0;c<b.length;c++){if(c%64==0&&c>0)a+="\n";a+=b[c]}b.join();b=a%4;for(c=0;c<b;c++)a+="=";return a}
function decode64(a){var b="",d,e,g="",h,i="",f=0;a=a.replace(/[^A-Za-z0-9\+\/\=\/n]/g,"");do{d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++));e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++));h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++));i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++));d=d<<2|e>>4;e=(e&15)<<4|h>>2;g=(h&3)<<
6|i;b+=String.fromCharCode(d);if(h!=64)b+=String.fromCharCode(e);if(i!=64)b+=String.fromCharCode(g)}while(f<a.length);return b=b.replace(/\0*$/g,"")};

/* JavaScript ASCII Converter
 * http://www.vortex.prodigynet.co.uk/misc/ascii_conv.html
 *
 * TPO 2001/2004
 * Modified Feb 2009 by Tim Stamp (timstamp.co.uk)
 * License Unknown
 */
function chars_from_hex(a){var c="";a=a.replace(/^(0x)?/g,"");a=a.replace(/[^A-Fa-f0-9]/g,"");a=a.split("");for(var b=0;b<a.length;b+=2)c+=String.fromCharCode(parseInt(a[b]+""+a[b+1],16));return c};
