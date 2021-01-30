
const nextProjectSeq = function () {
  const seq = parseInt(localStorage.getItem("athasha/project-seq") || '0');
  localStorage.setItem("athasha/project-seq", seq + 1);
  return seq + 1;
}

const saveProject = function (item) {
  localStorage.setItem(`athasha/project/${item.id}`, JSON.stringify(item));
}

const loadProject = function (id) {
  return JSON.parse(localStorage.getItem(`athasha/project/${id}`));
}

const listProjects = function () {
  const items = [];
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("athasha/project/")) {
      const item = JSON.parse(localStorage.getItem(key));
      items.push({ id: item.id, name: item.name });
    }
  }
  return items;
}

export default {
  nextProjectSeq,
  saveProject,
  loadProject,
  listProjects,
}
