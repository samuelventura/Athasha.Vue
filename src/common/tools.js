export default {
  isDebug() {
    return process.env.NODE_ENV !== 'production';
  },
  assert(b, m) {
    if (!b) throw m;
  },
}
