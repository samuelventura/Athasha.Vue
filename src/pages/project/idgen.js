let newId = (function () {
  let idCount = 0;
  return function () {
    //000.456113
    let r = Math.random() * 1000000;
    let n = String(Math.floor(r)).padStart(6, 0);
    let c = String(idCount++).padStart(3, 0);
    return `${c}.${n}`;
  };
})();

export default {
  newId,
  addIds: function (array) {
    array.forEach(item => {
      item.$id = item.$id || newId();
    });
    return array;
  },
}
